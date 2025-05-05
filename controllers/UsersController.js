const User = require("../models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        
        const user = await User.create({ first_name, last_name, email, password, role });
        const token = createSecretToken(user);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(201).json({ message: "User Signed Up Successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "Security user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, district, village, street, phone_number, email, registration_date, renewal_date, termination_date, restoration_date } = req.body;

    // Check if all required fields are present
    if (!name || !district || !village || !street || !phone_number || !email || !registration_date || !renewal_date || !termination_date || !restoration_date) {
      return res.status(400).json({
        message: "All fields (name, district, village, street, phone_number, email) are required."
      });
    }

    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "Security user not found" });
    }

    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'Security user not found' });
    }

    res.status(200).json({ message: 'Security user deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsersCount = async (req, res) => {
  try{
      const usersCount = await User.countDocuments();
      res.status(200).json(usersCount);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
}



module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersCount
};
