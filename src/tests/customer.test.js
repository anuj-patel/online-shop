const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server');
const Customer = require('../models/Customer');

// Sample customer data for testing
const testCustomer = {
  name: 'Test',
  surname: 'User',
  email: 'test.user@example.com'
};

let customerId;

// Before all tests, connect to the database
beforeAll(async () => {
  // Clear customers collection before tests
  await Customer.deleteMany({});
});

// After all tests, close the server and disconnect from the database
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Customer API', () => {
  // Test creating a customer
  test('POST /api/customers - Create a new customer', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send(testCustomer)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(testCustomer.name);
    expect(response.body.surname).toBe(testCustomer.surname);
    expect(response.body.email).toBe(testCustomer.email);

    customerId = response.body._id;
  });

  // Test getting all customers
  test('GET /api/customers - Get all customers', async () => {
    const response = await request(app)
      .get('/api/customers')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test getting a single customer
  test('GET /api/customers/:id - Get a single customer', async () => {
    const response = await request(app)
      .get(`/api/customers/${customerId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', customerId);
    expect(response.body.name).toBe(testCustomer.name);
  });

  // Test updating a customer
  test('PUT /api/customers/:id - Update a customer', async () => {
    const updatedData = {
      name: 'Updated',
      surname: 'User',
      email: 'updated.user@example.com'
    };

    const response = await request(app)
      .put(`/api/customers/${customerId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('_id', customerId);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.email).toBe(updatedData.email);
  });

  // Test deleting a customer
  test('DELETE /api/customers/:id - Delete a customer', async () => {
    await request(app)
      .delete(`/api/customers/${customerId}`)
      .expect(200);

    // Verify customer is deleted
    const response = await request(app)
      .get(`/api/customers/${customerId}`)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'Customer not found');
  });

  // Test creating a customer with invalid data
  test('POST /api/customers - Create with invalid data', async () => {
    const invalidCustomer = {
      name: 'Invalid',
      // Missing surname
      email: 'invalid-email' // Invalid email format
    };

    await request(app)
      .post('/api/customers')
      .send(invalidCustomer)
      .expect(400);
  });
});