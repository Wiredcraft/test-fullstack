const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');

const PollSchema = new Schema({
  cuid         : { type: String, default: cuid(), required: false },
  user_id      : { type: String, required: true },
  user_name    : { type: String, required: true },
  title        : { type: String, required: true },
  votes        : { type: Number, default: 0, required: true },
  date_created : { type: 'Date', default: (new Date().toISOString()), required: true },
  date_updated : { type: 'Date', default: (new Date().toISOString()), required: true }
});

PollSchema.pre('save', next => {
  let poll = this;

  poll.user_name = sanitizeHtml(poll.user_name);
  poll.title = sanitizeHtml(poll.title);
  poll.votes = Number(poll.votes);
  poll.date_updated = new Date().toISOString();
  next();
});

module.exports = mongoose.model('Poll', PollSchema);