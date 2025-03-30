import { useEffect } from "react"
import { getTransactions } from "../services/Api"

const Home = () =>{
  const fetchData = async () => {
    try {
      const response = await getTransactions()
      console.log(response.data);
    } catch (error) {
      console.log(response.message);
      
    }
  }
  
  useEffect(()=>{
  fetchData()
  },[])
  
  return(
    <h1>Home</h1>
  )
}

export default Home