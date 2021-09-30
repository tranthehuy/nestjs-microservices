import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto, ListAllEntitiesDto } from './dto';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const orderMockService = {
      findAll: jest.fn((query) => Promise.resolve({...query, items: []})),
      create: jest.fn((request) => request)
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{
        provide: OrdersService,
        useValue: orderMockService
      }],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('create empty order', () => {
    it('should return {}', () => {
      const result = new CreateOrderDto();
      expect(ordersController.create(result)).toBe(result);
    });
  });

  describe('list orders', () => {
    it('should return { limit: 100, items: [] }', () => {
      const limit = 100
      const query = new ListAllEntitiesDto();
      query.limit = limit;
      expect(ordersController.findAll(query)).resolves.toStrictEqual({ limit, items: [] });
    });
  });
});
