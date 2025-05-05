// routes/SecurityGuardRoutes.js

const express = require("express");
const {
  createSecurityGuard, 
  getSecurityGuards, 
  getSecurityGuard, 
  updateSecurityGuard, 
  deleteSecurityGuard,
  updateSecurityGuardStatus,
  getGuardsByCompanyId

} = require("../controllers/SecurityGuardController");  // Note the correct import name

const guards = express.Router();

// Define your routes
guards.get("/guards", getSecurityGuards);  // Changed to correct function name
guards.post("/add-guard", createSecurityGuard);
guards.get("/guards/:id", getSecurityGuard);
guards.put("/update-guard/:id", updateSecurityGuard);
guards.delete("/delete-guard/:id", deleteSecurityGuard);
guards.put("/guards/update-status/:id", updateSecurityGuardStatus);
guards.get('/guards/company/:companyId', getGuardsByCompanyId);



module.exports = guards;
