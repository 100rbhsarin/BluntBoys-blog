import axios from "../axioss/axios"
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});



export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser,auth, setAuth] = useState({});

    useState(JSON.parse(localStorage.getItem("username")) || null);

    useEffect(() => {
        localStorage.setItem("username", JSON.stringify(currentUser));
      }, [currentUser]);


      const logout = async (inputs) => {
        await axios.post("/auth/logout");
        setCurrentUser(null);
      };




    return (
        <AuthContext.Provider value={{auth, setAuth,currentUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;