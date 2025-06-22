const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopItemCategory'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('ShopItem', shopItemSchema);