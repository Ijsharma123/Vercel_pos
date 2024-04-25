const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema({
    subscription_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    company_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    subscription_expiry_date: {
        type: Date,
        required: true
    },
    notification_date: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('Notification', notificationSchema)