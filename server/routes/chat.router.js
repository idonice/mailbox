const express = require('express');
const router = express.Router();
const { getChatsByUserId, createChat, updateStatusByIds, getChatById } = require('../controllers/chat.controller');

router.get('/:userId/:category', getChatsByUserId);
router.get('/:chatId', getChatById);
router.post('/', createChat);
router.put('/updateStatus', async (req, res) => {
    const { userId, chatId, statusKey, statusValue } = req.body;
    try {
        const updatedUser = await updateStatusByIds(userId, chatId, statusKey, statusValue);
        res.status(200).json({ message: 'Chat status updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating chat status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;