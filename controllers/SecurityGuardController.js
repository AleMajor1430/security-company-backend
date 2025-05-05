const SecurityGuard = require("../models/SecurityGuard");
const SecurityCompany = require("../models/SecurityCompany")


const getSecurityGuards = async (req, res) => {
  try {
    const securityGuards = await SecurityGuard.find({}).populate('security_company');
    res.status(200).json(securityGuards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSecurityGuard = async (req, res) => {
  try {
    const { id } = req.params;
    const securityGuard = await SecurityGuard.findById(id).populate('security_company');
    res.status(200).json(securityGuard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSecurityGuard = async (req, res) => {
  try {
    const { security_company, start_date } = req.body;

    // Validate security company ID
    const companyExists = await SecurityCompany.findById(security_company);
    if (!companyExists) {
      return res.status(400).json({ message: "Invalid security company ID" });
    }

    // Validate and format start_date
    if (start_date) {
      // Replace the hyphen before the time with a 'T'
      req.body.start_date = start_date.replace(/-(?=\d{2}T)/, 'T');
    }

    // Create the SecurityGuard document
    const securityGuard = await SecurityGuard.create(req.body);
    res.status(201).json(securityGuard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSecurityGuard = async (req, res) => {
  try {
    const { id } = req.params;
    const { security_company } = req.body;

    if (security_company) {
      const companyExists = await SecurityCompany.findById(security_company);
      if (!companyExists) {
        return res.status(400).json({ message: "Invalid security company ID" });
      }
    }

    const securityGuard = await SecurityGuard.findByIdAndUpdate(id, req.body, { new: true });
    if (!securityGuard) {
      return res.status(404).json({ message: "Security guard not found" });
    }

    res.status(200).json(securityGuard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// In your backend route file
const updateSecurityGuardStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const securityGuard = await SecurityGuard.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!securityGuard) {
      return res.status(404).json({ message: "Security guard not found" });
    }

    res.status(200).json(securityGuard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteSecurityGuard = async (req, res) => {
  try {
    const { id } = req.params;
    const securityGuard = await SecurityGuard.findByIdAndDelete(id);

    if (!securityGuard) {
      return res.status(404).json({ message: "Security company not found" });
    }

    res.status(200).json({ message: "Security company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGuardsByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;
    
    // Validate company exists
    const companyExists = await SecurityCompany.findById(companyId);
    if (!companyExists) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Get guards for this company and populate basic company info
    const guards = await SecurityGuard.find({ security_company: companyId })
      .select('_id first_name last_name')
      .populate('security_company', 'name');

    res.status(200).json(guards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSecurityGuards,
  getSecurityGuard,
  createSecurityGuard,
  updateSecurityGuard,
  updateSecurityGuardStatus,
  deleteSecurityGuard,
  getGuardsByCompanyId
};
