const { register, login, getUsers, getUserId, updateUser } = require("./authControllers");
const { ordersGet, createOrder,createPreference } = require("./ordersController");

const {
  createProduct,
  getProducts,
  getProductId,
  deleteProductId,
  editProductId,
} = require("./productsControllers");

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
  updateUser
};

const orders = {
  ordersGet,
  createOrder,
  createPreference
};

module.exports = {
  auth,
  orders,
  products,
};
