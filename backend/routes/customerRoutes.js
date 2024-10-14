const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', roleMiddleware(['customer']), customerController.getCustomer);
router.get('/getdeviceInfo', roleMiddleware(['customer']), customerController.getdeviceInfo);
router.get('/getLivedata', roleMiddleware(['customer']), customerController.getLivedata);
router.post('/createCustomer', roleMiddleware(['admin', 'superadmin']), customerController.createCustomer);
router.get('/getallCustomer', roleMiddleware(['admin', 'superadmin']), customerController.getallCustomer);
router.get('/getCustomerById/:customerId', roleMiddleware(['admin', 'superadmin']), customerController.getCustomerById);
router.put('/updateCustomer/:customerId', roleMiddleware(['admin', 'customer']), customerController.updateCustomer);
router.delete('/deleteCustomer/:customerId', roleMiddleware(['admin']), customerController.deleteCustomer);
module.exports = router;
