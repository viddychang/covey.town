/* eslint @typescript-eslint/no-var-requires: "off" */
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/coveytown-chat');
mongoose.connect(
  'mongodb+srv://covey-town-admin:CoveyTown@cluster0.cnmfz.mongodb.net/coveytown-chat?authSource=admin',
);

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const messageEntry = require('./models/message.model.js');
const roomEntry = require('./models/room.model.js');

app.listen(3001);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'yaaay' });
});

app.get('/fetchAllMessages', (req, res) => {
  messageEntry.find({}).then(eachOne => {
    res.json(eachOne);
  });
});

app.get('/fetchAllMessages/:roomId', (req, res) => {
  messageEntry.find({ roomId: req.params.roomId }).then(each => {
    res.json(each);
  });
});

app.post('/message', (req, res) => {
  messageEntry
    .create({
      from: req.body.from,
      to: req.body.to,
      message: req.body.message,
      roomId: req.body.roomId,
      timestamp: Date.now(),
    })
    .then(entry => res.json(entry));
});

app.post('/room', (req, res) => {
  let password = '';
  if (req.body.isPublic === true) {
    password = 'NONE';
  } else {
    if (req.body.password === undefined || req.body.password === '') {
      return res.send({
        error: 'Password is required when the town is private.',
      });
    }
    password = req.body.password;
  }
  roomEntry
    .create({
      // fetch roomID, friendly name and isPublic from prof's code
      roomId: req.body.roomId,
      friendlyName: req.body.friendlyName,
      isPublic: req.body.isPublic,
      password,
    })
    .then(entry => res.json(entry))
    .catch(error => {
      if (error !== null && error.name === 'MongoError' && error.code === 11000) {
        return res.status(500).send({ message: 'This room id is already in use.' });
      }
      return res.status(500).json({ message: error });
    });

  return null;
});
