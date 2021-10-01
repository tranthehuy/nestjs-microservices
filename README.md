# Microservices

- This is an example repo to show how to build a Microservice Architecture with NestJS

- Each service has a seperated README.md to start and run this services

- Each service has a .env.sample file. Please copy this file and renamed to .env

- Please follow the instructions in each service to install package and start

- These services use the same shared key for JWT token in the header for authentication

## Repo structure

- docker-compose.yml : docker-compose file to start mongodb on local

- orders-service : orders API and create JWT token sourcecode

- products-service : products API

## Quickstart to run on local

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

## Build development environment

- In development, the `TARGET_API_HOST` is different between services so that it can call api together.

## Build production environment

- In production, we can use the same `TARGET_API_HOST` with a load balancer.

- Please use the same `APP_SECRET` in .env for both services so that these services can communicate together.

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

CURL:
```
curl -X POST \
  http://localhost:8000/products \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9zYSIsImlhdCI6MTYzMzA0NzU1NywiZXhwIjoxNjMzMDUxMTU3fQ.Ycsvg7naoD_IANo14-zItkkVSKvG8kHHVJKJL5_dCKY' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: f1d12c62-ca48-97c5-30d7-c1d54558ca0e' \
  -d '{
	"name": "productzero3",
	"price": 0,
	"color": "black"
}'
```

Result
```
{
    "_id": "6156540ab419236d1faa51bc",
    "color": "black",
    "price": 0,
    "name": "productzero3",
    "__v": 0
}
```

[GET] /products

This api to query products with filter, search and sort features.

Request query
```
/products?field1=value1&sort_by=name=-1,price=1&q=name=zero,name=zero&limit=5&skip=6
```

CURL:
```
curl -X GET \
  'http://localhost:8000/products?color=black&sort_by=name%3D-1%2Cprice%3D1&q=name%3Dzero' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 4e6da69e-e071-ae07-f6f4-b95d89f9bc0f' \
  -d '{
	"name": "productzero3",
	"price": 0,
	"color": "black"
}'
```

Result
```
[
    {
        "_id": "6156540ab419236d1faa51bc",
        "color": "black",
        "price": 0,
        "name": "productzero3",
        "__v": 0
    },
    ...
    {
        "_id": "61561ebbdff577a196517dba",
        "color": "black",
        "price": 0,
        "name": "productzero",
        "__v": 0
    }
]
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

CURL:
```
curl -X GET \
  http://localhost:8000/products/61561ebbdff577a196517dba \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9zYSIsImlhdCI6MTYzMzA0NzU1NywiZXhwIjoxNjMzMDUxMTU3fQ.Ycsvg7naoD_IANo14-zItkkVSKvG8kHHVJKJL5_dCKY' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: dd746c43-c5df-84b7-f88b-6c8ccca9ab69' \
  -d '{
	"name": "productzero3",
	"price": 0,
	"color": "black"
}'
```

Result
```
{
    "_id": "61561ebbdff577a196517dba",
    "color": "black",
    "price": 0,
    "name": "productzero",
    "__v": 0
}
```

## Orders Service API

[GET] /token

To create JWT token to put on the header of requests.

CURL
```
curl -X GET \
  http://localhost:8200/token \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 194f6751-3271-2ad4-ed6a-cf9956b041ad'
```

Result
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9zYSIsImlhdCI6MTYzMzA0NzU1NywiZXhwIjoxNjMzMDUxMTU3fQ.Ycsvg7naoD_IANo14-zItkkVSKvG8kHHVJKJL5_dCKY
```

[POST] /orders

This api is to create order of a customer with list of id of product items.
This api will check all items which are existing or not in Product service

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

CURL
```
curl -X POST \
  http://localhost:8200/orders \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9zYSIsImlhdCI6MTYzMzA0NzU1NywiZXhwIjoxNjMzMDUxMTU3fQ.Ycsvg7naoD_IANo14-zItkkVSKvG8kHHVJKJL5_dCKY' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 20dc314d-c524-2d98-fc90-80170fa448d5' \
  -d '{
  "customerName": "Huy Chen",
  "customerAddress": "HCM city",
  "customerEmail": "huychen@test.com",
  "customerPhoneNumber": "09999999666",
  "items": [
    "61561e88dff577a196517db4",
    "61561e8edff577a196517db6",
    "61561e97dff577a196517db8"
  ]
}'
```

Result
```
{
    "items": [
        "61561e88dff577a196517db4",
        "61561e8edff577a196517db6",
        "61561e97dff577a196517db8"
    ],
    "customerPhoneNumber": "09999999666",
    "customerEmail": "huychen@test.com",
    "customerAddress": "HCM city",
    "customerName": "Huy Chen",
    "_id": "615655c3853c713f855c5c75",
    "__v": 0
}
```