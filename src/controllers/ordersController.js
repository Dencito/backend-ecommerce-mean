const Order = require("../models/Order");
const Product = require("../models/Product");
const mercadopago = require("mercadopago");

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

const createPreference = async (req, res) => {
  try {
    const productosParam = req.body;
    const productos = [];

    for (const product of productosParam) {
 
      product1 = await Product.findById(product.Id)
      productos.push({
        name: product1.name,
        price: product1.price,
        quantity: product.quantity
      });
    }


    const items = productos.map(product => ({
      title: product.name,
      unit_price: product.price,
      quantity: product.quantity
    }));

    mercadopago.configure({
      access_token: "TEST-2940322516143040-062918-52c5bed9544732259c21e072ceb956cb-1103088389",
    });

    const preference = {
      items, "back_urls": {
        "success": "http://127.0.0.1:5500/index.html",
        "failure": "http://127.0.0.1:5500/index.html",
        "pending": "http://127.0.0.1:5500/index.html"
    },
    "auto_return": "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ IdPreference: response.body.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  ordersGet,
  createOrder,
  createPreference
};
