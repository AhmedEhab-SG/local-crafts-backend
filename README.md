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

#### Register: /auth/register

<details>
 <summary>Register Guide</summary>

#### POST

#### props: (\* means required)

- name\*: string, min length 2, max length 50
- email\*: valid email (---@---.---)
- password\*: strong password with at least 1 (number, lowercase, uppercase, symbol)
- role\*: accepts only "customer" or "vendor"
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

</details>

---

#### Product: /product

<details>
 <summary>Product Guide</summary>

#### GET

##### endpoint: ?page=1&limit=10

> query and it takes page and limit default is 1 and 20 respectively

#### return:

```js
{
  "data": [
    {
      "id": "65e5f83085020468684cf",
      "name": "test1",
      "price": 250,
      "description": "test test",
      "photos": [
        "https://i.imgur.com/1o3KcN6.png",
        "https://i.imgur.com/1o3KcN6.png",
        "https://i.imgur.com/1o3KcN6.png"
      ],
      "category": {
        "main": "نجاره",
        "sub": "خشب"
      },
      "vendor": {
        "id": "65e5f706e9c9ebb9d820",
        "name": "test",
        "gov": "65e36f850475bb457ced9",
        "city": "65e371f2617ef1dd3b697"
      },
      "totalOrders": 0,
      "avgRating": 0,
      "approved": false,
      "createdAt": "2024-03-04T16:34:56.971Z"
    },
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "itemCount": 7,
    "pageCount": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  }
}
```

---

#### GET

##### endpoint: /user/65e5cd749711f593e2b42d

> get all products by userID

#### return:

```js
[
  {
    _id: '65e5f83085020468684',
    name: 'test7',
    price: 250,
    description: 'test test',
    photos: [
      'https://i.imgur.com/1o3KcN6.png',
      'https://i.imgur.com/1o3KcN6.png',
      'https://i.imgur.com/1o3KcN6.png',
    ],
    category: {
      main: 'نجاره',
      sub: 'خشب',
    },
    vendor: {
      id: '65e5f706e9c9ebb9d8205',
      name: 'test',
      gov: '65e36f850475bb457ced9',
      city: '65e371f2617ef1dd3b692',
    },
    totalOrders: 0,
    avgRating: 0,
    approved: false,
    createdAt: '2024-03-04T16:34:56.971Z',
    __v: 0,
  },
];
```

---

#### GET

##### endpoint: /65e5cd749711f593e2b42d

> get product by ID

#### return:

```js
{
  "id": "65e5f83085020468684cf",
  "name": "test1",
  "price": 250,
  "description": "test test",
  "photos": [
    "https://i.imgur.com/1o3KcN6.png",
    "https://i.imgur.com/1o3KcN6.png",
    "https://i.imgur.com/1o3KcN6.png"
  ],
  "category": {
    "main": "نجاره",
    "sub": "خشب"
  },
  "vendor": {
    "id": "65e5f706e9c9ebb9d820",
    "name": "test",
    "gov": "65e36f850475bb457ced9",
    "city": "65e371f2617ef1dd3b697"
  },
  "totalOrders": 0,
  "avgRating": 0,
  "approved": false,
  "createdAt": "2024-03-04T16:34:56.971Z"
}
```

---

#### POST

##### endpoint: /

> Create new product

##### props: (\* means required)

- name\*: string, min length 2, max length 50
- prise\*: must be more than 0 and number
- description\*: type string
- photos\*: array of strings[] and min array length is 1
- description: string, min length 20, max length 500
- category.main: must be string main category
- category.sub: must be string sub category

#### example:

```js
{
  "name": "test4",
  "price": 250,
  "description": "test test",
  "photos": [
    "https://i.imgur.com/1o3KcN6.png",
    "https://i.imgur.com/1o3KcN6.png",
    "https://i.imgur.com/1o3KcN6.png"
  ],
  "category": {
    "main": "نجاره",
    "sub": "خشب"
  }
}
```

---

#### Update

##### endpoint: /65e5f83085020468684c

> Update product by productID

##### props: (\* means required)

- name: string, min length 2, max length 50
- prise: must be more than 0 and number
- description: type string
- photos: array of strings[] and min array length is 1
- description: string, min length 20, max length 500
- category.main: must be string main category
- category.sub: must be string sub category
- totalOrders: must be not less than 0
- avgRating: must be not less than 0 and not more than 5
- approved: is a boolen can be modified by admin

#### example:

```js
{
  "name": "test4",
  "price": 250,
  "description": "test test",
  "photos": [
    "https://i.imgur.com/1o3KcN6.png",
    "https://i.imgur.com/1o3KcN6.png",
    "https://i.imgur.com/1o3KcN6.png"
  ],
  "category": {
    "main": "نجاره",
    "sub": "خشب"
  },
  "totalOrders": 0,
  "avgRating": 0,
  "approved": false,
}
```

---

#### Delete

##### endpoint: /65e5f83085020468684c

> Delete product by productID

</details>

---

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
