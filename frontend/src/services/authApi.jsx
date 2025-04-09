import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const createRegister = async (userData) => {
   return await axios.post(`${API_URL}/auth/register`,userData,{
      withCredentials: true
   })
}

export const loginUser = async(userData) =>{
return await axios.post(`${API_URL}/auth/login`,userData,{
   withCredentials: true
})
}

export const getCurrentUser = async () => {
   return await axios.get(`${API_URL/user/me}`,{
      withCredentials: true,
   })
}