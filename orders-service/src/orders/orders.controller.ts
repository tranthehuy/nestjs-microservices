import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, ListAllEntitiesDto } from './dto';
import { Order } from './schemas/order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createProductDto: CreateOrderDto) {
    return this.ordersService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesDto): Promise<Order[]> {
    return this.ordersService.findAll(query);
  }
}
