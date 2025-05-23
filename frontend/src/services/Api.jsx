import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export  const getTransactions = async () => {
 return await axios.get(`${API_URL}/transactions/get`,{
  withCredentials: true,
}) 
}

export const postTransactions = async (transactionData) => {
  return await axios.post(`${API_URL}/transactions/add`,transactionData,{
    withCredentials: true,
 })
}

export const deleteTransaction = async (id) => {
  return await axios.delete(`${API_URL}/transactions/delete/${id}`,{
    withCredentials: true,
 })
}

export const updateTransaction = async (id,transactionData) => {
  return await axios.put(`${API_URL}/transactions/edit/${id}`,transactionData,{
    withCredentials: true,
 })
}