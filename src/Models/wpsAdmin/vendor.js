const mongoose = require('mongoose');
const vendorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    no_of_vendor: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('vendor', vendorSchema)