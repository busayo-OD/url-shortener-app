const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    backHalf: String,
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    tags: [String],
    clickSources: [String],
    qrCode: String,
    clicks:{
        type: Number,
        default: 0
    },
    date: {type: String, default: Date.now}
});

module.exports = mongoose.model('Url', urlSchema);