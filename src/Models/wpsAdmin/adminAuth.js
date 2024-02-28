const mongoose = require("mongoose")
const adminSchema = mongoose.Schema({
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    type: {
        type: 'string',
        required: true
    },
    status: {
        type: 'string',
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('admin', adminSchema)