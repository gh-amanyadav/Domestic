const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/add', roleMiddleware(['admin', 'superadmin']), deviceController.addDevice);
router.get('/getAllDeviceInfo', roleMiddleware(['admin', 'superadmin']), deviceController.getAllDeviceInfo);
router.get('/updateDeviceInfo', roleMiddleware(['admin', 'superadmin']), deviceController.updateDevice);
router.get('/deleteDeviceInfo', roleMiddleware(['admin', 'superadmin']), deviceController.deleteDevice);

module.exports = router;
