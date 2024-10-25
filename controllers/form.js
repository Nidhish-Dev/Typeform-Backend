const Form = require('../models/Form');
const Question = require('../models/Question');
const Response = require('../models/Response');


async function handleCreateForm(req,res) {
    const { title, questions } = req.body;

    try {
        const newForm = await Form.create({ title, userId: req.userId });

        const questionPromises = questions.map(q => {
            return Question.create({
                formId: newForm._id,
                questionText: q.questionText,
                questionType: q.questionType,
                options: q.options,
            });
        });

        const questionDocuments = await Promise.all(questionPromises);
        newForm.questions = questionDocuments.map(q => q._id);
        await newForm.save();

        res.status(201).json(newForm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}

async function handleGetAllforms(req,res) {
    try {
        const forms = await Form.find({ userId: req.userId }).populate('questions');
        res.json(forms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}


async function handleGetFormURL(req,res) {
    const { shareableUrl } = req.params;

    try {
        const form = await Form.findOne({ _id: shareableUrl }).populate('questions');
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.json(form);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


async function handleResponse(req,res) {
    console.log('Incoming data:', req.body); // Log incoming data for debugging
    const { answers } = req.body; // Extract answers
    const formId = req.params.id; // Extract formId from URL params

    console.log(`Attempting to submit response for form ID: ${formId}`);

    try {
        // Check if the form exists
        const formExists = await Form.findById(formId);
        if (!formExists) {
            return res.status(404).json({ error: 'Form not found' });
        }

        const newResponse = new Response({
            formId: formId,
            answers: answers,
        });

        await newResponse.save(); // Save the response
        res.status(201).json({ message: 'Response submitted successfully', response: newResponse });
    } catch (error) {
        console.error('Error saving response:', error);
        res.status(500).json({ message: 'Error saving response' });
    }
}

async function handleGetAllResponses(req,res) {
    const { id } = req.params;

    try {
        const responses = await Response.find({ formId: id });
        res.json(responses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handleCreateForm,handleGetAllforms,handleGetFormURL,handleResponse,handleGetAllResponses
  };