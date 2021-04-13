/* eslint-disable */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  from: String,
  to: String,
  message: String,
  roomId: String,
  timestamp: Date,
});

const message = mongoose.model('messageEntry', messageSchema);
module.exports = message;
