const mongoose = require('mongoose');
const AccessSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    option: {
        type: Array,
        required: true,
    },
    permission: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('access', AccessSchema)