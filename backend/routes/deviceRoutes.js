const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/add', roleMiddleware(['admin', 'superadmin']), deviceController.addDevice);
router.get('/getAllDeviceInfo', roleMiddleware(['admin', 'superadmin']), deviceController.getAllDeviceInfo);
router.get('/getDeviceById/:deviceId', roleMiddleware(['admin', 'superadmin']), deviceController.getDeviceById);
router.put('/updateDeviceInfo/:deviceId', roleMiddleware(['admin', 'superadmin']), deviceController.updateDevice);
router.delete('/deleteDeviceInfo/:deviceId', roleMiddleware(['admin', 'superadmin']), deviceController.deleteDevice);

module.exports = router;
