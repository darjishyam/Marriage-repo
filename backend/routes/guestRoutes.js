const express = require('express');
const router = express.Router();
const { addGuest, getGuests } = require('../controllers/guestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addGuest);
router.get('/', protect, getGuests);

module.exports = router;
