const mongoose = require('mongoose')
const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    access: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('role', roleSchema);