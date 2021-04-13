var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  from: String,
  to: String,
  message: String,
  roomId: String,
  timestamp: Date,
});

var message = mongoose.model('messageEntry', messageSchema);
module.exports = message;
