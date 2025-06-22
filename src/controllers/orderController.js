const Order = require('../models/Order');
const ShopItem = require('../models/ShopItem');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer')
      .populate({
        path: 'items.shopItem',
        populate: { path: 'categories' }
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer')
      .populate({
        path: 'items.shopItem',
        populate: { path: 'categories' }
      });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const newOrder = await order.save();

    const populatedOrder = await Order.findById(newOrder._id)
      .populate('customer')
      .populate({
        path: 'items.shopItem',
        populate: { path: 'categories' }
      });

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('customer')
    .populate({
      path: 'items.shopItem',
      populate: { path: 'categories' }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Recalculate total amount if items were updated
    if (req.body.items) {
      let total = 0;
      for (const item of order.items) {
        total += item.shopItem.price * item.quantity;
      }
      order.totalAmount = total;
      await order.save();
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};