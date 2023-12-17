import { useContext } from "react";
import { AuthControl } from "../Auth/AuthProvider";


const UseAuth = () => {
    const auth = useContext(AuthControl)
    return auth
};

export default UseAuth;