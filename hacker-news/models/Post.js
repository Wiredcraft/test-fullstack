const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    likesAmount: {
      type: Number,
      default: 0,
    },
    dateAdded: {
      type: String,
      default: Date.now
    },
});

module.exports = mongoose.model('Post', postSchema);
