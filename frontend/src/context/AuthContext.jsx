import { useContext } from "react";
import { createContext, useState,useEffect }  from "react";
import { getCurrentUser, logoutUser } from "../services/authApi";
import {useNavigate} from "react-router-dom"

const AuthContext = createContext();

export const AuthProvider = ({children})=>{

  const navigate = useNavigate()

  const [user,setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const logout = () =>{
    setUser(null)

   logoutUser()

   navigate("/login")
  }

return(
  <AuthContext.Provider value={{user,setUser,logout}}>
    {children}
  </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)