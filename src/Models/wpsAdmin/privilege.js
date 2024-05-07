const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    name: { type: String },
    checked: { type: Boolean },
    options: [{ name: { type: String, enum: ['list', 'add', 'edit', 'view', 'delete'] }, checked: { type: Boolean } }],
}, { _id: false });


const PrivilegeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    access: {
        type: [subSchema],
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