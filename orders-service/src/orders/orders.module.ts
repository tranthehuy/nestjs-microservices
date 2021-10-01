import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [OrdersController],
  providers: [AuthService, OrdersService],
})
export class OrdersModule {}