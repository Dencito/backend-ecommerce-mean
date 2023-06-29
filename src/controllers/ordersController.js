const Order = require("../models/Order");

const ordersGet = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(201).json({ message: "Successful search", data: orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to search order" });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const crearOrder = await Order.create(order);
    res
      .status(201)
      .json({ message: "Order created successfully", data: crearOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to create a order" });
  }
};

module.exports = {
  ordersGet,
  createOrder,
};
