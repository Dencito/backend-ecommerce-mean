const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user",error:error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userUpdate = await User.findByIdAndUpdate(userId, req.body);
    const userFind = await User.findById(userUpdate._id)
    res.status(201).json({ message: "User updated successfully", data: userFind });
  } catch (error) {
    res.status(500).json({ message: "Failed to updated user",error:error.message });
  }
};


const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const userSucces = await User.findOne({ username });
    
      res.json({
        message: "Login successful",
        data: { _id: userSucces._id, username: userSucces.username,role:userSucces.role, desc: user.desc },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  }

  const getUsers = async (req, res) => {
    const tokenValid = req.query.token
    try {
      if(tokenValid == "123") {
        const users = await User.find();
        res.json({
          message: "users found",
          data: users
        });
      } else {
        res.status(500).json({ message: "Invalid Token" });
      }
      
    } catch (error) {
      res.status(500).json({ message: "Users not found" });
    }
  }

  const getUserId = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.json({
        message: "user found",
        data: { _id: user._id, username: user.username, role: user.role, orders: user.orders, desc: user.desc },
      });
    } catch (error) {
      res.status(500).json({ message: "User not found" });
    }
  }

module.exports = {
  register,
  login,
  getUsers,
  getUserId,
  updateUser
};
