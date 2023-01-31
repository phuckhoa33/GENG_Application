import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoutes = ({auth}) => {
    return (auth ? <Outlet/> : <Navigate to='/login'/>)
}