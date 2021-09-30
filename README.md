# Microservices

- This is an example repo to show how to build a Microservice Architecture with NestJS

- Each service has a seperated README.md to start and run this services

- Each service has a .env.sample file. Please copy this file and renamed to .env

- Please follow the instructions in each service to install package and start

## Build development environment

- In development, the `API_HOST` is different between services so that it can call api together.

## Build production environment

- In production, we can use the same `API_HOST` with a load balancer.

- Please use the same `APP_SECRET` in .env for both services so that these services can communicate together.

## Products Service API

### [POST] /products
*Example*

Request Header: 
```
Content-Type: application/json
Authorization: Bearer ....
```

Request Body:
```
{
  "name": "product_name",
  "price": 777,
  "color": "blue"
}
```

[GET] /products

Example query
```
/products?field1=value1&sort_by=name=-1,price=1&q=name=zero,name=zero&limit=5&skip=6
```

This api to search products which has 
- `field1` field equals `value1` for filtering
- `name` contains `zero` string for searching
- sort columns such as name(asc) and price(desc)

It also supports pagination with `limit` and `skip` query.