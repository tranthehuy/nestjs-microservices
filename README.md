# Microservices

- This is an example repo to show how to build a Microservice Architecture with NestJS

- Each service has a seperated README.md to start and run this services

- Each service has a .env.sample file. Please copy this file and renamed to .env

- Please follow the instructions in each service to install package and start

## For development environment

- In development, the `API_HOST` is different between services so that it can call api together.

## For production environment

- In production, we can use the same `API_HOST` with a load balancer.

- Please use the same `APP_SECRET` in .env for both services so that these services can communicate together.