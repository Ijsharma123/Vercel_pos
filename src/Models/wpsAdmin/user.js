const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        rewuired: true
    },
    mobile_number: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    privilege: {
        type: String,
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
    companyId: {
        type: String,
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
module.exports = mongoose.model('User', userSchema)