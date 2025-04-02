import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export  const getTransactions = async () => {
 return await axios.get(`${API_URL}/get`) 
}

export const postTransactions = async (transactionData) => {
  return await axios.post(`${API_URL}/add`,transactionData)
}

export const deleteTransaction = async (id) => {
  return await axios.delete(`${API_URL}/delete/${id}`)
}

export const updateTransaction = async (id,transactionData) => {
  return await axios.put(`${API_URL}/edit/${id}`,transactionData)
}