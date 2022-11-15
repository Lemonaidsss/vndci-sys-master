const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, "Please add a SKU"],
    },
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    quantity: {
      type: String,
      required: [true, "Please add a quantity"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
      },
    expiry: {
        type: String,
        required: [true, "Please add a expiry"],
      },
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.model("Items", itemSchema);
module.exports = Items;