const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const ShopItem = require('../models/ShopItem');
const ShopItemCategory = require('../models/ShopItemCategory');

// Sample data for testing
let customerId, itemId, categoryId;
let testOrder;
let orderId;

// Before all tests, connect to the database
beforeAll(async () => {
  // Clear collections before tests
  await Order.deleteMany({});
  await Customer.deleteMany({});
  await ShopItem.deleteMany({});
  await ShopItemCategory.deleteMany({});

  // Create a test category
  const category = await ShopItemCategory.create({
    title: 'Test Category for Orders',
    description: 'Category for testing orders'
  });
  categoryId = category._id;

  // Create a test item
  const item = await ShopItem.create({
    title: 'Test Item for Orders',
    description: 'Item for testing orders',
    price: 49.99,
    categories: [categoryId]
  });
  itemId = item._id;

  // Create a test customer
  const customer = await Customer.create({
    name: 'Test',
    surname: 'Customer',
    email: 'test.customer@example.com'
  });
  customerId = customer._id;

  // Prepare test order data
  testOrder = {
    customer: customerId,
    items: [
      {
        shopItem: itemId,
        quantity: 2
      }
    ]
  };
});

// After all tests are done, close the server and disconnect from the database
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Order API', () => {
  // Test creating an order
  test('POST /api/orders - Create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send(testOrder)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.customer).toHaveProperty('_id', customerId.toString());
    expect(response.body.items[0].shopItem).toHaveProperty('_id', itemId.toString());
    expect(response.body.items[0].quantity).toBe(2);
    expect(response.body).toHaveProperty('totalAmount');
    expect(response.body.status).toBe('pending');

    orderId = response.body._id;
  });

  // Test getting all orders
  test('GET /api/orders - Get all orders', async () => {
    const response = await request(app)
      .get('/api/orders')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test getting a single order
  test('GET /api/orders/:id - Get a single order', async () => {
    const response = await request(app)
      .get(`/api/orders/${orderId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', orderId);
    expect(response.body.customer).toHaveProperty('_id', customerId.toString());
    expect(response.body.items[0].shopItem).toHaveProperty('_id', itemId.toString());
  });

  // Test updating an order
  test('PUT /api/orders/:id - Update an order', async () => {
    const updatedData = {
      status: 'processing',
      items: [
        {
          shopItem: itemId,
          quantity: 3
        }
      ]
    };

    const response = await request(app)
      .put(`/api/orders/${orderId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('_id', orderId);
    expect(response.body.status).toBe(updatedData.status);
    expect(response.body.items[0].quantity).toBe(3);
  });

  // Test deleting an order
  test('DELETE /api/orders/:id - Delete an order', async () => {
    await request(app)
      .delete(`/api/orders/${orderId}`)
      .expect(200);

    // Verify order is deleted
    const response = await request(app)
      .get(`/api/orders/${orderId}`)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'Order not found');
  });

  // Test creating an order with invalid data
  test('POST /api/orders - Create with invalid data', async () => {
    const invalidOrder = {
      // Missing customer
      items: [
        {
          // Missing shopItem
          quantity: 1
        }
      ]
    };

    await request(app)
      .post('/api/orders')
      .send(invalidOrder)
      .expect(400);
  });
});