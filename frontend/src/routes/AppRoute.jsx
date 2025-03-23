import { BrowserRouter as Router , Routes,Route, BrowserRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
const AppRoutes = () =>{
  return(
<BrowserRouter>
  <Navbar></Navbar>
</BrowserRouter>
  )
}
export default AppRoutes