import { useEffect, useState } from "react"
import { deleteTransaction, getTransactions } from "../services/Api"
import {useNavigate} from "react-router-dom"

const AllTransactions = () =>{
  const [transactions,setTransactions] = useState([]);
  const [noData, setNoData] = useState(false);

  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const response = await getTransactions()
       
      if (response.data.length === 0) {
        setNoData(true);
      }else{
        setTransactions(response.data)
        setNoData(false);
      }
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
     console.log(error.response?.data?.error);
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
      <div  className="mb-6">
        <h1 className="text-3xl font-bold ">Total Balance: ₹{totalBalance}</h1>
      </div>

      <div  className=" flex justify-between p-4 rounded shadow mb-8 bg-white">
        <p className="text-green-600 font-semibold text-lg">Income: ₹{income}</p>
        <p className="text-red-600 font-semibold text-lg">Expense: ₹{expense}</p>
      </div>

        <div className="mb-2">
        <h2 className="text-2xl font-bold text-gray-800">Recent Transactions</h2>
        </div>

  <div className="p-6 sm:p-8 md:p-12">
  <div className="overflow-x-auto rounded-xl shadow-lg">
    <table className="w-full table-auto bg-white rounded-xl overflow-hidden">
      <thead className="bg-gray-100 text-[#333]">
        <tr>
          <th className="p-4 text-center min-w-[140px] font-semibold text-sm tracking-wide uppercase">Date</th>
          <th className="p-4 text-center min-w-[140px] font-semibold text-sm tracking-wide uppercase">Amount</th>
          <th className="p-4 text-center min-w-[140px] font-semibold text-sm tracking-wide uppercase">Category</th>
          <th className="p-4 text-center min-w-[140px] font-semibold text-sm tracking-wide uppercase">Type</th>
          <th className="p-4 text-center min-w-[180px] font-semibold text-sm tracking-wide uppercase">Note</th>
          <th className="p-4 text-center min-w-[180px] font-semibold text-sm tracking-wide uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {noData ?(
          <div className="text-center py-3">No data found</div>
        ):(
        transactions.map((transaction) => (
          <tr key={transaction._id} className="hover:bg-gray-50">
            <td className="p-4 text-center">{new Date(transaction.date).toLocaleDateString('en-US')}</td>
            <td className="p-4 text-center">₹{transaction.amount}</td>
            <td className="p-4 text-center">{transaction.category}</td>
            <td className="p-4 text-center">{transaction.type}</td>
            <td className="p-4 text-center">{transaction.note}</td>
            <td className="p-4 text-center">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => navigate("/add", { state: { transaction: transaction } })}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-500 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg shadow hover:bg-red-500 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
      </tbody>
    </table>
  </div>
</div>
    </div>
  )
}

export default AllTransactions