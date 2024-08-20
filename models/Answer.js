// models/Answer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  testId: {
    type: Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;