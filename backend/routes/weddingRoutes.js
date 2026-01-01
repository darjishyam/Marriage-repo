const express = require('express');
const router = express.Router();
const { createWedding, getMyWedding, getAllWeddings, updateWedding } = require('../controllers/weddingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createWedding);
router.get('/', protect, getAllWeddings);
router.get('/my', protect, getMyWedding);
router.put('/:id', protect, updateWedding);

module.exports = router;
