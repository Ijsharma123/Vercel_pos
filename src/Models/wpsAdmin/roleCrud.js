const mongoose = require('mongoose')
const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
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