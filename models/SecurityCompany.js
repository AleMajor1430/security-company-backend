const mongoose = require("mongoose");

const securityCompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  district: { type: String, required: true },
  village: { type: String, required: true },
  street: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Approved", "Pending", "Declined"],
    default: "Pending"
  },
  registration_date: { type: Date },
  renewal_date: { type: Date },
  termination_date: { type: Date },
  restoration_date: { type: Date },
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

module.exports = mongoose.model("SecurityCompany", securityCompanySchema);
