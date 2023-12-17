import { Outlet, useLocation } from "react-router-dom";
import Navber from "./Navber";
import Footer from "../pages/Footer";

const Main = () => {
    const location = useLocation()
    const navbarFotter = location.pathname.includes('/login') || location.pathname.includes('/signup')

    return (
        <div>
            {
                navbarFotter || <Navber></Navber>
            }

            <Outlet></Outlet>
            {
                navbarFotter || <Footer></Footer>
            }
        </div>
    );
};

export default Main;