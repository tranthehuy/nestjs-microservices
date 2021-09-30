# Microservices

- This is an example repo to show how to build a Microservice Architecture with NestJS

- Each service has a seperated README.md to start and run this services

- Each service has a .env.sample file. Please copy this file and renamed to .env

- Please follow the instructions in each service to install package and start

- These services use the same shared key for JWT token in the header for authentication

## Build development environment

- In development, the `TARGET_API_HOST` is different between services so that it can call api together.

## Build production environment

- In production, we can use the same `TARGET_API_HOST` with a load balancer.

- Please use the same `APP_SECRET` in .env for both services so that these services can communicate together.

- Quickstart for developer

```
# Start shared mongodb service
docker-compose up -d

# Go to ./products-service
# Copy .env.sample to .env

yarn install

yarn run start:dev

# Go to ./orders-service
# Copy .env.sample to .env

yarn install

yarn run start:dev

```

## Products Service API

### [POST] /products

This api to create a product.

**Example**

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

This api to query products with filter, search and sort features.

Request query
```
/products?field1=value1&sort_by=name=-1,price=1&q=name=zero,name=zero&limit=5&skip=6
```

This api to search products which has 
- `field1` field equals `value1` for filtering
- `name` contains `zero` string for searching
- sort columns such as name(asc) and price(desc)

It also supports pagination with `limit` and `skip` query.

[GET] /products/{product_id}

This api to get product detail of {product_id}

Request Header: 
```
Content-Type: application/json
Authorization: Bearer ....
```

## Orders Service API

[GET] /token

To create JWT token to put on the header of requests.

[POST] /orders

This api is to create order of a customer with list of id of product items.

**Example**

Request Header: 
```
Content-Type: application/json
Authorization: Bearer ....
```

Request Body:
```
{
  "customerName": "Huy Chen",
  "customerAddress": "HCM city",
  "customerEmail": "huychen@test.com",
  "customerPhoneNumber": "09999999666",
  "items": [
    "61561e88dff577a196517db4",
    "61561e8edff577a196517db6",
    "61561e97dff577a196517db8"
  ]
}
```