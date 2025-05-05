const FireArms = require("../models/FireArms");
const SecurityGuard = require("../models/SecurityGuard");
const SecurityCompany = require("../models/SecurityCompany");

// Get all firearms
const getFireArms = async (req, res) => {
  try {
    const firearms = await FireArms.find({})
      .populate("security_guard", "first_name last_name")
      .populate("security_company", "name");

    res.status(200).json(firearms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single firearm by ID
const getFireArm = async (req, res) => {
  try {
    const { id } = req.params;
    const firearm = await FireArms.findById(id)
      .populate("security_guard", "first_name last_name")
      .populate("security_company", "name");

    if (!firearm) {
      return res.status(404).json({ message: "Firearm not found" });
    }

    res.status(200).json(firearm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new firearm
const createFireArm = async (req, res) => {
  try {
    const { serial_number, firearm_type, issue_date, security_guard, security_company, status } = req.body;

    // Validate status
    const validStatuses = ["On Hand", "Lost", "Stolen"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status. Allowed values: On Hand, Lost, Stolen." });
    }

    // Validate security guard and company
    const guardExists = await SecurityGuard.findById(security_guard);
    if (!guardExists) {
      return res.status(400).json({ message: "Invalid security guard ID" });
    }

    const companyExists = await SecurityCompany.findById(security_company);
    if (!companyExists) {
      return res.status(400).json({ message: "Invalid security company ID" });
    }

    const firearm = await FireArms.create(req.body);
    res.status(201).json(firearm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a firearm by ID
const updateFireArm = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate status if it's being updated
    if (req.body.status) {
      const validStatuses = ["On Hand", "Lost", "Stolen"];
      if (!validStatuses.includes(req.body.status)) {
        return res.status(400).json({ message: "Invalid status. Allowed values: On Hand, Lost, Stolen." });
      }
    }

    const firearm = await FireArms.findByIdAndUpdate(id, req.body, { new: true });

    if (!firearm) {
      return res.status(404).json({ message: "Firearm not found" });
    }

    res.status(200).json(firearm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a firearm by ID
const deleteFireArm = async (req, res) => {
  try {
    const { id } = req.params;
    const firearm = await FireArms.findByIdAndDelete(id);

    if (!firearm) {
      return res.status(404).json({ message: "Firearm not found" });
    }

    res.status(200).json({ message: "Firearm deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFireArms,
  getFireArm,
  createFireArm,
  updateFireArm,
  deleteFireArm,
};
