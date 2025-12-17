const Guest = require('../models/Guest');
const Wedding = require('../models/Wedding');

// @desc    Add a guest
// @route   POST /api/guests
// @access  Private
const addGuest = async (req, res) => {
    const { name, cityVillage, familyCount } = req.body;

    try {
        const wedding = await Wedding.findOne({ user: req.user._id });
        if (!wedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }

        const guest = await Guest.create({
            wedding: wedding._id,
            name,
            cityVillage,
            familyCount,
        });

        res.status(201).json(guest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all guests for a wedding
// @route   GET /api/guests
// @access  Private
const getGuests = async (req, res) => {
    try {
        const wedding = await Wedding.findOne({ user: req.user._id });
        if (!wedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }

        const guests = await Guest.find({ wedding: wedding._id });
        res.json(guests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addGuest, getGuests };
