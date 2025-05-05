const CompanyInformation = require("../models/CompanyInformation");
const SecurityCompany = require("../models/SecurityCompany")


const getAllCompanyInformation = async (req, res) => {
    try {
        const allCompanyInformation = await CompanyInformation.find({});
        res.status(200).json(allCompanyInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCompanyInformation = async (req, res) => {
    try {
        const { id } = req.params;
        const companyInformation = await CompanyInformation.findById(id);
        res.status(200).json(companyInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCompanyInformation = async (req, res) => {
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

        // Create the CompanyInformation document
        const companyInformation = await CompanyInformation.create(req.body);
        res.status(201).json(companyInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCompanyInformation = async (req, res) => {
    try {
        const { id } = req.params;
        const { security_company } = req.body;

        if (security_company) {
            const companyExists = await SecurityCompany.findById(security_company);
            if (!companyExists) {
                return res.status(400).json({ message: "Invalid security company ID" });
            }
        }

        const companyInformation = await CompanyInformation.findByIdAndUpdate(id, req.body, { new: true });
        if (!companyInformation) {
            return res.status(404).json({ message: "Security guard not found" });
        }

        res.status(200).json(companyInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// In your backend route file
const updateCompanyInformationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const companyInformation = await CompanyInformation.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!companyInformation) {
            return res.status(404).json({ message: "Security guard not found" });
        }

        res.status(200).json(companyInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteCompanyInformation = async (req, res) => {
    try {
        const { id } = req.params;
        const companyInformation = await CompanyInformation.findByIdAndDelete(id);

        if (!companyInformation) {
            return res.status(404).json({ message: "Security company not found" });
        }

        res.status(200).json({ message: "Security company deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCompanyInformation,
    getCompanyInformation,
    createCompanyInformation,
    updateCompanyInformation,
    updateCompanyInformationStatus,
    deleteCompanyInformation,
};
