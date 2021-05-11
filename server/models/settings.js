const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    type: String,
    short: {
        basic: Number,
        extended: Number,
        extra: Number,
        cancellation: Number,
        sport: Number
    },
    yearly: {
        basic: Number,
        extended: Number,
        extra: Number,
        cancellation: Number,
        sport: Number
    }

})

module.exports = mongoose.model('Settings', settingsSchema);
