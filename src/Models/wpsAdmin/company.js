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
    mobile_number: {
        type: Number,
        required: true
    },
    role :{
        type: String,
        default: 'company'
    },
    privilege: {
        type: String,
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
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('Company', companySchema)