import { useState } from "react"
import { createRegister } from "../services/authApi"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

const Register = () =>{

  const navigate = useNavigate();

  const [signupForm,setSignupForm] = useState({
    name: "",
    email: "",
    password: ""
  })
const {setUser} = useAuth()
  const handleChange = (e) =>{ 
    setSignupForm({...signupForm,[e.target.name]:e.target.value});       
  }                                                               //const { name, value } = e.target;
                                                                   //setSignupForm({ ...signupForm, [name]: value });

    const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const response = await createRegister(signupForm)
      setUser(response.data)
      alert(response.data.message)
      navigate("/add")
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input type="text" placeholder="Name" 
        name="name"
        value={signupForm.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded" 
        required
        />

        <input type="text" placeholder="Email" 
         name="email"
        value={signupForm.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded" 
        required 
        />

        <input type="password" placeholder="Password" 
        name="password"
        className="w-full p-2 mb-4 border rounded" 
        value={signupForm.password}
        onChange={handleChange}
        required/>

        <button className="w-full bg-[#008080] text-white p-2 rounded " type="submit">
          Register
          </button>
      </form>
    </div>
  )
}

export default Register