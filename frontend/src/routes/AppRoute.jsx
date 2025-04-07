import { BrowserRouter as Router , Routes,Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../pages/Home"
import AddExpensePage from "../pages/AddExpensePage"
import Register from "../pages/Register"
import Login from "../pages/Login"
const AppRoutes = () =>{
  return(

  <Router>
  <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/add" element={<AddExpensePage/>}></Route>
      <Route path="/signup" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
  </Router>

  )
}
export default AppRoutes