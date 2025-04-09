import { useEffect, useState } from "react"
import { deleteTransaction, getTransactions } from "../services/Api"
import {useNavigate} from "react-router-dom"

const AllTransactions = () =>{
  const [transactions,setTransactions] = useState([]);
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const response = await getTransactions()
      setTransactions(response.data);    
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  }

const handleDelete = async (id) =>{
  try {
    const response = await deleteTransaction(id);
    alert(response.data.message);
    const transaction_Delete = transactions.filter((transaction)=> transaction._id !== id)
    setTransactions(transaction_Delete)
  } catch (error) {
    
  }
}
  
  useEffect(()=>{
  fetchData()
  },[])

  const income = transactions
  .filter((transaction)=>transaction.type == 'Income')
  .reduce((acc,transaction) => acc + transaction.amount,0)

  const expense = transactions
  .filter((transaction)=> transaction.type == 'Expense')
  .reduce((acc,transaction)=> acc + transaction.amount,0)
  
  const totalBalance = income - expense;
  return(
    <div className="min-h-screen p-8 bg-gray-100 ">
      <div  className="mb-8">
        <h1 className="text-3xl font-bold">Total Balance: ₹{totalBalance}</h1>
      </div>

      <div  className="mt-4 flex justify-between">
        <p className="text-green-600 font-semibold">Income: ₹{income}</p>
        <p className="text-red-600 font-semibold">Expense: ₹{expense}</p>
      </div>

        <h2 className="text-2xl font-bold mb-4 ">Recent Transactions</h2>
        <div className="w-full flex justify-center flex-col">
      <table className="w-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 ">
          <tr className="">
            <th className="p-4 text-center min-w-[120px]">Date</th>
            <th className="p-4 text-center min-w-[120px]">Amount</th>
            <th className="p-4 text-center min-w-[120px]">Category</th>
            <th className="p-4 text-center min-w-[120px]">Type</th>
            <th className="p-4 text-center min-w-[120px]">Note</th>
          </tr>
        </thead>
        <tbody >
      {transactions.map((transaction)=>(
         <tr key={transaction._id} className="border-b">
          <td  className="p-4 text-center">{new Date(transaction.date).toLocaleDateString('en-US')}</td>
          <td  className="p-4 text-center ">₹{transaction.amount}</td>
          <td  className="p-4 text-center">{transaction.category}</td>
          <td  className="p-4 text-center">{transaction.type}</td>
          <td  className="p-4 text-center">{transaction.note}</td>
          
          <td className="p-4 flex gap-4">
            <button
              onClick={() => navigate("/add", { state: { transaction: transaction } })} 
              className=  "bg-blue-500 text-white px-2 py-2 ml-4 rounded hover:cursor-pointer hover:bg-blue-400"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(transaction._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-red-400"
            >
              Delete
            </button>
          </td>
        </tr>
     ) )}
     </tbody>
      </table>
      </div>
    </div>
  )
}

export default AllTransactions