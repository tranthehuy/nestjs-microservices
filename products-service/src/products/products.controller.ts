import { Controller, Get, Body, Post, Query, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductsService } from './products.service';
import { CreateProductDto, ListAllEntitiesDto } from './dto';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesDto): Promise<Product[]> {
    let sort = {};
    let search = {};

    // build sort object for mongodb query
    if (query.sort_by) {
      sort = query.sort_by
        .split(',')
        .map((str) => str.split('='))
        .filter(
          (pair) => pair.length === 2 && (pair[1] == '1' || pair[1] == '-1'),
        )
        .reduce(
          (previousValue, currentValue) => ({
            ...previousValue,
            [currentValue[0]]: +currentValue[1],
          }),
          {},
        );
      Logger.log('sort_by', sort);
    }

    // build search object for mongodb query
    if (query.q) {
      search = query.q
        .split(',')
        .map((str) => str.split('='))
        .filter((pair) => pair.length === 2)
        .reduce(
          (previousValue, currentValue) => ({
            ...previousValue,
            [currentValue[0]]: { $regex: currentValue[1], $options: 'i' },
          }),
          {},
        );
      Logger.log('search', search);
    }
    return this.productsService.findAll(query, sort, search);
  }
}
