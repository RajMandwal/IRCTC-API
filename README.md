# Railway Management API

## Project Overview
A comprehensive railway management system API that allows users to register, login, check train availability, and book seats. The system supports role-based access with separate functionalities for admin and regular users.

## Features
- User Registration and Authentication
- Admin Train Management
- Train Availability Checking
- Seat Booking with Race Condition Handling
- Secure API Endpoints with JWT Authentication

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm (Node Package Manager)

## Technology Stack
- Backend: Node.js with Express.js
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT)
- Password Hashing: bcryptjs

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/railway-management-api.git
cd railway-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
1. Create a PostgreSQL database
```sql
CREATE DATABASE railway_db;
```

2. Configure database connection in `.env` file

### 4. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
DB_HOST=localhost
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=railway_db
JWT_SECRET=your_very_long_and_complex_secret_key
ADMIN_API_KEY=your_secret_admin_key_for_protected_routes
```

### 5. Run the Application
```bash
# For development with nodemon
npm run dev

# For production
npm start
```

## API Endpoints

### User Endpoints
- `POST /api/users/register`
  - Register a new user
  - Request Body: 
    ```json
    {
      "username": "johndoe",
      "password": "password123",
      "role": "user" // Optional, defaults to 'user'
    }
    ```

- `POST /api/users/login`
  - User login
  - Request Body:
    ```json
    {
      "username": "johndoe",
      "password": "password123"
    }
    ```
  - Response: JWT Token for authentication

### Train Endpoints
- `POST /api/trains` (Admin Only)
  - Add a new train
  - Requires Admin API Key
  - Request Body:
    ```json
    {
      "train_name": "Express Train",
      "source": "Mumbai",
      "destination": "Delhi",
      "total_seats": 100
    }
    ```

- `GET /api/trains/availability`
  - Check train availability
  - Query Parameters: `source`, `destination`
  - Example: `/api/trains/availability?source=Mumbai&destination=Delhi`

### Booking Endpoints
- `POST /api/bookings/book`
  - Book train seats
  - Requires Authentication Token
  - Request Body:
    ```json
    {
      "train_id": 1,
      "seats_to_book": 2
    }
    ```

- `GET /api/bookings/details`
  - Retrieve user's booking details
  - Requires Authentication Token

## Authentication
- All train and booking endpoints require a valid JWT token
- Admin routes require both JWT token and Admin API Key

## Race Condition Handling
- Seat booking uses PostgreSQL transaction with row-level locking
- Ensures only one user can book seats simultaneously
- Prevents double-booking scenarios

## Error Handling
- Comprehensive error responses for various scenarios
- Secure error messages in production environment

## Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Admin API key protection
- Role-based access control

## Possible Improvements
- Add more comprehensive input validation
- Implement refresh token mechanism
- Add logging and monitoring
- Create more advanced seat allocation strategies

## Troubleshooting
- Ensure PostgreSQL is running
- Check database connection parameters
- Verify environment variables
- Examine server logs for detailed error information

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request


```

