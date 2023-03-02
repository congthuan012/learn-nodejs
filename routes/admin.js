const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
router.route('/')
.get(adminController.index)
.post(adminController.store)
.patch(adminController.update)
.delete(adminController.delete);

module.exports = router;