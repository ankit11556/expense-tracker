import {Link} from "react-router-dom"
import { useAuth } from "../context/AuthContext"
const Navbar = () =>{
  const {user,logout} = useAuth()
  return(
<nav className="bg-[#008080] text-[#F5F5DC] p-6 flex justify-between itmes-center shadow-md">
<h1 className="text-2xl font-bold font-sans">Expense Tracker</h1>

<ul className="flex gap-4 text-lg font-serif font-normal">
    <li className="hover:bg-[#006666] px-3 py-2 rounded transition-colors duration-200">
      <Link to="/">Home</Link>
    </li>

    <li className="hover:bg-[#006666] px-3 py-2 rounded transition-colors duration-200">
      <Link to="/add">Add Transaction</Link>
    </li>

    <li className="hover:bg-[#006666] px-3 py-2 rounded transition-colors duration-200">
      <Link to="/all-transactions">All Transactions</Link>
    </li>

    <li className="hover:bg-[#006666] px-3 py-2 rounded transition-colors duration-200">
      <Link to="/total">Total Balance</Link>
    </li>
  </ul>

<div className="gap-4 flex">
  <button><Link to="/signup"
  className="bg-white text-[#008080] font-semibold px-4 py-2 rounded shadow-md hover:bg-[#e0e0e0] transition duration-200"
  >SignUp</Link></button>
  {user ? (
        <button onClick={logout}
        className="bg-red-500 text-white font-semibold px-4 py-2 rounded shadow-md hover:bg-red-600 transition duration-200"
        >Logout</button>
      ) : (
        <button ><Link to="/login"
          className="bg-white text-[#008080] font-semibold px-4 py-2 rounded shadow-md hover:bg-[#e0e0e0] transition duration-200"
        >Login</Link></button>
      )}
</div>
</nav>
  )
}

export default Navbar