const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById } = require('../controllers/user.controller');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);

module.exports = router;
