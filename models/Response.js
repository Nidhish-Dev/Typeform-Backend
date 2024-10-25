const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true,
    },
    answers: [{
        type: String,
        required: true,
    }],
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const Response = mongoose.model('Response', responseSchema);
module.exports = Response;
