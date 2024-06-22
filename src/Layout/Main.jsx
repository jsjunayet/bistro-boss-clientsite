import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Footer";
import Navbar from "../component/navbar/Navbar";

const Main = () => {
    const location = useLocation()
    const navbarFotter = location.pathname.includes('/login') || location.pathname.includes('/signup')

    return (
        <div>
            {
                navbarFotter || <Navbar></Navbar>
            }

            <Outlet></Outlet>
            {
                navbarFotter || <Footer></Footer>
            }
        </div>
    );
};

export default Main;