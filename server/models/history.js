const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    timePeriod: String,
    startDate: String,
    endDate: String,
    packageType: String,
    extraServices: Array,
    persons: String,
    total: Number
})

module.exports = mongoose.model('History', historySchema);
