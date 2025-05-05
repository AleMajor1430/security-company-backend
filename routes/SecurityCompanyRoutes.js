const express = require("express");
const {
  createSecurityCompany,
  getSecurityCompanies,
  getSecurityCompany,
  updateSecurityCompany,
  deleteSecurityCompany,
  updateSecurityCompanyStatus
} = require("../controllers/SecurityCompanyController");

const companies = express.Router();

// Define your routes
companies.get("/companies", getSecurityCompanies);
companies.post("/add-company", createSecurityCompany);
companies.get("/companies/:id", getSecurityCompany);
companies.put("/companies/:id", updateSecurityCompany);
companies.delete("/companies/:id", deleteSecurityCompany);
companies.put("/companies/update-status/:id", updateSecurityCompanyStatus);
module.exports = companies;
