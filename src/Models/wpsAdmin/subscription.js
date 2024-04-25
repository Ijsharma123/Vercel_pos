const mongoose = require('mongoose')
const subsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    no_of_day: {
        type: Number,
        required: true
    },
    description: {
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
    },
    subscription_expiry_date: {
        type: Date,
        required: false
    }
})
module.exports = mongoose.model('Subscription', subsSchema)