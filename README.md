# VRV Security RBAC System

## Overview

The VRV Security RBAC (Role-Based Access Control) system is designed to manage users, roles, and permissions. It enables the management of authentication and authorization based on user roles like **User**, **Moderator**, and **Admin**.

This project is built using **Node.js**, **Express**, **MongoDB**, and **JWT** for secure user authentication.

## Features

- User registration and login
- Role-based access control (User, Moderator, Admin)
- API endpoints to manage user profiles and access to different resources

## Project Setup

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (or MongoDB Atlas for cloud hosting)

### Step 1: Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/shashwatsrii/rbac-node
cd rbac-node
```
### Step 2: Install Dependencies

Run the following command to install all the required dependencies:
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a .env file in the root of the project with the following variables:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_very_long_secret_key
JWT_EXPIRES_IN=30d
```
- PORT: The port the app will run on (you can change this if needed).
- MONGODB_URI: MongoDB connection URI (use MongoDB Atlas URI for cloud storage).
- JWT_SECRET: Secret key used to sign JWT tokens (keep it secure).
- JWT_EXPIRES_IN: JWT token expiration time (e.g., 30d).

### Step 4: Start the application
Run the application locally with the following command:

```bash
npm start
```

## API Endpoints
Here are the key API routes and how to test them:



### Authentication Routes
#### 1. Register a new user.
- POST /api/auth/register
- Request Body :
- for User 
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "roleName": "User"
}
```
- Response: User object with a JWT token.

- for Moderator
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "roleName": "Moderator"
}
```
- Response: Moderator object with a JWT token.

