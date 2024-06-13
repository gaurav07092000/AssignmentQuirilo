const mongoose = require('mongoose');
const ZoneSchema = require('./Zone');

const SiteSchema = new mongoose.Schema({
    name: String,
    url: String,
    category: String,
    status: {
        type: String,
        default: 'Pending'
    },
    zones: [ZoneSchema]
});

module.exports = mongoose.model('Site', SiteSchema);
