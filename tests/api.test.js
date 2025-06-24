const request = require('supertest');
const app = require('../src/index');
const { expect } = require('chai');

describe('Customer API', function() {
  let createdId;
  it('GET /customers returns array', async () => {
    const res = await request(app).get('/customers');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
  it('POST /customers creates customer', async () => {
    const res = await request(app).post('/customers').send({ name: 'Test', surname: 'User', email: 'test@user.com' });
    expect(res.status).to.equal(201);
    expect(res.body).to.include({ name: 'Test', surname: 'User', email: 'test@user.com' });
    createdId = res.body.id;
  });
  it('GET /customers/:id returns customer', async () => {
    const res = await request(app).get(`/customers/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(createdId);
  });
  it('PUT /customers/:id updates customer', async () => {
    const res = await request(app).put(`/customers/${createdId}`).send({ name: 'Updated' });
    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal('Updated');
  });
  it('DELETE /customers/:id deletes customer', async () => {
    const res = await request(app).delete(`/customers/${createdId}`);
    expect(res.status).to.equal(204);
  });
});

describe('ShopItemCategory API', function() {
  let createdId;
  it('GET /categories returns array', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
  it('POST /categories creates category', async () => {
    const res = await request(app).post('/categories').send({ title: 'TestCat', description: 'desc' });
    expect(res.status).to.equal(201);
    expect(res.body).to.include({ title: 'TestCat', description: 'desc' });
    createdId = res.body.id;
  });
  it('GET /categories/:id returns category', async () => {
    const res = await request(app).get(`/categories/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(createdId);
  });
  it('PUT /categories/:id updates category', async () => {
    const res = await request(app).put(`/categories/${createdId}`).send({ title: 'UpdatedCat' });
    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('UpdatedCat');
  });
  it('DELETE /categories/:id deletes category', async () => {
    const res = await request(app).delete(`/categories/${createdId}`);
    expect(res.status).to.equal(204);
  });
});

describe('ShopItem API', function() {
  let createdId;
  it('GET /items returns array', async () => {
    const res = await request(app).get('/items');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
  it('POST /items creates item', async () => {
    const res = await request(app).post('/items').send({ title: 'TestItem', description: 'desc', price: 10.5, category: [1] });
    expect(res.status).to.equal(201);
    expect(res.body).to.include({ title: 'TestItem', description: 'desc', price: 10.5 });
    createdId = res.body.id;
  });
  it('GET /items/:id returns item', async () => {
    const res = await request(app).get(`/items/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(createdId);
  });
  it('PUT /items/:id updates item', async () => {
    const res = await request(app).put(`/items/${createdId}`).send({ title: 'UpdatedItem' });
    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('UpdatedItem');
  });
  it('DELETE /items/:id deletes item', async () => {
    const res = await request(app).delete(`/items/${createdId}`);
    expect(res.status).to.equal(204);
  });
});

describe('Order API', function() {
  let createdId;
  it('GET /orders returns array', async () => {
    const res = await request(app).get('/orders');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
  it('POST /orders creates order', async () => {
    const res = await request(app).post('/orders').send({ customer: 1, items: [1] });
    expect(res.status).to.equal(201);
    expect(res.body).to.include({ customer: 1 });
    createdId = res.body.id;
  });
  it('GET /orders/:id returns order', async () => {
    const res = await request(app).get(`/orders/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(createdId);
  });
  it('PUT /orders/:id updates order', async () => {
    const res = await request(app).put(`/orders/${createdId}`).send({ customer: 2 });
    expect(res.status).to.equal(200);
    expect(res.body.customer).to.equal(2);
  });
  it('DELETE /orders/:id deletes order', async () => {
    const res = await request(app).delete(`/orders/${createdId}`);
    expect(res.status).to.equal(204);
  });
});
