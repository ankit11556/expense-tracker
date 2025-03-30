import { useEffect, useState } from "react"
import { getTransactions } from "../services/Api"

const Home = () =>{
  const [transactions,setTransactions] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await getTransactions()
      setTransactions(response.data);
      console.log(response.data);
      console.log(response);
      
    } catch (error) {
      console.log(response.message);
      
    }
  }
  
  useEffect(()=>{
  fetchData()
  },[])

  const income = transactions
  .filter((transaction)=>transaction.type == 'income')
  .reduce((acc,transaction) => acc + transaction.amount,0)

  const expense = transactions
  .filter((transaction)=> transaction.type == 'expense')
  .reduce((acc,transaction)=> acc + transaction.amount,0)
  
  const totalBalance = income - expense;
  return(
    <div className="min-h-screen p-8 bg-gray-100">
      <div  className="mb-8">
        <h1 className="text-3xl font-bold">Total Balance: ₹{totalBalance}</h1>
      </div>
      <div  className="mt-4 flex justify-between">
        <p className="text-green-600 font-semibold">Income: ₹{income}</p>
        <p className="text-red-600 font-semibold">Expense: ₹{expense}</p>
      </div>

        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4">Date</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Category</th>
            <th className="p-4">Type</th>
          </tr>
        </thead>
        <tbody>
      {transactions.map((transaction)=>(
         <tr key={transaction._id} className="border-b">
          <td  className="p-4">{new Date().toLocaleDateString()}</td>
          <td  className="p-4">₹{transaction.amount}</td>
          <td  className="p-4">{transaction.category}</td>
          <td  className="p-4">{transaction.type}</td>
        </tr>
     ) )}
     </tbody>
      </table>
    </div>
  )
}

export default Home