const Shagun = require('../models/Shagun');
const Wedding = require('../models/Wedding');

// @desc    Get all shagun entries for a wedding
// @route   GET /api/shagun
// @access  Private
const getShaguns = async (req, res) => {
    try {
        // Find wedding for the user
        const wedding = await Wedding.findOne({ user: req.user._id });
        if (!wedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }

        const shaguns = await Shagun.find({ wedding: wedding._id }).sort({ date: -1 });
        res.json(shaguns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a shagun entry
// @route   POST /api/shagun
// @access  Private
const addShagun = async (req, res) => {
    try {
        const wedding = await Wedding.findOne({ user: req.user._id });
        if (!wedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }

        const { name, amount, city, gift, contact, wishes, date } = req.body;

        const shagun = new Shagun({
            wedding: wedding._id,
            name,
            amount,
            city,
            gift,
            contact,
            wishes,
            date: date || Date.now()
        });

        const createdShagun = await shagun.save();
        res.status(201).json(createdShagun);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a shagun entry
// @route   DELETE /api/shagun/:id
// @access  Private
const deleteShagun = async (req, res) => {
    try {
        const shagun = await Shagun.findById(req.params.id);

        if (shagun) {
            await shagun.deleteOne();
            res.json({ message: 'Shagun removed' });
        } else {
            res.status(404).json({ message: 'Shagun not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getShaguns, addShagun, deleteShagun };
