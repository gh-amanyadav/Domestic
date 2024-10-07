const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/createCustomer', roleMiddleware(['superadmin', 'admin']), adminController.createAdmin);
router.get('/getAllAdmin', roleMiddleware(['superadmin', 'customer']), adminController.getAllAdmin);
module.exports = router;