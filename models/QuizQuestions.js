var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
module.exports = mongoose.model('QuizQuestions', {
    keyid: Schema.Types.ObjectId,
    quizData: [],
    time: Date
});
