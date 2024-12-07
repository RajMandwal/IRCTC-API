const express = require('express');
const { addTrain, getTrainAvailability } = require('../controllers/trainController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkAdminKey } = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/', authenticateToken, checkAdminKey, addTrain);
router.get('/availability', authenticateToken, getTrainAvailability);

module.exports = router;