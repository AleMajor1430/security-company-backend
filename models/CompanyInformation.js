const mongoose = require("mongoose");

const CompanyInformationSchema = new mongoose.Schema({
    security_company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SecurityCompany',
        required: [true, "Security company is required"]
    },
    traders_license: {
        type: String,
        required: true
    },
    insurance: {
        type: String,
        required: true
    },
    company_profile: {
        type: String,
        required: true
    },
    tax_clearance: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }


})

module.exports = mongoose.model("CompanyInformation", CompanyInformationSchema)