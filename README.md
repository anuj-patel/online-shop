# Online Shop Backend API

A minimalistic backend web app for an online shop, built with Node.js and Express. Provides CRUD REST APIs for Customer, ShopItemCategory, ShopItem, and Order entities, with in-memory data and endpoint autotests.

## Features
- CRUD APIs for Customer, ShopItemCategory, ShopItem, and Order
- In-memory data storage (no database required)
- Initial test data on server start
- Endpoint autotests using Mocha and Supertest

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the application:**
   ```sh
   npm start
   ```
   The server will start on port 3000 by default.

3. **Run tests:**
   ```sh
   npm test
   ```

## API Endpoints

- `GET    /customers`         - List all customers
- `POST   /customers`         - Create a customer
- `GET    /customers/:id`     - Get a customer by ID
- `PUT    /customers/:id`     - Update a customer
- `DELETE /customers/:id`     - Delete a customer

- `GET    /categories`        - List all categories
- `POST   /categories`        - Create a category
- `GET    /categories/:id`    - Get a category by ID
- `PUT    /categories/:id`    - Update a category
- `DELETE /categories/:id`    - Delete a category

- `GET    /items`             - List all shop items
- `POST   /items`             - Create a shop item
- `GET    /items/:id`         - Get a shop item by ID
- `PUT    /items/:id`         - Update a shop item
- `DELETE /items/:id`         - Delete a shop item

- `GET    /orders`            - List all orders
- `POST   /orders`            - Create an order
- `GET    /orders/:id`        - Get an order by ID
- `PUT    /orders/:id`        - Update an order
- `DELETE /orders/:id`        - Delete an order

## Notes
- Data is persisted between restarts.
- For demonstration and testing purposes only.