import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from '../hook/useAuth';


const RequireAuth = () =>{
    const {auth} = useAuth()
    const location = useLocation()

    return (
        auth?.Admin
        ?<Outlet/>
        : <Navigate to ="/login" state ={{ from : location}} replace /> 
    )

}
export default RequireAuth