const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  shopItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopItem',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Calculate total amount before saving
orderSchema.pre('save', async function(next) {
  let total = 0;
  const populatedOrder = await this.populate('items.shopItem');

  for (const item of populatedOrder.items) {
    total += item.shopItem.price * item.quantity;
  }

  this.totalAmount = total;
  next();
});

module.exports = mongoose.model('Order', orderSchema);