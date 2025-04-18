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
   return await axios.get(`${API_URL}/user/me`,{
      withCredentials: true,
   })
}

export const logoutUser = async () => {
   try {
      await axios.post(`${API_URL}/auth/logout`,{},{
         withCredentials: true
      })
   } catch (error) {
      console.log(error);
   }
}

export const sendOtp = async (emailData) => {
   return await axios.post(`${API_URL}/user/send-otp`,emailData
)
}

export const verifyOtp = async ({email,otp}) => {
   return await axios.post(`${API_URL}/user/verify-otp`,{email,otp}
)
}