const express = require("express");
const { orders } = require("../controllers/controllers");

const router = express.Router();

router.get("/", orders.ordersGet);
router.post("/", orders.createOrder);
router.post("/createPreference",orders.createPreference)

module.exports = router;