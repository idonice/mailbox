const express = require('express');
const { getMessageById, sendNewMessage } = require('../controllers/message.controller');
const router = express.Router();

router.get('/:messageId', getMessageById);
router.post('/', sendNewMessage);

module.exports = router;