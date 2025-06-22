const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server');
const ShopItemCategory = require('../models/ShopItemCategory');

// Sample category data for testing
const testCategory = {
  title: 'Test Category',
  description: 'This is a test category'
};

let categoryId;

// Before all tests, connect to the database
beforeAll(async () => {
  // Clear categories collection before tests
  await ShopItemCategory.deleteMany({});
});

// After all tests are done, close the server and disconnect from the database
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Category API', () => {
  // Test creating a category
  test('POST /api/categories - Create a new category', async () => {
    const response = await request(app)
      .post('/api/categories')
      .send(testCategory)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(testCategory.title);
    expect(response.body.description).toBe(testCategory.description);

    categoryId = response.body._id;
  });

  // Test getting all categories
  test('GET /api/categories - Get all categories', async () => {
    const response = await request(app)
      .get('/api/categories')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test getting a single category
  test('GET /api/categories/:id - Get a single category', async () => {
    const response = await request(app)
      .get(`/api/categories/${categoryId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', categoryId);
    expect(response.body.title).toBe(testCategory.title);
  });

  // Test updating a category
  test('PUT /api/categories/:id - Update a category', async () => {
    const updatedData = {
      title: 'Updated Category',
      description: 'This is an updated test category'
    };

    const response = await request(app)
      .put(`/api/categories/${categoryId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('_id', categoryId);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.description).toBe(updatedData.description);
  });

  // Test deleting a category
  test('DELETE /api/categories/:id - Delete a category', async () => {
    await request(app)
      .delete(`/api/categories/${categoryId}`)
      .expect(200);

    // Verify category is deleted
    const response = await request(app)
      .get(`/api/categories/${categoryId}`)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'Category not found');
  });

  // Test creating a category with invalid data
  test('POST /api/categories - Create with invalid data', async () => {
    const invalidCategory = {
      // Missing title
      description: 'This is an invalid test category'
    };

    await request(app)
      .post('/api/categories')
      .send(invalidCategory)
      .expect(400);
  });
});