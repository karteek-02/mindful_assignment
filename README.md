## Installation
- git clone 
- `npm install`
- Create a `.env` file.
- `npm start` to run the project.

# API Endpoints

This application uses JWT for authentication, MongoDB for the database, React for the frontend, and Node.js with Express for the backend.

## Frontend Routes

1. **/** - Home page (Protected route, accessible only after successful authentication)
2. **/login** - Login page
3. **/signup** - Signup page

## Models

### AddedUser Model

The `AddedUser` model represents a user who has been added to the system. It has the following fields:

- `name`: The name of the user. This field is required.
- `email`: The email address of the user. This field is required and must be unique.
- `phone`: The phone number of the user. This field is required.

### User Model

The `User` model represents a user who has registered on the platform. It has the following fields:

- `name`: The name of the user. This field is required.
- `email`: The email address of the user. This field is required and must be unique.
- `password`: The password of the user. This field is required.
- `phone`: The phone number of the user. This field is required.

## Users

1. **GET /api/addedUsers** - Fetch all users.
2. **POST /api/addedUsers** - Add a new user.
3. **PUT /api/addedUsers/:id** - Update a user by ID.
4. **DELETE /api/addedUsers/:id** - Delete a user by ID.

## Authentication

1. **POST /api/login** - Login a user.
2. **GET /api/users** - Fetch all users.
3. **POST /api/register** - Register a new user.
# mindful-assignment
# mindful_assignment
