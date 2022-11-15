const asyncHandler = require("express-async-handler");
const Items = require("../models/itemModel");

// Create Item
const createItem= asyncHandler( async (req, res) => {
  const { sku, name, category, quantity, description, expiry } = req.body;

  //   Validation
  if (!sku || !name || !category || !quantity ||  !expiry) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Item
  const item = await Items.create({
    sku,
    name,
    category,
    quantity,
    description,
    expiry,
  });
  res.status(201).json(item);
});

// Get all Items
const getItems = asyncHandler(async (req, res) => {
  const items = await Items.find({ }).sort("-createdAt");
  res.status(200).json(items);
});

// Get single Items
const getItem = asyncHandler(async (req, res) => {
  const item = await Items.findById(req.params.id);
  // if Items doesnt exist
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  res.status(200).json(item);
});

// Delete Item
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Items.findById(req.params.id);
  // if item doesnt exist
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  await item.remove();
  res.status(200).json({ message: "Item deleted." });
});


// Update Product
const updateItem = asyncHandler(async (req, res) => {
  const {  sku, name, category, quantity, description, expiry } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      sku,
      name,
      category,
      quantity,
      description,
      expiry,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createItem,
  getItems,
  getItem,
  deleteItem,
  updateItem,
};