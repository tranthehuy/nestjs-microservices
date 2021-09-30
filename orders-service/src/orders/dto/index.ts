// Data Transfer Object schema

export class CreateOrderDto {
  customerName: string;
  customerAddress: string;
  customerEmail: string;
  customerPhoneNumber: string;
  items: string[];
}

export class ListAllEntitiesDto {
  q: string; // for searching query
  sort_by: string; // for sort by a column name
  
  limit: number;
  skip: number;
}