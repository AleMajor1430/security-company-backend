const SecurityCompany = require("../models/SecurityCompany");

const getSecurityCompanies = async (req, res) => {
  try {
    const securityCompanies = await SecurityCompany.find({});
    res.status(200).json(securityCompanies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSecurityCompany = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const securityCompany = await SecurityCompany.findById(id);
    
    if (!securityCompany) {
      return res.status(404).json({ message: "Security company not found" });
    }

    res.status(200).json(securityCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSecurityCompany = async (req, res) => {
  try {
    const { name, district, village, street, phone_number, email, registration_date, renewal_date, termination_date, restoration_date, added_by } = req.body;

    // Check if all required fields are present
    if (!name || !district || !village || !street || !phone_number || !email || !registration_date || !renewal_date || !termination_date || !restoration_date, added_by) {
      return res.status(400).json({
        message: "All fields (name, district, village, street, phone_number, email) are required."
      });
    }

    const securityCompany = await SecurityCompany.create(req.body);
    res.status(200).json(securityCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateSecurityCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const securityCompany = await SecurityCompany.findByIdAndUpdate(id, req.body);

    if (!securityCompany) {
      return res.status(404).json({ message: "Security company not found" });
    }

    const updatedSecurityCompany = await SecurityCompany.findById(id);
    res.status(200).json(updatedSecurityCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSecurityCompanyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const securityCompany = await SecurityCompany.findByIdAndUpdate(id, { status }, { new: true });

    if (!securityCompany) {
      return res.status(404).json({ message: "Security company not found" });
    }

    res.status(200).json(securityCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteSecurityCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const securityCompany = await SecurityCompany.findByIdAndDelete(id);

    if (!securityCompany) {
      return res.status(404).json({ message: 'Security company not found' });
    }

    res.status(200).json({ message: 'Security company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getSecurityCompanies,
  getSecurityCompany,
  createSecurityCompany,
  updateSecurityCompany,
  deleteSecurityCompany,
  updateSecurityCompanyStatus
};
