const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', authenticateToken, bookSeat);
router.get('/details', authenticateToken, getBookingDetails);

module.exports = router;