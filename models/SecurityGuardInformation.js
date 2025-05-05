const mongoose = require("mongoose");

const SecurityGuardInformationSchema = new mongoose.Schema({
    security_guard: { 
        type: mongoose.Schema.Types.ObjectId, ref: 
        "SecurityGuard", 
        required: true 
    },
    police_clearance: {
        type: String,
        required: true
    },
    education_certificate: {
        type: String,
        required: true
    },
    national_id: {
        type: string,
        required: true
    },
    verified:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("SecurityGuardInformation", SecurityGuardInformationSchema);