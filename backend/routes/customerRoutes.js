const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', roleMiddleware(['customer']), customerController.getCustomer);
router.get('/getdeviceInfo', roleMiddleware(['customer']), customerController.getdeviceInfo);
router.get('/getLivedata', roleMiddleware(['customer']), customerController.getLivedata);
router.get('/createCustomer', roleMiddleware(['admin', 'superadmin']), customerController.createCustomer);
router.get('/getallCustomer', roleMiddleware(['admin', 'superadmin']), customerController.getallCustomer);
module.exports = router;
