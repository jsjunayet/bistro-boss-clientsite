import { Navigate } from "react-router-dom"
import UseAdmin from "../../../Hooks/UseAdmin"
import Loader from "../../../component/Loader"

const AdminRoutes = ({ children }) => {
    const [isAdmin, sAdminloading] = UseAdmin()
    console.log(isAdmin);
    if (sAdminloading) {
        return <Loader></Loader>
    }

    if (isAdmin === "false") {
        return children
    }
    return <Navigate to={'/dashboard'}></Navigate>
}
export default AdminRoutes