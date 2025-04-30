import { useEffect, useState } from "react";
import { googleLogin, loginUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const Login = () =>{
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
  
    script.onload = () => {
     
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleLoginBtn"),
        { theme: "outline", size: "large" }
      );
    };
  
    script.onerror = () => {
      console.error("❌ Failed to load Google script");
    };
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script); // cleanup
    };
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      
      const tokenId = response.credential;
      const data = await googleLogin(tokenId)

      setUser(data);
      alert(data.message);
      navigate("/add")
    } catch (error) {
      console.error(error);
    alert(error.response?.data?.error || "Google login failed");
    }
  }

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

      <button className="w-full bg-[#008080] text-white p-2 rounded hover:cursor-pointer hover:bg-[#008080bb]" type="submit ">
        Login
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">Or login with Google</p>
        <div id="googleLoginBtn" className="flex justify-center"></div>
     </div>

      <p className="mt-4 text-center text-sm text-gray-600">
      Don't have an account?{" "}
      <Link to="/signup" className="text-[#008080] font-medium hover:underline">
        Sign up
      </Link>
    </p>
    </form>
  </div>
  )
}

export default Login;