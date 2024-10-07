const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/add', roleMiddleware(['admin', 'superadmin']), deviceController.addDevice);
router.get('/getAllDeviceInfo', roleMiddleware(['admin', 'superadmin']), deviceController.getAllDeviceInfo);

module.exports = router;
