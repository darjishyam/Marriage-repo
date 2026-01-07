const { getShaguns, addShagun, deleteShagun, updateShagun } = require('../controllers/shagunController');
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getShaguns).post(protect, addShagun);
router.route('/:id').delete(protect, deleteShagun).put(protect, updateShagun);

module.exports = router;
