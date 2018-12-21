const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: 'https://avatars2.githubusercontent.com/u/21071580'
  },
  job: {
    type: String,
    default: 'Front-end Developer'
  },
  address: {
    type: String,
    default: 'Hefei, Anhui'
  }
});

module.exports = mongoose.model('User', UserSchema);
