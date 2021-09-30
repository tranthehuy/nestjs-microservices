import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto, ListAllEntitiesDto } from './dto';

describe('ProductsController', () => {
  let productsController: ProductsController;

  beforeEach(async () => {
    const productMockService = {
      findAll: jest.fn((query) => Promise.resolve({...query, items: []})),
      create: jest.fn((request) => request)
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{
        provide: ProductsService,
        useValue: productMockService
      }],
    }).compile();

    productsController = app.get<ProductsController>(ProductsController);
  });

  describe('create empty product', () => {
    it('should return {}', () => {
      const result = new CreateProductDto();
      expect(productsController.create(result)).toBe(result);
    });
  });

  describe('list products', () => {
    it('should return { limit: 100, items: [] }', () => {
      const limit = 100
      const query = new ListAllEntitiesDto();
      query.limit = limit;
      expect(productsController.findAll(query)).resolves.toStrictEqual({ limit, items: [] });
    });
  });
});