- for Admin 
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "roleName": "Admin"
}
```
- Response: Admin object with a JWT token.

#### 2. Login a user/moderator/admin.
- POST /api/auth/login
- Request Body :
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Response: User/Admin/Moderator object with a JWT token.

#### 3. Logout. (Requires JWT Token)
- POST /api/auth/logout
- Headers :
```bash
Authorization : Bearer <jwt_token>
```
- Response: Logout success message.

### User Routes
#### 1. Get User Profile
- GET /api/users/profile
- Headers :
```bash
Authorization: Bearer <jwt_token>
```
- Response: User profile data.

#### 2. Update User Profile
- PUT /api/users/profile
- Headers :
```bash
Authorization: Bearer <jwt_token>
```
-Request Body :
```json
{
  "username": "john_updated",
  "email": "john_updated@example.com"
}
```
- Response: Updated User profile data.

### Admin Routes
#### 1. Get All Users 
- GET /api/users
- Headers :
```bash
Authorization: Bearer <admin_jwt_token>
```
- Response: List of all users.

#### 2. Activate/Deactivate a User
- PATCH /api/users/:id/status
- Headers :
```bash
Authorization: Bearer <admin_jwt_token>
```
-Request Body :
```json
{
  "isActive": false
}
```
- Response: 200 OK: User Status Updated.
```json
{
  "message": "User deactivated successfully",
  "user": {
    "_id": "64d9f9e2c9a9f60013f5f567",
    "username": "john_doe",
    "email": "john@example.com",
    "isActive": false
  }
}
```
- Response: 404 Not Found
```json
{
  "message": "User not found"
}
```

#### 2. Role Management
##### Add a new Role
- POST /api/roles
- Headers :
```bash
Authorization: Bearer <admin_jwt_token>
```
-Request Body :
```json
{
  "name": "SuperAdmin",
  "permissions": ["manage:all"]
}
```
- Response: 201 OK: Role Added Successfully.
```json
{
  "message": "Role created successfully",
  "role": {
    "_id": "64d9fa17c9a9f60013f5f568",
    "name": "SuperAdmin",
    "permissions": ["manage:all"]
  }
}
```
- Response: 404 Not Found
```json
{
  "message": "Role already exists"
}
```
##### Update an Existing Role
- PUT /api/roles/:id
- Headers :
```bash
Authorization: Bearer <admin_jwt_token>
```
- Request Body :
```json
{
  "name": "Admin",
  "permissions": ["manage:users", "manage:roles", "full:access"]
}
```
- Response: 201 OK: Role updated Successfully.
```json
{
  "message": "Role updated successfully",
  "role": {
    "_id": "64d9fa17c9a9f60013f5f568",
    "name": "Admin",
    "permissions": ["manage:users", "manage:roles", "full:access"]
  }
}
```
- Response: 404 Not Found
```json
{
  "message": "Role Not Found"
}
```

### Moderator Routes
#### 1. View All Users 
- GET /api/users
- Headers :
```bash
Authorization: Bearer <moderator_jwt_token>
```
- Response: List of all users.

#### 2. Update User Profile (Self)
- PUT /api/users/profile
- Headers :
```bash
Authorization: Bearer <moderator_jwt_token>
```
- Request Body :
```json
{
  "username": "moderator_updated",
  "email": "moderator_updated@example.com"
}
```
- Response: 
```
{
  "_id": "moderatorId",
  "username": "moderator_updated",
  "email": "moderator_updated@example.com"
}
```

#### 3. Restricted Admin Routes
##### Attempt to add a Role.
- POST /api/roles
- Headers :
```bash
Authorization: Bearer <moderator_jwt_token>
```
- Request Body :
```json
{
  "name": "SuperAdmin",
  "permissions": ["manage:all"]
}
```
- Response: 
```
{
  "message": "Access denied. Insufficient permissions."
}
```

##### Attempt to Activate/Deactivate a User.
- PATCH /api/users/:id/status
- Headers :
```bash
Authorization: Bearer <moderator_jwt_token>
```
- Request Body :
```json
{
  "isActive": false
}
```
- Response: 
```
{
  "message": "Access denied. Insufficient permissions."
}
```

## API Endpoints Summary

Below is a summarized table of all the endpoints in the project, including permissions, endpoints, HTTP methods, access levels, and functionality.

---

| **Functionality**               | **Method** | **Endpoint**                   | **Access**            | **Permissions**                 |
|----------------------------------|------------|---------------------------------|------------------------|----------------------------------|
| **Authentication**              |            |                                 |                        |                                  |
| Register a new user              | `POST`     | `/api/auth/register`           | Public                 | None                             |
| Log in a user                    | `POST`     | `/api/auth/login`              | Public                 | None                             |
| Log out a user                   | `POST`     | `/api/auth/logout`             | Requires JWT           | Authenticated Users              |
| **User Management**              |            |                                 |                        |                                  |
| Fetch user profile               | `GET`      | `/api/users/profile`           | Authenticated Users    | `read:profile`                  |
| Update user profile              | `PUT`      | `/api/users/profile`           | Authenticated Users    | `update:profile`                |
| Fetch all users                  | `GET`      | `/api/users`                   | Admin, Moderator       | `manage:users`                  |
| Activate/Deactivate a user       | `PATCH`    | `/api/users/:id/status`        | Admin                  | `manage:users`                  |
| **Role Management**              |            |                                 |                        |                                  |
| Add a new role                   | `POST`     | `/api/roles`                   | Admin                  | `manage:roles`                  |
| Update an existing role          | `PUT`      | `/api/roles/:id`               | Admin                  | `manage:roles`                  |

---

## **Details**

### **1. Authentication Endpoints**
- **Register**: Open for all users to create an account.
- **Login/Logout**: Users log in to receive JWT tokens and log out to invalidate their sessions.

### **2. User Management Endpoints**
- **Profile**: Authenticated users can fetch and update their own profiles.
- **Fetch All Users**: Moderators and Admins can fetch a list of all users.
- **Activate/Deactivate Users**: Admins can enable or disable accounts as required.

### **3. Role Management Endpoints**
- **Add Role**: Admins can create new roles with specific permissions.
- **Update Role**: Admins can update existing roles (e.g., adding or modifying permissions).

---

## **How to Use This Table**
1. **Test Access**: Use tokens associated with different roles (Admin, Moderator, User) to test access to each endpoint.
2. **Permissions Validation**: Ensure unauthorized users receive a `403 Forbidden` response when attempting to access restricted endpoints.

---

## Notes:
- Update the GitHub repository URL and any specific details (like JWT_SECRET key) for your deployment setup.
- This README provides a comprehensive guide for setting up, testing, and deploying the application.