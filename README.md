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

## Token

> In order to use some of the endpoints you will need first to login and use your own token

#### In Request headers add prop calls "token"

#### example:

```js
headers = {
  token: 'yourOwnToken',
};
```

#### And then send this as header, something like this

```js
response = requests.get(url, { headers });
```

## API Endpoints

<details>
 <summary><b>Authentication</b></summary>

#### POST /auth/register

> ##### request body props: (\* means required)
>
> - name\*: string, min length 2, max length 50
> - email\*: valid email (---@---.---)
> - password\*: strong password with at least 1 (number, lowercase, uppercase, symbol)
> - role\*: accepts only "customer" or "vendor"
> - photo: string, url
> - job\* for vendor: stirng min length 2, max 50
> - phone\* for vendor: string, phone number
> - description\* for vendor : string, min length 20, max length 500
> - address.gov\* for vendor: string, the object Id of the governorate that is one of the existing ones in the database
> - address.city\* for vendor: string, the object Id of the city
> - address.street: string, min length 3 max 100

```json
// request body example
{
  "name": "ali",
  "email": "ali@gmail.com",
  "password": "1234abCd!",
  "role": "vendor",
  "job": "graphic designer",
  "phone": "01234567891",
  "photo": "images.net/ali.png",
  "description": "Hello I am Ali"
  "address": {
    "gov": "65e4b9c77615d13c7864a0c4",
    "city": "65e4b9c77615d13c7864134g",
    "street": "Awl Abbas St."
  }
}
```

#### POST /auth/login

> request an access_token

```json
// request body example
{
  "email": "ali@gmail.com",
  "password": "1234abCd!"
}
```

```json
// response body example
{
  "access_token": "hfpashfuiwndlkfawlkejfoialwef.woiejfoijasoiejflwkejfajwoiefj.aoweijfoaiwjfioawjefoijasdlkfjawoiefj23oijodjfa09wjef3489rpjwefoijw"
}
```

</details>

---

<details>
 <summary><b>Products</b></summary>

#### GET /products?page=1&limit=10

> query and it takes page and limit default is 1 and 20 respectively

#### return:

```json
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
    }
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

```json
[
  {
    "_id": "65e5f83085020468684",
    "name": "test7",
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
      "id": "65e5f706e9c9ebb9d8205",
      "name": "test",
      "gov": "65e36f850475bb457ced9",
      "city": "65e371f2617ef1dd3b692"
    },
    "totalOrders": 0,
    "avgRating": 0,
    "approved": false,
    "createdAt": "2024-03-04T16:34:56.971Z",
    "__v": 0
  }
]
```

---

#### GET products/:productId

> get product by Id

#### return:

```json
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
> [!CAUTION]
> Requires Token

##### props: (\* means required)

- name\*: string, min length 2, max length 50
- price\*: must be more than 0 and number
- description\*: type string
- photos\*: array of strings[] and min array length can be 0
- description\*: string, min length 20, max length 500
- category.main\*: must be string main category
- category.sub\*: must be string sub category

#### example:

```json
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
> [!CAUTION]
> Requires Token

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

```json
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
  "approved": false
}
```

---

#### DELETE /products/:productId

> Delete product by productId
> [!CAUTION]
> Requires Token

</details>

---

<details>
 <summary><b>Services</b></summary>

#### GET /services?page=1&limit=10

> query and it takes page and limit default is 1 and 20 respectively

#### return:

```json
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
    }
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

```json
[
  {
    "_id": "65e5f83085020468684",
    "name": "test7",
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
      "id": "65e5f706e9c9ebb9d8205",
      "name": "test",
      "gov": "65e36f850475bb457ced9",
      "city": "65e371f2617ef1dd3b692"
    },
    "totalOrders": 0,
    "avgRating": 0,
    "approved": false,
    "createdAt": "2024-03-04T16:34:56.971Z",
    "__v": 0
  }
]
```

---

#### GET services/:serviceId

