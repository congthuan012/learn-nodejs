const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
router.route('/')
.get(userController.index)
.post()
.patch()
.delete();

module.exports = router;