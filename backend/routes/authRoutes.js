const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyOtp, deleteAccount, upgradeToPremium, getMe, googleLogin, facebookLogin, appleLogin, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin); // Google Auth Route
router.post('/facebook', facebookLogin); // Facebook Auth Route
router.post('/apple', appleLogin); // Apple Auth Route
router.post('/verify-otp', verifyOtp);
router.delete('/delete-account', protect, deleteAccount);
router.post('/upgrade', protect, upgradeToPremium);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
