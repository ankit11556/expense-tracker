import { BrowserRouter as Router , Routes,Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import AllTransactions from "../pages/AllTransactions"
import AddExpensePage from "../pages/AddExpensePage"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Home from "../pages/Home"
const AppRoutes = () =>{
  return(

  <Router>
  <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/all-transactions" element={< AllTransactions/>} ></Route>
      <Route path="/add" element={<AddExpensePage/>}></Route>
      <Route path="/signup" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
  </Router>

  )
}
export default AppRoutes