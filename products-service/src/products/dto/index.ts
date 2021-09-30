// Data Transfer Object schema

export class CreateProductDto {
  name: string;
  price: number;
  branch: string;
  color: string;
}

export class ListAllEntitiesDto {
  name: string;
  price: number;
  branch: string;
  color: string;

  q: string; // for searching query
  sort_by: string; // for sort by a column name
  
  limit: number;
  skip: number;
}