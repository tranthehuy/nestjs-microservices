import { AnyArray, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto, ListAllEntitiesDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(
    query: ListAllEntitiesDto,
    sort: any,
    search: any,
  ): Promise<Product[]> {
    let queryModel: any;

    if (!query.q) {
      queryModel = this.productModel.find(query);
    } else {
      queryModel = this.productModel.find({ $and: [query, search] });
    }

    if (query.sort_by) {
      queryModel = queryModel.sort(sort);
    }

    if (query.limit) {
      queryModel = queryModel.limit(query.limit)
    }

    if (query.skip) {
      queryModel = queryModel.skip(query.skip)
    }

    return queryModel.exec();
  }
}
