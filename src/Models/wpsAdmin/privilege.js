const mongoose = require('mongoose');
const PrivilegeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    access: {
        type: Array,
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
module.exports = mongoose.model('Privilege', PrivilegeSchema)