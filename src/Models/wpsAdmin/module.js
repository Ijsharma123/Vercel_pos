const mongoose = require('mongoose');
const moduleSchema = mongoose.Schema({
    modules: {
        type: Array,
        required: true
    }
})
module.exports = mongoose.model('modules', moduleSchema);