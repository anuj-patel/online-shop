const ShopItem = require('../models/ShopItem');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await ShopItem.find().populate('categories');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single item
exports.getItemById = async (req, res) => {
  try {
    const item = await ShopItem.findById(req.params.id).populate('categories');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const item = new ShopItem(req.body);
    const newItem = await item.save();
    const populatedItem = await ShopItem.findById(newItem._id).populate('categories');
    res.status(201).json(populatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const item = await ShopItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('categories');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const item = await ShopItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};