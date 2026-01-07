const Expense = require('../models/Expense');
const Wedding = require('../models/Wedding');

// @desc    Add an expense
// @route   POST /api/expenses
// @access  Private
const addExpense = async (req, res) => {
    const { title, amount, category, date } = req.body;

    try {
        const wedding = await Wedding.findOne({ user: req.user._id });
        if (!wedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }

        const expense = await Expense.create({
            wedding: wedding._id,
            title,
            amount,
            paidAmount: req.body.paidAmount || 0,
            category,
            date,
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all expenses for a wedding
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
    try {
        let weddingId = req.query.weddingId;

        if (!weddingId) {
            const wedding = await Wedding.findOne({ user: req.user._id });
            if (!wedding) {
                return res.json([]);
            }
            weddingId = wedding._id;
        }

        const expenses = await Expense.find({ wedding: weddingId });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (expense) {
            expense.title = req.body.title || expense.title;
            expense.amount = req.body.amount || expense.amount;
            expense.paidAmount = req.body.paidAmount !== undefined ? req.body.paidAmount : expense.paidAmount;
            expense.category = req.body.category || expense.category;
            expense.date = req.body.date || expense.date;

            const updatedExpense = await expense.save();
            res.json(updatedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addExpense, getExpenses, updateExpense };
