const mongoose = require("mongoose");

const FireArmsSchema = new mongoose.Schema({
  serial_number: { type: String, required: true },
  firearm_type: { type: String, required: true },
  issue_date: { type: String, required: true },
  security_guard: { type: mongoose.Schema.Types.ObjectId, ref: "SecurityGuard", required: true },
  security_company: { type: mongoose.Schema.Types.ObjectId, ref: "SecurityCompany", required: true },
  status: {
    type: String,
    required: true,
    enum: ["On Hand", "Lost", "Stolen"], 
    default: "On Hand",
  },
});

module.exports = mongoose.model("FireArms", FireArmsSchema);
