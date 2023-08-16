const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/antonx')
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}