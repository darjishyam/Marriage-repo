const express = require('express');
const router = express.Router();
const { getShaguns, addShagun, deleteShagun } = require('../controllers/shagunController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getShaguns).post(protect, addShagun);
router.route('/:id').delete(protect, deleteShagun);

module.exports = router;
