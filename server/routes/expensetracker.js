const express = require('express');
const router = express.Router();
const User = require('../model/user');

// POST request to add an expense to a user
router.post('/user/expense/:user_id', async (req, res) => {

  try {
    const {user_id} = req.params;
    const user = await User.findById(user_id);
   
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the expense data from the request body
    const { itemName,price, date } = req.body;

    // Create a new expense object
    const newExpense = {
      itemName,  
      price,
      date,
    };

    // Push the new expense object into the user's expense array
    user.expense.push(newExpense);

    // Save the user object with the updated expense array
    await user.save();
    
    const sortedExpense=user.expense.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    
    res.status(201).json({success:true,sortedExpense});

  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).json({ error: 'Error adding expense' });
  }
});


// POST request to add an expense to a user
router.post('/user/income/:user_id', async (req, res) => {

  try {
    const userId = req.params.user_id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the expense data from the request body
    const { itemName,price, date } = req.body;

    // Create a new expense object
    const newIncome = {
      itemName,  
      price,
      date,
    };
    
    // Push the new expense object into the user's expense array
    user.income.push(newIncome);

    // Save the user object with the updated expense array
    await user.save();

    const sortedIncome=user.income.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    
    res.status(201).json({success:true,sortedIncome});

  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).json({ error: 'Error adding expense' });
  }
});

module.exports=router;