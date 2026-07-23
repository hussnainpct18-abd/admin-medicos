const express = require('express');
const router = express.Router();
const authMiddleware = require('../../auth/middlewares/auth.middleware');
const { GetUsers, AddUsers, DeleteUsers, UpdateUsers } = require('../controller/user.controller');

router.get('/users', authMiddleware, GetUsers);
router.post('/add-users', authMiddleware, AddUsers);
router.delete('/delete-users', authMiddleware, DeleteUsers);
router.put('/update-users', authMiddleware, UpdateUsers);


module.exports = router;