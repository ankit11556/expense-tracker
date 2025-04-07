import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const createRegister = async (userData) => {
   return await axios.post(`${API_URL}/auth/register`,userData)
}

export const loginUser = async(userData) =>{
return await axios.post(`${API_URL}/auth/login`,userData,{
   withCredentials: true
})

}