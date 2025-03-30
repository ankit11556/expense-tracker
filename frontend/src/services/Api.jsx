import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export  const getTransactions = async () => {
  const response = await axios.get(`${API_URL}/get`) 
  return response
}