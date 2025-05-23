const Transaction = require("../models/Transaction");

exports.createTransaction = async (req,res) => {
  try {
    const { amount, category, type, date,note } = req.body;

    if(!amount || !category || !type){
       return res.status(400).json({message: 'Please fill all required fields.'})
    }

    const newTransaction = new Transaction({amount, category, type, date,note, userId: req.user.userId});
    await newTransaction.save()
    res.status(201).json({message: 'Transaction added successfully!',newTransaction})
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

exports.getTransaction = async (req,res) => {
 try {
  const transactions = await Transaction.find({ userId: req.user.userId })
  res.status(200).json(transactions)
 } catch (error) {
  res.status(500).json({ message: 'Error fetching transactions', error: error.message });
 } 
}

exports.editTransaction = async (req,res) => {
  try {
    const {id} = req.params;
    const { amount, category, type, date, note } = req.body;

   const edit = await Transaction.findByIdAndUpdate(
    { _id: id, userId: req.user.userId },
    { amount, category, type, date, note},
    {new: true, runValidators: true}
   );

   if (!edit) {
    return res.status(404).json({ error: 'Transaction not found' });
  }

  res.status(200).json({ message: 'Transaction updated successfully', edit });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteTransaction = async (req,res) => {
  try {
    const {id} = req.params;
    const delete_Transaction = await Transaction.findByIdAndDelete({ _id: id, userId: req.user.userId });

    if (!delete_Transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
}