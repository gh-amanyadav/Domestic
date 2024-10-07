const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const roleMiddleware = require('../middleware/roleMiddleware');

// Role-based dashboard routes
router.get('/customer', roleMiddleware(['customer']), dashboardController.customerDashboard);
router.get('/admin', roleMiddleware(['admin']), dashboardController.adminDashboard);
router.get('/superadmin', roleMiddleware(['superadmin']), dashboardController.superAdminDashboard);

module.exports = router;
