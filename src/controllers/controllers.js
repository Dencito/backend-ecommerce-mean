const { register, login, getUsers, getUserId } = require("./authControllers");
const { ordersGet, createOrder } = require("./ordersController");

const {
  createProduct,
  getProducts,
  getProductId,
  deleteProductId,
  editProductId,
} = require("./porductsControllers");

const products = {
  createProduct,
  getProducts,
  getProductId,
  deleteProductId,
  editProductId,
};

const auth = {
  login,
  getUsers,
  getUserId,
  register,
};

const orders = {
  ordersGet,
  createOrder,
};

module.exports = {
  auth,
  orders,
  products,
};
