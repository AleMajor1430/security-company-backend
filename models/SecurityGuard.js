const mongoose = require("mongoose");

const securityGuardSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female", "Other"]
    },
    security_company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SecurityCompany',
        required: [true, "Security company is required"]
    },
    phone_number: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: function (v) {
                return /^[0-9]{10,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    hire_date: {
        type: Date,
        required: [true, "Hire date is required"],
        default: Date.now
    },
    district: {
        type: String,
        required: [true, "District is required"]
    },
    village: {
        type: String,
        required: [true, "Village is required"]
    },
    street: {
        type: String,
        required: [true, "Street is required"]
    },
    chief_name: {
        type: String,
        required: [true, "Chief name is required"]
    },
    next_of_kin: {
        type: String,
        required: [true, "Next of kin is required"]
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended", "Terminated"],
        default: "Active"
    },
    termination_date: { type: Date },
    termination_reason: { type: String },
    training_completed: {
        type: Boolean,
        default: false
    },
    last_training_date: { type: Date }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
securityGuardSchema.virtual('full_name').get(function () {
    return `${this.first_name} ${this.last_name}`;
});

// Add text index for search
securityGuardSchema.index({
    first_name: 'text',
    last_name: 'text',
    email: 'text',
    phone_number: 'text',
});

module.exports = mongoose.model("SecurityGuard", securityGuardSchema);