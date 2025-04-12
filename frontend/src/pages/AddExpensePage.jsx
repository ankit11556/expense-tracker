import { useState,useEffect } from "react";
import { postTransactions } from "../services/Api";
import {useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";
import { updateTransaction } from "../services/Api";

const AddExpensePage = () => {
  const navigate = useNavigate()
  const location = useLocation();


  const [amount,setAmount] = useState();
  const [category,setCategory] = useState("");
  const [type,setType] = useState("Income")
  const [date,setDate] = useState("");
  const [note,setNote] = useState("");

const transactionToEdit = location.state?.transaction || null;


useEffect(() => {
  if (transactionToEdit) {
    setAmount(transactionToEdit.amount);
    setCategory(transactionToEdit.category);
    setType(transactionToEdit.type);
    setDate(transactionToEdit.date);
    setNote(transactionToEdit.note);
  }
}, [transactionToEdit]);

 
  const handleSubmit =  async (e) => {
    e.preventDefault()
    try {
      if (transactionToEdit) {
        const response = await updateTransaction(transactionToEdit._id, { amount, category, type, date, note });
        alert(response.data.message);
      } else{
      const response = await postTransactions({amount,category,type,date,note})
      alert(response.data.message)
      }
    navigate("/all-transactions")
    } catch (error) {
      alert(error.response?.data?.error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Expense</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
            type="text"
            placeholder="Enter category"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700">Select Type</label>
          <select
          value={type}
          onChange={(e)=> setType(e.target.value)}
            name="type"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
          value={date}
          onChange={(e)=>setDate(e.target.value)}
            type="date"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <input
          value={note}
          
          onChange={(e)=>setNote(e.target.value)}
            type="text"
            placeholder="Add a note (optional)"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#008080] text-white p-2 rounded hover:bg-[#006666] hover:cursor-pointer"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpensePage;
