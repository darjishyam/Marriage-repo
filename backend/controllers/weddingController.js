const Wedding = require('../models/Wedding');

// @desc    Create a new wedding
// @route   POST /api/weddings
// @access  Private
const createWedding = async (req, res) => {
    const { groomName, brideName, date, groomImage, brideImage } = req.body;

    try {
        const wedding = await Wedding.create({
            user: req.user._id,
            groomName,
            brideName,
            date,
            groomImage,
            brideImage,
        });
        res.status(201).json(wedding);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Guest = require('../models/Guest');
const Expense = require('../models/Expense');

// @desc    Get all weddings for user
// @route   GET /api/weddings
// @access  Private
const getAllWeddings = async (req, res) => {
    try {
        const weddings = await Wedding.find({ user: req.user._id }).sort({ date: -1 });
        res.json(weddings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's wedding with stats (latest or specific)
// @route   GET /api/weddings/my
// @access  Private
const getMyWedding = async (req, res) => {
    try {
        let wedding;
        const { weddingId } = req.query;

        if (weddingId) {
            wedding = await Wedding.findOne({ _id: weddingId, user: req.user._id });
        } else {
            // Default to the most recently created/updated or just one
            // We'll sort by createdAt desc to get the latest
            wedding = await Wedding.findOne({ user: req.user._id }).sort({ createdAt: -1 });
        }

        if (wedding) {
            // Fetch stats in parallel
            const guestCount = await Guest.countDocuments({ wedding: wedding._id });

            // Calculate expenses
            // Calculate expenses
            const expenses = await Expense.find({ wedding: wedding._id });
            const totalSpentAmount = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);

            res.json({
                ...wedding.toObject(),
                startStatistics: {
                    guestCount,
                    totalSpent: totalSpentAmount,
                }
            });
        } else {
            // If checking for specific ID and not found -> 404
            // If just checking "my" (latest) and none exist -> 404 (handled by frontend as "create one")
            res.status(404).json({ message: 'Wedding not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update wedding details
// @route   PUT /api/weddings/:id
// @access  Private
const updateWedding = async (req, res) => {
    try {
        const { groomName, brideName, date, totalBudget, groomImage, brideImage } = req.body;
        const wedding = await Wedding.findOne({ _id: req.params.id, user: req.user._id });

        if (wedding) {
            wedding.groomName = groomName || wedding.groomName;
            wedding.brideName = brideName || wedding.brideName;
            wedding.date = date || wedding.date;
            if (totalBudget !== undefined) wedding.totalBudget = totalBudget;
            if (groomImage) wedding.groomImage = groomImage;
            if (brideImage) wedding.brideImage = brideImage;

            const updatedWedding = await wedding.save();
            res.json(updatedWedding);
        } else {
            res.status(404).json({ message: 'Wedding not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createWedding, getMyWedding, getAllWeddings, updateWedding };
