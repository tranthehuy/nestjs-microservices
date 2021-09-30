import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerAddress: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop({ required: true })
  customerPhoneNumber: string;

  @Prop([String])
  items: string[];
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);