const express = require('express');
const {handleCreateForm,handleGetAllforms,handleGetFormURL,handleResponse,handleGetAllResponses} = require('../controllers/form')
const { verifyToken } = require('../middleware/auth'); 
const router = express.Router();

router.post('/create', verifyToken, handleCreateForm);

router.get('/', verifyToken, handleGetAllforms);

router.get('/:shareableUrl', handleGetFormURL);

router.post('/:id/responses', handleResponse);

router.get('/:id/responses', verifyToken, handleGetAllResponses);

module.exports = router;
