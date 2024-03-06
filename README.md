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

<details>
 <summary><b>Authentication</b></summary>

#### POST /auth/register

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

<details>
 <summary><b>Products</b></summary>

#### GET /products?page=1&limit=10

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

#### GET products/user/:userId

> get all products by userId

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

#### GET products/:productId

> get product by Id

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

#### POST /products

> Create new product

##### props: (\* means required)

- name\*: string, min length 2, max length 50
- price\*: must be more than 0 and number
- description\*: type string
- photos\*: array of strings[] and min array length can be 0
- description\*: string, min length 20, max length 500
- category.main\*: must be string main category
- category.sub\*: must be string sub category

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

#### PATCH /products/:productId

> Update product by productId

##### props: (\* means required)

- name: string, min length 2, max length 50
- price: must be more than 0 and number
- description: type string
- photos: array of strings[] and min array length can be 0
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

#### DELETE /products/:productId

> Delete product by productId

</details>

---

<details>
 <summary><b>Services</b></summary>

#### GET /services?page=1&limit=10

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

#### GET services/user/:userId

> get all services by userId

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

#### GET services/:serviceId

> get services by Id

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

#### POST /services

> Create new service

##### props: (\* means required)

- name\*: string, min length 2, max length 50
- price\*: must be more than 0 and number
- description\*: type string
- photos\*: array of strings[] and min array length is 1
- description\*: string, min length 20, max length 500
- category.main\*: must be string main category
- category.sub\*: must be string sub category

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

#### PATCH /services/:serviceId

> Update service by servicesId

##### props: (\* means required)

- name: string, min length 2, max length 50
- price: must be more than 0 and number
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

#### DELETE /services/:serviceId

> Delete service by serviceId

</details>

---

<details>
 <summary><b>Orders</b></summary>

#### GET /orders

> get all orders for the current logged in user

#### GET /orders/:orderId

> get infromations about specific order

#### DELETE /orders/:orderId

> customer, vendor can delete products they have done.

#### POST /products/:productId/order

#### POST /services/:serviceId/order

> submit an order request from the current logged in user
> user must be a customer (not even admin can do this)

> [!CAUTION]
> Body Schema is object with message inside

```js
{
  message: '500 > length > 10';
}
```

</details>

---

<details>
 <summary><b>Users</b></summary>

#### GET /users?page=1&limit=10

> query and it takes page and limit default is 1 and 20 respectively

#### return:

```js
{
  "data": [
    {
      "id": "65e5cd41f9206d7ec12597",
      "name": "ali",
      "email": "ali@gg.ez",
      "password": "hashedPassword",
      "role": "vendor",
      "address": {
        "gov": "65e36f850475bb457ced99a9",
        "city": "65e371f2617ef1dd3b697ec2"
      },
      "photo": "https/gg.ex",
      "description": "علي علوكا"
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

#### GET users/:userId

> get user by Id

#### return:

```js
{
  "_id": "65e5cd41f9206d7ec12594",
  "name": "ali",
  "email": "ali@gg.ez",
  "password": "hashedPassword",
  "role": "vendor",
  "address": {
    "gov": "65e36f850475bb457ced99a9",
    "city": "65e371f2617ef1dd3b697ec2"
  },
  "photo": "https/gg.ex",
  "description": "علي علوكا",
  "__v": 0
}
```

---

#### PATCH /users/:userId

> Update user by userId

##### props: (\* means required)

- name: string, min length 2, max length 50
- email: valid email (---@---.---)
- password: strong password with at least 1 (number, lowercase, uppercase, symbol) -- ( if password found must provide newPassword )
- newPasswword: strong password with at least 1 (number, lowercase, uppercase, symbol) -- ( if newPassword found must provide oldPassword as prop: "password" )
- role: accepts only "customer" or "vendor"
- photo: url
- description: string, min length 20, max length 500
- address.gov: string, the object Id of the governorate that is one of the existing ones in the database
- address.city: string, the object Id of the city
- address.street: string, min length 3 max 100

#### example:

```js
{
  "name": "ali",
  "email": "ali@gg.ez",
  "password": "oldPassword123@!",
  "newPassword": "newPassword123@!",
  "role": "vendor",
  "address": {
    "gov": "65e36f850475bb457ced99a9",
    "city": "65e371f2617ef1dd3b697ec2"
  },
  "photo": "https/gg.ex",
  "description": "علي علوكا",
  "__v": 0
}
```

---

#### DELETE /users/:userId

> Delete user by serviceId

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
