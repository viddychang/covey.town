const mongoose = require('mongoose');
/*const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique, {
  defaultMessage: "duplication detected"
});
mongoose.set('useCreateIndex', true);*/

var Schema = mongoose.Schema;

var roomSchema = new Schema({
  roomId: { type: String, unique: true },
  friendlyName: String,
  isPublic: Boolean,
  password: String,
});

//roomSchema.plugin(beautifyUnique);
var room = mongoose.model('roomEntry', roomSchema);
module.exports = room;
