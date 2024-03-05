<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

RESTful API for products & services market place with [Nest](https://github.com/nestjs/nest) framework.

## API end points

### /auth/register
POST

#### props: (* means required)
- name*: string, min length 2, max length 50
- email*: valid email (---@---.---)
- password*: strong password with at least 1 (number, lowercase, uppercase, symbol)
- role*: accepts only "customer" or "vendor"
- photo: url
- description: string, min length 20, max length 500
- address.gov: string, the object Id of the governorate that is one of the existing ones in the database
- address.city: string, the object Id of the city
- address.street: string, min length 3 max 100

#### example:
```js
{
  "name": "ali",
  "email": "ali@gmail.com", 
  "password": "1234abCd!",
  "role": "vendor",
  "photo": "images.net/ali.png",
  "description": "Hello I am Ali"
  "address": {
    "gov": "65e4b9c77615d13c7864a0c4",
    "city": "65e4b9c77615d13c7864134g",
    "street": "Awl Abbas St."
  }
}
```



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
