const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server');
const ShopItem = require('../models/ShopItem');
const ShopItemCategory = require('../models/ShopItemCategory');

// Sample data for testing
let categoryId;
const testItem = {
  title: 'Test Item',
  description: 'This is a test item',
  price: 29.99,
  categories: [] // Will be populated after creating a test category
};

let itemId;

// Before all tests, connect to the database
beforeAll(async () => {
  // Clear collections before tests
  await ShopItem.deleteMany({});
  await ShopItemCategory.deleteMany({});

  // Create a test category
  const category = await ShopItemCategory.create({
    title: 'Test Category for Items',
    description: 'Category for testing items'
  });

  categoryId = category._id;
  testItem.categories = [categoryId];
});

// After all tests are done, close the server and disconnect from the database
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Shop Item API', () => {
  // Test creating an item
  test('POST /api/items - Create a new item', async () => {
    const response = await request(app)
      .post('/api/items')
      .send(testItem)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(testItem.title);
    expect(response.body.price).toBe(testItem.price);
    expect(response.body.categories[0]).toHaveProperty('_id', categoryId.toString());

    itemId = response.body._id;
  });

  // Test getting all items
  test('GET /api/items - Get all items', async () => {
    const response = await request(app)
      .get('/api/items')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test getting a single item
  test('GET /api/items/:id - Get a single item', async () => {
    const response = await request(app)
      .get(`/api/items/${itemId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', itemId);
    expect(response.body.title).toBe(testItem.title);
    expect(response.body.categories[0]).toHaveProperty('_id', categoryId.toString());
  });

  // Test updating an item
  test('PUT /api/items/:id - Update an item', async () => {
    const updatedData = {
      title: 'Updated Item',
      description: 'This is an updated test item',
      price: 39.99
    };

    const response = await request(app)
      .put(`/api/items/${itemId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('_id', itemId);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.price).toBe(updatedData.price);
  });

  // Test deleting an item
  test('DELETE /api/items/:id - Delete an item', async () => {
    await request(app)
      .delete(`/api/items/${itemId}`)
      .expect(200);

    // Verify item is deleted
    const response = await request(app)
      .get(`/api/items/${itemId}`)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'Item not found');
  });

  // Test creating an item with invalid data
  test('POST /api/items - Create with invalid data', async () => {
    const invalidItem = {
      // Missing title
      description: 'This is an invalid test item',
      // Missing price
      categories: [categoryId]
    };

    await request(app)
      .post('/api/items')
      .send(invalidItem)
      .expect(400);
  });
});