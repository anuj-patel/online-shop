# Online Shop Backend API

A minimalistic backend web application for an online shop with CRUD operations for customers, categories, items, and orders.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Jest and Supertest for testing

## Data Entities

- **Customer**: ID, Name, Surname, Email
- **ShopItemCategory**: ID, Title, Description
- **ShopItem**: ID, Title, Description, Price, Categories
- **OrderItem**: ID, ShopItem, Quantity
- **Order**: ID, Customer, Items (list of OrderItems), Total Amount, Status

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
   git clone <repository-url>
   cd online-shop
```

2. Install dependencies:
```bash
   npm install
```
3. Environment Configuration:
- Create a .env file in the root directory with the following variables:
```bash
   MONGODB_URI=<your-mongodb-uri>
   PORT=<your-port>
```
4. Running the Application
   1. Start the server:
   ```bash
      npm start
   ```
   2. For development with auto-restart:
   ```bash
      npm run dev
   ```
   3. The API will be available at:
   ```bash
      http://localhost:<your-port>/api
   ```
   5.Database Seeding:
   ```bash
   npm run seed
   ```
This will create sample customers, categories, items, and orders.

API Endpoints

Customers
- GET /api/customers - Get all customers
- GET /api/customers/:id - Get customer by ID
- POST /api/customers - Create a new customer
- PUT /api/customers/:id - Update a customer
- DELETE /api/customers/:id - Delete a customer

Categories
- GET /api/categories - Get all categories
- GET /api/categories/:id - Get category by ID
- POST /api/categories - Create a new category
- PUT /api/categories/:id - Update a category
- DELETE /api/categories/:id - Delete a category

Items
- GET /api/items - Get all items
- GET /api/items/:id - Get item by ID
- POST /api/items - Create a new item
- PUT /api/items/:id - Update an item
- DELETE /api/items/:id - Delete an item

Orders
- GET /api/orders - Get all orders
- GET /api/orders/:id - Get order by ID
- POST /api/orders - Create a new order
- PUT /api/orders/:id - Update an order
- DELETE /api/orders/:id - Delete an order

Testing

Run the test suite:
```bash
   npm test
