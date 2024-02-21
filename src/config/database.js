require('dotenv').config()
const mongoose = require('mongoose');

const Mongodb_URL = process.env.DATABASE_URL
const Database = async (req, res) => {
    try {
        const Connect = mongoose.connect(Mongodb_URL)
        if (Connect) {
            console.log("Database connection established")
        } else {
            console.log("Database connection not established")
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = Database