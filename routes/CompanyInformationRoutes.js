// routes/CompanyInformationRoutes.js

const express = require("express");
const {
    createCompanyInformation,
    getAllCompanyInformation,
    getCompanyInformation,
    updateCompanyInformation,
    deleteCompanyInformation,
    updateCompanyInformationStatus
} = require("../controllers/CompanyInformationController");  // Note the correct import name

const companyInformation = express.Router();

// Define your routes
companyInformation.get("/company-information", getAllCompanyInformation);  // Changed to correct function name
companyInformation.post("/add-company-information", createCompanyInformation);
companyInformation.get("/company-information/:id", getCompanyInformation);
companyInformation.put("/update-company-information/:id", updateCompanyInformation);
companyInformation.delete("/delete-company-information/:id", deleteCompanyInformation);
companyInformation.put("/company-information/update-status/:id", updateCompanyInformationStatus);



module.exports = companyInformation;
