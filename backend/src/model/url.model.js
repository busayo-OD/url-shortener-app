const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    backHalf: String,
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: String,
    tags: [String],
    qrCode: String,
    clickCount: {
      type: Number,
      default: 0,
    },
    clicks: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        ipAddress: String,
        city: String,
        country: String
      },
    ],
    date: {
      type: String,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Url', urlSchema);