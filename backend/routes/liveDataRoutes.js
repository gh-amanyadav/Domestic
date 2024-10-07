const express = require('express');
const router = express.Router();
const liveDataController = require('../controllers/liveDataController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/upload', roleMiddleware(['admin', 'superadmin']), liveDataController.uploadLiveData);
router.get('/getAllLivedata', roleMiddleware(['admin', 'superadmin']), liveDataController.getAllLivedata);

module.exports = router;
