// models/Test.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  }],
  score: {
    type: Number,
    default: 0,
  },
  evaluated: {
    type: Boolean,
    default: false,
  },
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;