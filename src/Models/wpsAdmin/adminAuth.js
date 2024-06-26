const mongoose = require("mongoose")
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('admin', adminSchema)