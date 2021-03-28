const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RateSchema = new Schema({
  rater: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rate_time: {
    type: Date,
    default: Date.now,
  },
})

module.exports = RateSchema
