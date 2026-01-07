const Shagun = require('../models/Shagun');
const Wedding = require('../models/Wedding');

// @desc    Get all shagun entries for a wedding
// @route   GET /api/shagun
// @access  Private
const getShaguns = async (req, res) => {
    try {
        // Find wedding for the user
        let weddingId = req.query.weddingId;

        // If no weddingId provided, fallback to finding ANY wedding for user (Legacy support)
        // ideally frontend should always send it
        if (!weddingId) {
            const wedding = await Wedding.findOne({ user: req.user._id });
            if (!wedding) {
                return res.status(404).json({ message: 'Wedding not found' });
            }
            weddingId = wedding._id;
        }

        const shaguns = await Shagun.find({ wedding: weddingId }).sort({ date: -1 });
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

// @desc    Update a shagun entry
// @route   PUT /api/shagun/:id
// @access  Private
const updateShagun = async (req, res) => {
    try {
        const shagun = await Shagun.findById(req.params.id);

        if (shagun) {
            shagun.name = req.body.name || shagun.name;
            shagun.amount = req.body.amount || shagun.amount;
            shagun.city = req.body.city || shagun.city;
            shagun.gift = req.body.gift || shagun.gift;
            shagun.contact = req.body.contact || shagun.contact;
            shagun.wishes = req.body.wishes || shagun.wishes;
            shagun.date = req.body.date || shagun.date;

            const updatedShagun = await shagun.save();
            res.json(updatedShagun);
        } else {
            res.status(404).json({ message: 'Shagun not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getShaguns, addShagun, deleteShagun, updateShagun };
