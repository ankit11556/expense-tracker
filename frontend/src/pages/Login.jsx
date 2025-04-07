import { useState } from "react";
import { loginUser } from "../services/authApi";

const Login = () =>{
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit= async (e) => {
    e.preventDefault();
   try {
    const response = await loginUser(user)
    alert(response.data.message)
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
        value={user.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={user.password}
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