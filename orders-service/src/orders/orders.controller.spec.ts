import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto, ListAllEntitiesDto } from './dto';
import { AuthService } from '../auth/auth.service';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const orderMockService = {
      findAll: jest.fn((query) => Promise.resolve([])),
      create: jest.fn((request) => request)
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: process.env.APP_SECRET,
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
      controllers: [OrdersController],
      providers: [{
        provide: OrdersService,
        useValue: orderMockService
      }, AuthService],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('create empty order', () => {
    it('should return {}', () => {
      const result = new CreateOrderDto();
      result.items = [];
      expect(ordersController.create(result)).resolves.toStrictEqual(result);
    });
  });

  describe('list orders', () => {
    it('should return []', () => {
      const query = new ListAllEntitiesDto();
      expect(ordersController.findAll(query)).resolves.toStrictEqual([]);
    });
  });
});
