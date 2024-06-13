const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
    type: String,
    CPC: Number,
    trackingCode: String
});

module.exports = ZoneSchema;
