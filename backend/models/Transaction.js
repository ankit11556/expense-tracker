const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Income','Expense'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String,
    default: "-"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
  
},{timestamps:true});

const Transaction = mongoose.model('Transaction',transactionSchema);
module.exports = Transaction;