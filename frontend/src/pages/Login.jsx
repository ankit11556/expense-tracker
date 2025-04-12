import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () =>{
  const navigate = useNavigate()
  const [form, setform] = useState({
    email: "",
    password: ""
  });
   const {setUser} = useAuth();
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit= async (e) => {
    e.preventDefault();
   try {
    const response = await loginUser(form)
    setUser(response.data)
    alert(response.data.message)
    navigate("/add")
   } catch (error) {
    alert(error.response?.data?.error || "Login failed");
   }
  }
  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <button className="w-full bg-[#008080] text-white p-2 rounded" type="submit">
        Login
      </button>
      
    </form>
  </div>
  )
}

export default Login;