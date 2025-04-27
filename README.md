# API

Comprehensive RESTful API built with Node.js, Express, and MongoDB. Features JWT-based authentication, user management, product catalog, and order processing for the Avila Tek platform.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Prefix](#api-prefix)
- [Environment Variables](#environment-variables)
- [Authentication Flow](#authentication-flow)
- [Endpoints](#endpoints)
  - [Auth](#auth)
  - [Users](#users)
  - [Products](#products)
  - [Orders](#orders)
- [Pagination, Filtering & Population](#pagination-filtering--population)
- [Error & Success Response Format](#error--success-response-format)

---

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing application data.
- **JWT (JSON Web Token)**: For secure authentication and authorization.

## Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/santiagovm2000/test-express-api
   ```
2. Move to the folder
   ```bash
   cd test-express-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Rename the file `.env.example` to `.env`

## Running the Application

Start the server:
```bash
npm run dev
```
## API Prefix

All routes use the prefix defined by `APP_PREFIX` (`/api/v1`).

## Environment Variables

| Variable                 | Description                         |
| ------------------------ | ----------------------------------- |
| `APP_PORT`               | Server port                         |
| `APP_PREFIX`             | Base path for all endpoints         |
| `MONGO_URI`              | MongoDB connection URI              |
| `MONGO_DB_NAME`          | MongoDB database name               |
| `JWT_SECRET`             | Secret for signing JWTs             |
| `JWT_EXPIRES_IN_MINUTES` | JWT expiration in minutes           |

## Authentication Flow

1. **Login**: `POST /api/v1/auth/login` with username/password.  
2. **Receive** JWT `<token>`.  
3. **Use** `Authorization: Bearer <token>` header for protected routes.

---

## Endpoints

### Auth

#### Login

- **Method:** `POST`  
- **URL:** `/api/v1/auth/login`
- **Protected (JWT):** `No`
- **Request Body:**
  ```json
  {
    "username": "jdoe",
    "password": "pass"
  }
  ```
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1Ni...",
      "expiresInMinutes": 60
    }
  }
  ```

---

### Users

#### Create User

- **Method:** `POST`  
- **URL:** `/api/v1/users`
- **Protected (JWT):** `No`
- **Request Body:**
  ```json
  {
    "username": "exampleuser",
    "name": "My name",
    "email": "email@example.com",
    "password": "S3cureP@ss!"
  }
  ```
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
        "username": "exampleuser",
        "name": "My name",
        "email": "email@example.com",
        "password": "$2b$10$E2OWICc2nj7kPFGOsuryEuRsDF7tgiKjfTKCBPKoWv7q9lNo47GXC",
        "status": "ACTIVE",
        "_id": "680d89af5f288297b60f6cd3",
        "createdAt": "2025-04-27T01:34:39.594Z",
        "updatedAt": "2025-04-27T01:34:39.594Z",
        "__v": 0
    }
  }
  ```

#### Get All Users

- **Method:** `GET`  
- **URL:** `/api/v1/users`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Users retrieved successfully",
    "data": {
        "items": [
            {
                "_id": "680d039527d001a385498754",
                "username": "jdoe edited",
                "name": "John Doe",
                "email": "jdoe@exampleee.com",
                "password": "$2b$10$jRb3HY7vIEXCxl9N7hdY9e1gd/VJTX1mnQ1LwERvIUEEJ0o3Fuqka",
                "status": "ACTIVE",
                "createdAt": "2025-04-26T16:02:29.063Z",
                "updatedAt": "2025-04-27T01:42:07.698Z",
                "__v": 0
            }
        ],
        "total": 4,
        "page": 1,
        "pages": 4
    }
  }
  ```

#### Get User by ID

- **Method:** `GET`  
- **URL:** `/api/v1/users/:id`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "User retrieved successfully",
    "data": {
        "_id": "680d039527d001a385498754",
        "username": "jdoe",
        "name": "John Doe",
        "email": "jdoe@examplee.com",
        "password": "$2b$10$jRb3HY7vIEXCxl9N7hdY9e1gd/VJTX1mnQ1LwERvIUEEJ0o3Fuqka",
        "status": "ACTIVE",
        "createdAt": "2025-04-26T16:02:29.063Z",
        "updatedAt": "2025-04-27T00:30:02.818Z",
        "__v": 0
    }
  }
  ```

#### Update User

- **Method:** `PATCH`  
- **URL:** `/api/v1/users/:id`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Request Body (example):**
  ```json
  {
    "email": "jdoe@exampleee.com"
  }
  ```
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "User updated successfully",
    "data": {
        "_id": "680d039527d001a385498754",
        "username": "jdoe edited",
        "name": "John Doe",
        "email": "jdoe@exampleee.com",
        "password": "$2b$10$jRb3HY7vIEXCxl9N7hdY9e1gd/VJTX1mnQ1LwERvIUEEJ0o3Fuqka",
        "status": "ACTIVE",
        "createdAt": "2025-04-26T16:02:29.063Z",
        "updatedAt": "2025-04-27T01:39:10.819Z",
        "__v": 0
    }
  }
  ```

#### Delete User

- **Method:** `DELETE`  
- **URL:** `/api/v1/users/:id`
- **Protected (JWT):** `Yes` 
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "User deleted successfully",
    "data": {
        "_id": "680d458af7315c1af80c1824",
        "username": "pedro",
        "name": "Pedro Doe",
        "email": "pedro@examplee.com",
        "password": "$2b$10$mbZ1Omc4pH/jSmFXZT.qb.Cwlr4hKLqf5q5Di4Qyp.q/B9tmgSvfu",
        "status": "ACTIVE",
        "createdAt": "2025-04-26T20:43:54.360Z",
        "updatedAt": "2025-04-26T20:43:54.360Z",
        "__v": 0
    }
  }
  ```

#### Inactivate User

- **Method:** `POST`  
- **URL:** `/api/v1/users/inactivate/:id`
- **Protected (JWT):** `Yes` 
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "User inactivated successfully",
    "data": {
        "_id": "680d039527d001a385498754",
        "username": "jdoe edited",
        "name": "John Doe",
        "email": "jdoe@exampleee.com",
        "password": "$2b$10$jRb3HY7vIEXCxl9N7hdY9e1gd/VJTX1mnQ1LwERvIUEEJ0o3Fuqka",
        "status": "INACTIVE",
        "createdAt": "2025-04-26T16:02:29.063Z",
        "updatedAt": "2025-04-27T01:41:20.001Z",
        "__v": 0
    }
  }
  ```

#### Activate User

- **Method:** `POST`  
- **URL:** `/api/v1/users/activate/:id`
- **Protected (JWT):** `Yes` 
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
      "success": true,
      "message": "User activated successfully",
      "data": {
          "_id": "680d039527d001a385498754",
          "username": "jdoe edited",
          "name": "John Doe",
          "email": "jdoe@exampleee.com",
          "password": "$2b$10$jRb3HY7vIEXCxl9N7hdY9e1gd/VJTX1mnQ1LwERvIUEEJ0o3Fuqka",
          "status": "ACTIVE",
          "createdAt": "2025-04-26T16:02:29.063Z",
          "updatedAt": "2025-04-27T01:42:07.698Z",
          "__v": 0
      }
  }
  ```

---

### Products

#### Create Product

- **Method:** `POST`  
- **URL:** `/api/v1/products`
- **Protected (JWT):** `Yes` 
- **Headers:** `Authorization: Bearer <token>`  
- **Request Body:**
  ```json
  {
    "productCode": "PR0123",
    "name": "Xiami POCO1",
    "description": "Smartphone Xiami POCO con Qualcomm.",
    "price": 799.99,
    "quantityInStock": 3
  }
  ```
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Product created successfully",
    "data": {
        "productCode": "PR0123",
        "name": "Xiami POCO1",
        "description": "Smartphone Xiami POCO con Qualcomm.",
        "price": 799.99,
        "quantityInStock": 3,
        "_id": "680d8ba35f288297b60f6ce3",
        "createdAt": "2025-04-27T01:42:59.840Z",
        "updatedAt": "2025-04-27T01:42:59.840Z",
        "__v": 0
    }
  }
  ```

#### Get All Products

- **Method:** `GET`  
- **Base URL:** `/api/v1/products`
- **Example URL params:** `?productCode=PR012`
- **Final URL:** `/api/v1/products?productCode=PR012`
- **Protected (JWT):** `Yes`
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Products retrieved successfully",
    "data": {
        "items": [
            {
                "_id": "680d5cd539f0b70b433b62dd",
                "productCode": "PR012",
                "name": "Xiami POCO",
                "description": "SmartphoneXiami POCO con Qualcomm.",
                "price": 799.99,
                "quantityInStock": 3,
                "createdAt": "2025-04-26T22:23:17.161Z",
                "updatedAt": "2025-04-26T22:23:17.161Z",
                "__v": 0
            }
        ],
        "total": 1,
        "page": 1,
        "pages": 1
    }
  }
  ```

#### Get Product by ID

- **Method:** `GET`  
- **URL:** `/api/v1/products/:id`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Product retrieved successfully",
    "data": {
        "_id": "680d5cd539f0b70b433b62dd",
        "productCode": "PR012",
        "name": "Xiami POCO",
        "description": "SmartphoneXiami POCO con Qualcomm.",
        "price": 799.99,
        "quantityInStock": 3,
        "createdAt": "2025-04-26T22:23:17.161Z",
        "updatedAt": "2025-04-26T22:23:17.161Z",
        "__v": 0
    }
  }
  ```

#### Update Product

- **Method:** `PATCH`  
- **URL:** `/api/v1/products/:id`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Request Body (example):**
  ```json
  {
    "price": 200.34
  }
  ```
- **Response (Positive Status)**
  ```json
  {
      "success": true,
      "message": "Product updated successfully",
      "data": {
          "_id": "680d5cd539f0b70b433b62dd",
          "productCode": "PR012",
          "name": "Xiami POCO",
          "description": "SmartphoneXiami POCO con Qualcomm.",
          "price": 200.34,
          "quantityInStock": 3,
          "createdAt": "2025-04-26T22:23:17.161Z",
          "updatedAt": "2025-04-27T01:48:58.023Z",
          "__v": 0
      }
  }
  ```

#### Delete Product

- **Method:** `DELETE`  
- **URL:** `/api/v1/products/:id`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
      "success": true,
      "message": "Product deleted successfully",
      "data": {
          "_id": "680d5cd539f0b70b433b62dd",
          "productCode": "PR012",
          "name": "Xiami POCO",
          "description": "SmartphoneXiami POCO con Qualcomm.",
          "price": 200.34,
          "quantityInStock": 3,
          "createdAt": "2025-04-26T22:23:17.161Z",
          "updatedAt": "2025-04-27T01:48:58.023Z",
          "__v": 0
      }
  }
  ```

---

### Orders

#### Create Order

- **Method:** `POST`  
- **URL:** `/api/v1/orders`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Request Body:**
  ```json
  {
    "products": [
      {
        "product": "680d5ca839f0b70b433b62db",
        "quantity": 2
      },
          {
        "product": "680d5cd539f0b70b433b62dd",
        "quantity": 1
      }
    ],
    "totalAmount": 1098.97,
    "status": "PENDING"
  }
  ```
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Order created successfully",
    "data": {
        "user": "680d039527d001a385498754",
        "products": [
            {
                "product": "680d5ca839f0b70b433b62db",
                "quantity": 2
            },
            {
                "product": "680d5cd539f0b70b433b62dd",
                "quantity": 1
            }
        ],
        "totalAmount": 1098.97,
        "totalProducts": 2,
        "status": "PENDING",
        "_id": "680d8d485f288297b60f6cf7",
        "createdAt": "2025-04-27T01:50:00.099Z",
        "updatedAt": "2025-04-27T01:50:00.099Z",
        "__v": 0
    }
  }
  ```

#### Get All Orders

- **Method:** `GET`  
- **Base URL:** `/api/v1/orders`
- **Example URL params:** `?with=user,products.product&limit=1`
- **Final URL:** `/api/v1/orders?with=user,products.product&limit=1`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Orders retrieved successfully",
    "data": {
        "items": [
            {
                "_id": "680d901fbed90815e4c8bee7",
                "user": {
                    "_id": "680d039527d001a385498754",
                    "username": "jdoe edited",
                    "name": "John Doe",
                    "email": "jdoe@exampleee.com",
                    "password": "$2b$10$jRb3HY7vIEXCxl9N7hdY9e1gd/VJTX1mnQ1LwERvIUEEJ0o3Fuqka",
                    "status": "ACTIVE",
                    "createdAt": "2025-04-26T16:02:29.063Z",
                    "updatedAt": "2025-04-27T01:42:07.698Z",
                    "__v": 0
                },
                "products": [
                    {
                        "product": {
                            "_id": "680d5ca839f0b70b433b62db",
                            "productCode": "REDMI9",
                            "name": "Xiaomi Redmi 9S",
                            "description": "Teléfono inteligente Xiaomi Redmi 9 con batería de 5020 mAh y cámara de 13 MP.",
                            "price": 149.49,
                            "quantityInStock": 9,
                            "createdAt": "2025-04-26T22:22:32.520Z",
                            "updatedAt": "2025-04-27T01:47:58.975Z",
                            "__v": 0
                        },
                        "quantity": 2
                    },
                    {
                        "product": null,
                        "quantity": 1
                    }
                ],
                "totalAmount": 1098.97,
                "totalProducts": 2,
                "status": "PENDING",
                "createdAt": "2025-04-27T02:02:07.521Z",
                "updatedAt": "2025-04-27T02:02:07.521Z",
                "__v": 0
            }
        ],
        "total": 3,
        "page": 1,
        "pages": 3
    }
  }
  ```

#### Get Order by ID

- **Method:** `GET`  
- **URL:** `/api/v1/orders/:id`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Order retrieved successfully",
    "data": {
        "_id": "680d901fbed90815e4c8bee7",
        "user": "680d039527d001a385498754",
        "products": [
            {
                "product": "680d5ca839f0b70b433b62db",
                "quantity": 2
            },
            {
                "product": "680d5cd539f0b70b433b62dd",
                "quantity": 1
            }
        ],
        "totalAmount": 1098.97,
        "totalProducts": 2,
        "status": "PENDING",
        "createdAt": "2025-04-27T02:02:07.521Z",
        "updatedAt": "2025-04-27T02:02:07.521Z",
        "__v": 0
    }
  }
  ```

#### Update Order

- **Method:** `PATCH`  
- **URL:** `/api/v1/orders/:id`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Request Body (example):**
  ```json
  {
    "status": "SHIPPED"
  }
  ```
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Order updated successfully",
    "data": {
        "_id": "680d901fbed90815e4c8bee7",
        "user": "680d039527d001a385498754",
        "products": [
            {
                "product": "680d5ca839f0b70b433b62db",
                "quantity": 2
            },
            {
                "product": "680d5cd539f0b70b433b62dd",
                "quantity": 1
            }
        ],
        "totalAmount": 1098.97,
        "totalProducts": 2,
        "status": "SHIPPED",
        "createdAt": "2025-04-27T02:02:07.521Z",
        "updatedAt": "2025-04-27T02:04:45.141Z",
        "__v": 0
    }
  }
  ```

#### Delete Order

- **Method:** `DELETE`  
- **URL:** `/api/v1/orders/:id`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
      "success": true,
      "message": "Order deleted successfully",
      "data": {
          "_id": "680d901fbed90815e4c8bee7",
          "user": "680d039527d001a385498754",
          "products": [
              {
                  "product": "680d5ca839f0b70b433b62db",
                  "quantity": 2
              },
              {
                  "product": "680d5cd539f0b70b433b62dd",
                  "quantity": 1
              }
          ],
          "totalAmount": 1098.97,
          "totalProducts": 2,
          "status": "SHIPPED",
          "createdAt": "2025-04-27T02:02:07.521Z",
          "updatedAt": "2025-04-27T02:04:45.141Z",
          "__v": 0
      }
  }
  ```

#### Get Orders by User

- **Method:** `GET`  
- **Base URL:** `/api/v1/orders/from/:userId`
- **Example URL params:** `?with=products.product&page=1&limit=1`
- **Final URL:** `/api/v1/orders/from/:userId?with=products.product&page=1&limit=1`
- **Protected (JWT):** `Yes`
- **Headers:** `Authorization: Bearer <token>`  
- **Response (Positive Status)**
  ```json
  {
    "success": true,
    "message": "Orders retrieved successfully",
    "data": {
        "items": [
            {
                "_id": "680d9021bed90815e4c8beeb",
                "user": "680d039527d001a385498754",
                "products": [
                    {
                        "product": {
                            "_id": "680d5ca839f0b70b433b62db",
                            "productCode": "REDMI9",
                            "name": "Xiaomi Redmi 9S",
                            "description": "Teléfono inteligente Xiaomi Redmi 9 con batería de 5020 mAh y cámara de 13 MP.",
                            "price": 149.49,
                            "quantityInStock": 9,
                            "createdAt": "2025-04-26T22:22:32.520Z",
                            "updatedAt": "2025-04-27T01:47:58.975Z",
                            "__v": 0
                        },
                        "quantity": 2
                    },
                    {
                        "product": null,
                        "quantity": 1
                    }
                ],
                "totalAmount": 1098.97,
                "totalProducts": 2,
                "status": "PENDING",
                "createdAt": "2025-04-27T02:02:09.261Z",
                "updatedAt": "2025-04-27T02:02:09.261Z",
                "__v": 0
            }
        ],
        "total": 2,
        "page": 1,
        "pages": 2
    }
  }
  ```

---

## Pagination, Filtering & Population

- **Pagination:** specify `?page=<number>&limit=<number>` in your query string.  
  - `page` (default `1`) selects which page of results to return.  
  - `limit` (default `20`) defines how many records per page.  
  _Example:_ `/api/v1/products?page=2&limit=10` returns items 11–20.

- **Filtering:** add any model field as a query parameter to filter results.  
  _Example:_ `/api/v1/orders?status=SHIPPED` only returns orders with status `"SHIPPED"`.

- **Population:** use `?with=<relation1>,<relation2>` to populate referenced documents.  
  _Example:_ `/api/v1/orders?with=user,products` replaces `user` and `products.product` IDs with full objects.

## Error & Success Response Format

**Success** uses `sendSuccessResponse(res, data, message, statusCode)`:
```json
{
  "success": true,
  "message": "<message>",
  "data": <any>
}
```

**Error** uses `sendErrorResponse(res, message, statusCode, errors?)`:
```json
{
  "success": false,
  "message": "<error message>",
  "errors": { /* optional details */ }
}
```

## Author

**Santiago Vieira Modesti**

- **Email**: [vieirasantiagovieira@gmail.com](mailto:vieirasantiagovieira@gmail.com)
- **GitHub**: [https://github.com/santiagovm2000](https://github.com/santiagovm2000)

