const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  // fallback to initial data if file missing
  return {
    customers: [
      { id: 1, name: 'Alice', surname: 'Smith', email: 'alice@example.com' },
      { id: 2, name: 'Bob', surname: 'Brown', email: 'bob@example.com' }
    ],
    categories: [
      { id: 1, title: 'Electronics', description: 'Electronic items' },
      { id: 2, title: 'Books', description: 'Books and magazines' }
    ],
    shopItems: [
      { id: 1, title: 'Laptop', description: 'A fast laptop', price: 999.99, category: [1] },
      { id: 2, title: 'Novel', description: 'A mystery novel', price: 19.99, category: [2] }
    ],
    orderItems: [
      { id: 1, shopItem: 1, quantity: 1 },
      { id: 2, shopItem: 2, quantity: 2 }
    ],
    orders: [
      { id: 1, customer: 1, items: [1, 2] }
    ]
  };
}
function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ customers, categories, shopItems, orderItems, orders }, null, 2));
}

let { customers, categories, shopItems, orderItems, orders } = loadData();

// Helper functions
const getNextId = (arr) => arr.length ? Math.max(...arr.map(e => e.id)) + 1 : 1;

// CRUD for Customer
app.get('/customers', (req, res) => res.json(customers));
app.get('/customers/:id', (req, res) => {
  const c = customers.find(x => x.id == req.params.id);
  c ? res.json(c) : res.status(404).send();
});
app.post('/customers', (req, res) => {
  const c = { id: getNextId(customers), ...req.body };
  customers.push(c);
  saveData();
  res.status(201).json(c);
});
app.put('/customers/:id', (req, res) => {
  const idx = customers.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  customers[idx] = { ...customers[idx], ...req.body };
  saveData();
  res.json(customers[idx]);
});
app.delete('/customers/:id', (req, res) => {
  const idx = customers.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  customers.splice(idx, 1);
  saveData();
  res.status(204).send();
});

// CRUD for ShopItemCategory
app.get('/categories', (req, res) => res.json(categories));
app.get('/categories/:id', (req, res) => {
  const c = categories.find(x => x.id == req.params.id);
  c ? res.json(c) : res.status(404).send();
});
app.post('/categories', (req, res) => {
  const c = { id: getNextId(categories), ...req.body };
  categories.push(c);
  saveData();
  res.status(201).json(c);
});
app.put('/categories/:id', (req, res) => {
  const idx = categories.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  categories[idx] = { ...categories[idx], ...req.body };
  saveData();
  res.json(categories[idx]);
});
app.delete('/categories/:id', (req, res) => {
  const idx = categories.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  categories.splice(idx, 1);
  saveData();
  res.status(204).send();
});

// CRUD for ShopItem
app.get('/items', (req, res) => res.json(shopItems));
app.get('/items/:id', (req, res) => {
  const i = shopItems.find(x => x.id == req.params.id);
  i ? res.json(i) : res.status(404).send();
});
app.post('/items', (req, res) => {
  const i = { id: getNextId(shopItems), ...req.body };
  shopItems.push(i);
  saveData();
  res.status(201).json(i);
});
app.put('/items/:id', (req, res) => {
  const idx = shopItems.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  shopItems[idx] = { ...shopItems[idx], ...req.body };
  saveData();
  res.json(shopItems[idx]);
});
app.delete('/items/:id', (req, res) => {
  const idx = shopItems.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  shopItems.splice(idx, 1);
  saveData();
  res.status(204).send();
});

// CRUD for Order
app.get('/orders', (req, res) => res.json(orders));
app.get('/orders/:id', (req, res) => {
  const o = orders.find(x => x.id == req.params.id);
  o ? res.json(o) : res.status(404).send();
});
app.post('/orders', (req, res) => {
  const o = { id: getNextId(orders), ...req.body };
  orders.push(o);
  saveData();
  res.status(201).json(o);
});
app.put('/orders/:id', (req, res) => {
  const idx = orders.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  orders[idx] = { ...orders[idx], ...req.body };
  saveData();
  res.json(orders[idx]);
});
app.delete('/orders/:id', (req, res) => {
  const idx = orders.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).send();
  orders.splice(idx, 1);
  saveData();
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
