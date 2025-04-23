import { useEffect, useState } from "react"
import { createRegister, sendOtp, verifyOtp } from "../services/authApi"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () =>{

  const navigate = useNavigate();

  const [signupForm,setSignupForm] = useState({
    name: "",
    email: "",
    password: ""
  })
 
  
  const [otpSent,setOtpSent] = useState(false);
  const [otp,setOtp] = useState('')
  const [otpVerified,setOtpVerified] = useState(false)
  const [timeLeft,setTimeLeft] = useState(120)

  const handleSendOtp = async () => {
    try {
      if (!signupForm.email) {
        alert("Please enter email before sending OTP");
        return;
      }

      const res = await sendOtp({email: signupForm.email});
      alert(res.data.message);
      setOtpSent(true);
      startTimer()
    } catch (error) {
      alert(error.response?.data?.error || "Failed to send OTP");
    }
  }

  const startTimer = () =>{
    setTimeLeft(120);

    const interval = setInterval(()=>{
      setTimeLeft((prevTime)=>{
        if (prevTime<=1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime -1;
      });
    },1000)

  }

const handleResendOtp = () =>{
  handleSendOtp();
}

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp({email: signupForm.email,otp})
      alert(res.data.message);
      setOtpVerified(true)
    } catch (error) {
      alert(error.response?.data?.error || "Failed to verify OTP");
    }
  }

  
const {setUser} = useAuth()

  const handleChange = (e) =>{ 
    setSignupForm({...signupForm,[e.target.name]:e.target.value});       
  }                                                               //const { name, value } = e.target;
                                                                   //setSignupForm({ ...signupForm, [name]: value });

    const handleSubmit = async (e) =>{
    e.preventDefault()

    if (!otpVerified) {
      return alert("Please verify your email before registering!")
    }
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

        {!otpSent &&(
          <button className="bg-[#008080] hover:cursor-pointer text-white p-2 rounded  hover:bg-[#008080bb]"
          type="button"
          onClick={handleSendOtp}
          >Sent OTP</button>
        )}

       {otpSent && !otpVerified && (
       <>
         <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}
         className="w-full p-2 mb-4 border rounded"
         />

          <div className="space-y-3 mt-4">
          {timeLeft > 0 && <p className="text-gray-600">Time Left: {timeLeft}s</p>}
          <button disabled={timeLeft>0}
            onClick={handleResendOtp}
             type="button"
            className="w-full bg-[#008080] text-white p-2 rounded disabled:opacity-50 hover:cursor-pointer hover:bg-[#008080d3]"
            >Resend OTP</button>
        

         <button type="button" onClick={handleVerifyOtp} 
         className=" w-full bg-green-500 text-white p-2 rounded hover:cursor-pointer hover:bg-green-400">
          Verify OTP
          </button>
          </div>
        </>
        )}

        {otpVerified && (
          <>
          <span className="text-green-600 flex items-center gap-2">
            <FaCheckCircle />
            Email Verified</span>
          <input type="password" placeholder="Password" 
        name="password"
        className="w-full p-2 mb-4 border rounded" 
        value={signupForm.password}
        onChange={handleChange}
        required/>
        <button className="w-full bg-[#008080] text-white p-2 rounded " type="submit">
          Register
          </button>
          </>
          )}

          <p className="mt-4 text-sm text-center text-gray-600">
              Already registered?{" "}
            <Link to="/login" className="text-[#008080] font-medium hover:underline">
             Login here
            </Link>
         </p>

         
      </form>
    </div>
  )
}

export default Register