const mongoose = require('mongoose');

const articalSchema = new mongoose.Schema({
  objectId: String,
  title: String,
  createAt: Number,
  collectionCount: Number,
  originalUrl: String,
  summaryInfo: String,
  tags: Array,
  user: String
});

module.exports = mongoose.model('Artical', articalSchema);
