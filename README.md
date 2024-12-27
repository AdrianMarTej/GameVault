# GameVault

Project for Advanced development of applications for the Data Web

<div align="center">
  <img src="/game-vault-frontend/src/assets/logo.jpg" alt="GameVault logo" width="300"/>
</div>

## Architecture

This project consists of various microservices, an api gateway and a front-end.
* [API Gateway](/api-gateway)
* [Authentication microservice](/auth-service)
* [Database microservice](/mongo-api)
* [Steam API Wrapper microservice](/steam-games-api)
* [Front-end](/game-vault-frontend)

### Back-end

The Steam wrapper is being developed in Python using FastAPI.
The authentication, database and API Gateway are being developed in Node.js using Express.
The database is being developed using the product MongoDB.

### Front-end

The front-end is being developed in TypeScript using Angular 17.

## Running the containerized application

A compose file for docker has been created so in order to run the application, you'll only need to clone the repository and then compose it up!

### Executing

To execute the application, you'll only need to run the docker compose file and all the containers will be up and running.

```
cd GameVault
docker compose up -d
```

> [!WARNING]
> Please give the application a few seconds to boot up.

If everything went fine, the website should be up at `http://localhost:4200/`.

## Developped by

[Adrián Martínez](https://github.com/AdrianMarTej)
