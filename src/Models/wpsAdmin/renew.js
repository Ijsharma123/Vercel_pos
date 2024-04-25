const mongoose = require("mongoose")
const renewSchema = mongoose.Schema({
    subscription: {
        type: String,
        required: true
    },
    no_of_vendor: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('renewLog', renewSchema)