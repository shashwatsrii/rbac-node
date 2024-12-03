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
git clone https://github.com/your-username/role-based-access-control.git
cd role-based-access-control
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
MONGODB_URI=mongodb://localhost:27017/vrv_security_rbac
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
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "roleName": "User
}
```
- Response: User object with a JWT token.

#### 2. Login a user.
- POST /api/auth/login
- Request Body :
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Response: User object with a JWT token.

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
#### 1. Get All Users (Admin only)
- GET /api/users
- Headers :
```bash
Authorization: Bearer <admin_jwt_token>
```
- Response: List of all users.

## Notes:
- Update the GitHub repository URL and any specific details (like JWT_SECRET key) for your deployment setup.
- This README provides a comprehensive guide for setting up, testing, and deploying the application.