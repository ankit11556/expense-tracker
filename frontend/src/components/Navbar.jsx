import {Link} from "react-router-dom"
import { useAuth } from "../context/AuthContext"
const Navbar = () =>{
  const {user} = useAuth()
  return(
<nav className="bg-[#008080] text-[#F5F5DC] p-4 flex justify-between itmes-center">
<h1 className="text-2xl font-bold">Expense Tracker</h1>

<ul className="flex gap-4 text-lg font-serif font-normal">
  
    <li className="hover:bg-[#006666] p-2 rounded">
      <Link to="/">Home</Link>
    </li>

    <li className="hover:bg-[#006666] p-2 rounded">
      <Link to="/add">Add Expense</Link>
    </li>

    <li className="hover:bg-[#006666] p-2 rounded">
      <Link to="/all-transactions">All Transactions</Link>
    </li>

    <li className="hover:bg-[#006666] p-2 rounded">
      <Link to="/total">Total Balance</Link>
    </li>
  </ul>

<div className="gap-4 flex">
  <button><Link to="/signup">SignUp</Link></button>
  {user ? (
        <button>Logout</button>
      ) : (
        <button to="/login">Login</button>
      )}
</div>
</nav>
  )
}

export default Navbar