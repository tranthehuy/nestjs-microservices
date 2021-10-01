import { Controller, Get, Body, Post, Query, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, ListAllEntitiesDto } from './dto';
import { Order } from './schemas/order.schema';
import { AuthService } from '../auth/auth.service';
import axios from 'axios';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly authService: AuthService,
    private readonly ordersService: OrdersService
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const items = createOrderDto.items;
    const token = this.authService.createToken({});
    for (let index = 0; index < items.length; index++) {
      const itemId = items[index];
      try {
        // call to product service with JWT token header
        const { data } = await axios.get(`http://${process.env.TARGET_API_HOST}/products/${itemId}`, {
          headers: {'Authorization': `Bearer ${token}`}
        });

        // check if this product is existing
        if (!data._id) {
          throw new HttpException('Item Not Found ', HttpStatus.NOT_FOUND);
        }

        Logger.log('item', data);
      } catch (err) {
        Logger.error('error', err)
        throw new HttpException('Item Not Found', HttpStatus.NOT_FOUND);
      }
    }

    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesDto): Promise<Order[]> {
    return this.ordersService.findAll(query);
  }
}
