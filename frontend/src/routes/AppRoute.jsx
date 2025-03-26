import { BrowserRouter as Router , Routes,Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../pages/Home"
import AddExpensePage from "../pages/AddExpensePage"
const AppRoutes = () =>{
  return(

  <Router>
  <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/add" element={<AddExpensePage/>}></Route>
    </Routes>
  </Router>

  )
}
export default AppRoutes