const mongoose = require('mongoose');
require('dotenv').config();
const Customer = require('../models/Customer');
const ShopItemCategory = require('../models/ShopItemCategory');
const ShopItem = require('../models/ShopItem');
const Order = require('../models/Order');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB for seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Customer.deleteMany({});
    await ShopItemCategory.deleteMany({});
    await ShopItem.deleteMany({});
    await Order.deleteMany({});

    console.log('Previous data cleared');

    // Create categories
    const categories = await ShopItemCategory.insertMany([
      { title: 'Electronics', description: 'Electronic devices and gadgets' },
      { title: 'Clothing', description: 'Apparel and fashion items' },
      { title: 'Books', description: 'Books and literature' },
      { title: 'Home & Kitchen', description: 'Home appliances and kitchenware' }
    ]);

    console.log('Categories seeded');

    // Create shop items
    const items = await ShopItem.insertMany([
      {
        title: 'Smartphone',
        description: 'Latest model smartphone with advanced features',
        price: 699.99,
        categories: [categories[0]._id]
      },
      {
        title: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        price: 1299.99,
        categories: [categories[0]._id]
      },
      {
        title: 'T-shirt',
        description: 'Comfortable cotton t-shirt',
        price: 19.99,
        categories: [categories[1]._id]
      },
      {
        title: 'Jeans',
        description: 'Classic blue jeans',
        price: 49.99,
        categories: [categories[1]._id]
      },
      {
        title: 'Novel',
        description: 'Bestselling fiction novel',
        price: 14.99,
        categories: [categories[2]._id]
      },
      {
        title: 'Cookbook',
        description: 'Collection of gourmet recipes',
        price: 24.99,
        categories: [categories[2]._id, categories[3]._id]
      },
      {
        title: 'Blender',
        description: 'High-speed blender for smoothies and more',
        price: 89.99,
        categories: [categories[3]._id]
      }
    ]);

    console.log('Shop items seeded');

    // Create customers
    const customers = await Customer.insertMany([
      {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com'
      },
      {
        name: 'Jane',
        surname: 'Smith',
        email: 'jane.smith@example.com'
      },
      {
        name: 'Michael',
        surname: 'Johnson',
        email: 'michael.johnson@example.com'
      }
    ]);

    console.log('Customers seeded');

    // Create orders
    await Order.insertMany([
      {
        customer: customers[0]._id,
        items: [
          { shopItem: items[0]._id, quantity: 1 },
          { shopItem: items[2]._id, quantity: 2 }
        ],
        status: 'processing'
      },
      {
        customer: customers[1]._id,
        items: [
          { shopItem: items[1]._id, quantity: 1 },
          { shopItem: items[4]._id, quantity: 3 }
        ],
        status: 'shipped'
      },
      {
        customer: customers[2]._id,
        items: [
          { shopItem: items[3]._id, quantity: 1 },
          { shopItem: items[5]._id, quantity: 1 },
          { shopItem: items[6]._id, quantity: 1 }
        ],
        status: 'pending'
      }
    ]);

    console.log('Orders seeded');
    console.log('Database seeded successfully!');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();