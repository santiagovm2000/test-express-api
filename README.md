# Api-Express-MongoDB-JWTAuth

## Description

Api-Express-MongoDB-JWTAuth is a RESTful API built using Node.js, Express, MongoDB, and JWT (JSON Web Token) for authentication. This API provides secure endpoints for managing resources, with token-based authentication to ensure only authorized users can access protected routes.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM library for MongoDB.
- **JWT (JSON Web Token)**: For secure authentication and authorization.
- **dotenv**: For managing environment variables.
- **bcrypt**: For hashing passwords.

## Endpoints

### 1. Login

**Endpoint**: `/api/auth/login`  
**Method**: POST  
**Description**: Authenticates a user and returns a JWT token.

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response**:

```json
{
  "token": "your.jwt.token"
}
```

**Example Request** (using `curl`):

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "yourpassword"}'
```

---

### 2. Get User Profile

**Endpoint**: `/api/users/profile`  
**Method**: GET  
**Description**: Retrieves the profile of the authenticated user.

**Headers**:

```json
{
  "Authorization": "Bearer your.jwt.token"
}
```

**Response**:

```json
{
  "id": "12345",
  "name": "John Doe",
  "email": "user@example.com"
}
```

**Example Request**:

```bash
curl -X GET http://localhost:3000/api/users/profile \
-H "Authorization: Bearer your.jwt.token"
```

---

### 3. Create Resource

**Endpoint**: `/api/resources`  
**Method**: POST  
**Description**: Creates a new resource.

**Headers**:

```json
{
  "Authorization": "Bearer your.jwt.token"
}
```

**Request Body**:

```json
{
  "name": "Resource Name",
  "description": "Resource Description"
}
```

**Response**:

```json
{
  "id": "67890",
  "name": "Resource Name",
  "description": "Resource Description"
}
```

**Example Request**:

```bash
curl -X POST http://localhost:3000/api/resources \
-H "Authorization: Bearer your.jwt.token" \
-H "Content-Type: application/json" \
-d '{"name": "Resource Name", "description": "Resource Description"}'
```

---

### 4. Get All Resources

**Endpoint**: `/api/resources`  
**Method**: GET  
**Description**: Retrieves a list of all resources.

**Headers**:

```json
{
  "Authorization": "Bearer your.jwt.token"
}
```

**Response**:

```json
[
  {
    "id": "67890",
    "name": "Resource Name",
    "description": "Resource Description"
  },
  {
    "id": "12345",
    "name": "Another Resource",
    "description": "Another Description"
  }
]
```

**Example Request**:

```bash
curl -X GET http://localhost:3000/api/resources \
-H "Authorization: Bearer your.jwt.token"
```

---

### 5. Update Resource

**Endpoint**: `/api/resources/:id`  
**Method**: PUT  
**Description**: Updates an existing resource by ID.

**Headers**:

```json
{
  "Authorization": "Bearer your.jwt.token"
}
```

**Request Body**:

```json
{
  "name": "Updated Resource Name",
  "description": "Updated Description"
}
```

**Response**:

```json
{
  "id": "67890",
  "name": "Updated Resource Name",
  "description": "Updated Description"
}
```

**Example Request**:

```bash
curl -X PUT http://localhost:3000/api/resources/67890 \
-H "Authorization: Bearer your.jwt.token" \
-H "Content-Type: application/json" \
-d '{"name": "Updated Resource Name", "description": "Updated Description"}'
```

---

### 6. Delete Resource

**Endpoint**: `/api/resources/:id`  
**Method**: DELETE  
**Description**: Deletes a resource by ID.

**Headers**:

```json
{
  "Authorization": "Bearer your.jwt.token"
}
```

**Response**:

```json
{
  "message": "Resource deleted successfully"
}
```

**Example Request**:

```bash
curl -X DELETE http://localhost:3000/api/resources/67890 \
-H "Authorization: Bearer your.jwt.token"
```

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/santiagovm2000/test-express-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Rename then `.env.example` file to `.env` file and configure it if needed:
4. Start the server:
   ```bash
   npm run dev
   ```

## Author

**Santiago Vieira Modesti**

- **Email**: [vieirasantiagovieira@gmail.com](mailto:vieirasantiagovieira@gmail.com)
- **GitHub**: [https://github.com/santiagovm2000](https://github.com/santiagovm2000)
