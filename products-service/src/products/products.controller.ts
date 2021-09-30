import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, ListAllEntitiesDto } from './dto';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesDto): Promise<Product[]> {
    return this.productsService.findAll(query);
  }
}
