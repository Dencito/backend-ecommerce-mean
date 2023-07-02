const express = require("express");
const { auth } = require("../controllers/controllers");

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/user", auth.getUsers);
router.get("/user/:id", auth.getUserId);
router.put("/user/:id", auth.updateUser);

module.exports = router;
