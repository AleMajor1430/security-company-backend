const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersCount
} = require("../controllers/UsersController");

const users = express.Router();

// Define your routes
users.get("/users", getUsers);
users.post("/add-user", createUser);
users.get("/users/:id", getUser);
users.put("/users/:id", updateUser);
users.delete("/users/:id", deleteUser);
users.get("/users/")

module.exports = users;
