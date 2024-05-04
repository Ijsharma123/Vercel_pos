const mongoose = require("mongoose")
const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    mobile_number: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: 'company'
    },
    privilege: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    companyId: {
        type: String,
        required: true
    },
    noOfVendor: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confPassword: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: false
    },
    subscription_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    subscription_expiry_date: {
        type: Date,
        required: false
    }
})
module.exports = mongoose.model('Company', companySchema)