> get services by Id

#### return:

```json
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
> [!CAUTION]
> Requires Token

##### props: (\* means required)

- name\*: string, min length 2, max length 50
- price\*: must be more than 0 and number
- description\*: type string
- photos\*: array of strings[] and min array length is 1
- description\*: string, min length 20, max length 500
- category.main\*: must be string main category
- category.sub\*: must be string sub category

#### example:

```json
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
> [!CAUTION]
> Requires Token

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

```json
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
  "approved": false
}
```

---

#### DELETE /services/:serviceId

> Delete service by serviceId
> [!CAUTION]
> Requires Token

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
> [!CAUTION]
> Requires Token

#### return:

```json
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
    }
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
> [!CAUTION]
> Requires Token

#### return:

```json
{
  "_id": "65e5cd41f9206d7ec12594",
  "name": "ali",
  "email": "ali@gg.ez",
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
> [!CAUTION]
> Requires Token

##### props: (\* means required)

- name: string, min length 2, max length 50
- password: strong password with at least 1 (number, lowercase, uppercase, symbol) -- ( if password found must provide newPassword )
- newPasswword: strong password with at least 1 (number, lowercase, uppercase, symbol) -- ( if newPassword found must provide oldPassword as prop: "password" )
- role: accepts only "customer" or "vendor"
- photo: url
- description: string, min length 20, max length 500
- address.gov: string, the object Id of the governorate that is one of the existing ones in the database
- address.city: string, the object Id of the city
- address.street: string, min length 3 max 100

#### example:

```json
{
  "name": "ali",
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
> [!CAUTION]
> Requires Token

</details>

---

<details>
 <summary><b>Locations</b></summary>

#### GET /locatoins/governorates

> get all available governorates

response

```json
[
  {
    "_id": "65e36f850475bb457ced99a9",
    "name": "الاسكندرية",
    "__v": 0
  },
  {
    "_id": "65e36f850475bb457ced99ac",
    "name": "القاهرة",
    "__v": 0
  },
  {
    "_id": "65e36f850475bb457ced99ad",
    "name": "الشرقية",
    "__v": 0
  }
]
```

#### GET locations/cities/:govId

> get cities in a governorate

response

```json
[
  {
    "_id": "65e374093c963b2c090fe3b5",
    "name": "السلام",
    "gov": "65e36f850475bb457ced99ac",
    "__v": 0
  },
  {
    "_id": "65e374093c963b2c090fe3b6",
    "name": "المرج",
    "gov": "65e36f850475bb457ced99ac",
    "__v": 0
  },
  {
    "_id": "65e374093c963b2c090fe3b7",
    "name": "مدينة نصر",
    "gov": "65e36f850475bb457ced99ac",
    "__v": 0
  }
]
```

#### POST /locations/governorates

> add new governorates

> [!CAUTION]
> body schema: Array of strings

```json
["الاقصر", "شمال سيناء", "البحيرة"]
```

#### POST /locations/cities/:govId

> add new cities to a governorate

> [!CAUTION]
> body schema: Array of strings

```json
["السلام", "المرج", "مدينة نصر"]
```

#### DELETE /locations/governorates/:govId

> delete a governorate and all related cities / users

#### DELETE /locations/cities/:cityId

> delete a city and all related users

</details>

---

<details>
 <summary><b>Categories</b></summary>

#### GET services/categories/

#### GET products/categories/

> get all (services or products) categories

response body

```json
[
  {
    "_id": "65e4b9c77615d13c7864a0c4",
    "name": "اعمال نجااااااارة",
    "description": "باب النجارين بتوعنا مش مخلع",
    "photo": "www/gg/ez",
    "__v": 0
  },
  {
    "_id": "65e86289ba817f471d0d653b",
    "name": "سبااااكههه",
    "description": "سباكين محنكين عالأخر",
    "photo": "www/gg/ez",
    "__v": 0
  }
]
```

---

#### GET services/categories/:categoryId

#### GET products/categories/:categoryId

> get all (services or products) sub categories of one category

response body

```json
[
  {
    "_id": "65e4c166934f4917574449b5",
    "name": "باب و شباك",
    "parent": "65e4b9c77615d13c7864a0c4",
    "__v": 0
  },
  {
    "_id": "65e4c166934f4917574449b7",
    "name": "مكاتب",
    "parent": "65e4b9c77615d13c7864a0c4",
    "__v": 0
  },
  {
    "_id": "65e77927c9bc33d8a77113cf",
    "name": "مطابخ",
    "parent": "65e4b9c77615d13c7864a0c4",
    "__v": 0
  }
]
```

---

#### POST services/categories/

#### POST products/categories/

> add main category (services or products)

> Body Schema: Object with the following props
>
> - name: required, string, min length 3, max length 50
> - photo: string, url
> - description: string min length 10 max lenght 500

request body

```json
{
  "name": "سبااااكههه",
  "description": "سباكين محنكين عالأخر",
  "photo": "www/gg/ez"
}
```

response body if added successfully

```json
{
  "name": "سبااااكههه",
  "description": "سباكين محنكين عالأخر",
  "photo": "www/gg/ez",
  "_id": "65e86289ba817f471d0d653b",
  "__v": 0
}
```

---

#### POST services/categories/:categoryId

#### POST products/categories/:categoryId

> add sub categories to a category

> [!CAUTION]
> body schema: Array of strings

request body

```json
["باب و شباك", "مطابخ", "مكاتب"]
```

response body

```
... same as GET if no conflict happened
```

---

#### PATCH services/categories/:categoryId

#### PATCH products/categories/:categoryId

> Update category by Id (main or sub)

> Body Schema: Object with the following props
>
> - name: string, min length 3, max length 50
> - photo: string, url
> - description: string min length 10 max lenght 500

request body

```json
{
  "name": "سباكه"
}
```

response body on success

```json
{
  "name": "سباكه",
  "description": "سباكين محنكين عالأخر",
  "photo": "www/gg/ez",
  "_id": "65e86289ba817f471d0d653b",
  "__v": 0
}
```

---

#### DELETE services/categories/:categoryId

#### DELETE products/categories/:categoryId

> Delete category (main or sub)

</details>

---

<details>
 <summary><b>Search</b></summary>

#### GET /search?q="query"

> query takes any string to search in products, services or vendor users

#### return:

```json
[
  {
    "products": [
      {
        "_id": "65ea40b19f38b1956072af85",
        "name": "testAp",
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
          "id": "65e5f706e9c9ebb9d820e575",
          "name": "test",
          "gov": "65e36f850475bb457ced99a9",
          "city": "65e371f2617ef1dd3b697ec2"
        },
        "totalOrders": 0,
        "avgRating": 0,
        "approved": false,
        "createdAt": "2024-03-07T22:33:21.468Z",
        "__v": 0
      }
    ]
  },
  {
    "services": [
      {
        "_id": "65ea42079ec515665816ccda",
        "name": "test",
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
          "id": "65e5f706e9c9ebb9d820e575",
          "name": "test",
          "gov": "65e36f850475bb457ced99a9",
          "city": "65e371f2617ef1dd3b697ec2"
        },
        "totalOrders": 0,
        "avgRating": 0,
        "approved": false,
        "createdAt": "2024-03-07T22:39:03.539Z",
        "__v": 0
      }
    ]
  },
  {
    "users": [
      {
        "_id": "65e62ca5b00ec58e08d2360d",
        "name": "test",
        "email": "test2@gmail.com",
        "role": "vendor",
        "address": {
          "gov": "65e36f850475bb457ced99a9",
          "city": "65e371f2617ef1dd3b697ec2"
        },
        "photo": "https/gg.ex",
        "description": "علي علوكا",
        "__v": 0,
        "createdAt": "2024-03-17T22:07:02.640Z"
      }
    ]
  }
]
```

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
