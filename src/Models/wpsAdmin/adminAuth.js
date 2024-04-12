const mongoose = require("mongoose")
const adminSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    email: {
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
    vendor: {
        type: Number,
        required: true
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