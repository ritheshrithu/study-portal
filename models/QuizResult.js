const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuizResult = new Schema(
  {
    topicName: {
      type: String,
      required: true
    },
    techName: {
      type: String,
      required: true
    },
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "topics"
    },
    techId: {
      type: Schema.Types.ObjectId,
      ref: "techs"
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    marksScored: {
      type: Number,
      required: true
    },
    marksScoredInPercent: {
      type: String,
      required: true
    },
    correctAnswers: {
      type: Number,
      required: true
    },
    wrongAnswers: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    userName: {
      type: String,
      required: true
    },
    project: {
      type: String,
      required: true
    },
    dateAttended: {
      type: Date,
      required: true
    },
    empId: {
      type: Number,
      required: true
    }
  },
  {
    collection: "quizData"
  }
);

module.exports = User = mongoose.model("QuizResult", QuizResult);
