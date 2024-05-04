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
    image: {
        type: String,
        required: false
    },
    mobile_number: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: false
    },
    role: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    privilege: {
        type: mongoose.Types.ObjectId,
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