const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        enum: ['text', 'multiple-choice', 'checkbox'],
        required: true,
    },
    options: {
        type: [String],
        default: [],
    },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
