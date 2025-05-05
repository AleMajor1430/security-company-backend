const express = require("express");
const {
  getFireArms,
  getFireArm,
  createFireArm,
  updateFireArm,
  deleteFireArm,
} = require("../controllers/FireArmsController");

const firearms = express.Router();

// Define your routes
firearms.get("/firearms", getFireArms); 
firearms.post("/add-firearm", createFireArm); 
firearms.get("/firearms/:id", getFireArm);
firearms.put("/update-firearms/:id", updateFireArm); 
firearms.delete("/firearms/:id", deleteFireArm);

module.exports = firearms;
