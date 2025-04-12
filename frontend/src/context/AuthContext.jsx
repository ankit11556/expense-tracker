import { useContext } from "react";
import { createContext, useState,useEffect }  from "react";
import { getCurrentUser } from "../services/authApi";
const AuthContext = createContext();

export const AuthProvider = ({children})=>{
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

return(
  <AuthContext.Provider value={{user,setUser}}>
    {children}
  </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)