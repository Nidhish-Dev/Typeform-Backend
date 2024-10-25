const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
