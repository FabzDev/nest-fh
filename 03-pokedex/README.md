<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo

1. Clonar el repositorio

2. Ejecutar el comando 
    ```
    npm install
    ```

3. Instalar Nest CLI 
    ```
    npm i -g @nestjs/cli
    ```

4. Levantar la base de datos
    ```
    docker-compose up -d
    ```
5. Reconstruir la base de datos con la semilla (SEED)
    ```
    http://localhost:3000/api/v2/seed
    ```
## Stack usado
 * MongoDB
 * NestJS