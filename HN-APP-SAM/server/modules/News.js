const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RateSchema = require('./Rate')

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  create_time: {
    type: Date,
  },
  rates: [RateSchema],
})

module.exports = mongoose.model('News', NewsSchema)
