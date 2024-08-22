const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/journal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

// Create a model
const Item = mongoose.model("Item", itemSchema);

// Create a new item (CREATE)
app.post("api/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.send(newItem);
});

// Get all items (READ)
app.get("api/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

// Update an item (UPDATE)
app.put("api/items/:id", async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(updatedItem);
});

// Delete an item (DELETE)
app.delete("api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: "Item deleted" });
});

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
