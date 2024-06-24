import { FaAd, FaHome } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { IoMenu } from "react-icons/io5";
import { IoIosContacts } from "react-icons/io";
import { FaBagShopping, FaBook, FaCalendar, FaCartArrowDown, FaPaypal, FaUsers, FaUtensils } from "react-icons/fa6";
import UseCardItem from "../../Hooks/UseCarditem/UseCardItem";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import UseAdmin from "../../Hooks/UseAdmin";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();
    const page = location.pathname.includes('/dashboard/mycart');
    const [card] = UseCardItem();
    const [isAdmin] = UseAdmin();
    console.log(isAdmin);

    const navLinkClass = ({ isActive }) =>
        `flex gap-2 items-center mx-4 rounded uppercase text-base ${isActive ? ' bg-red-700 p-1' : ''}`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            <div className="min-h-screen bg-[#2c3e50] text-white col-span-1">
                <div className="space-y-3">
                    <div className="flex items-center justify-center flex-col">
                        <p className="text-lg font-semibold mt-4 italic">JUNAYET | RESTAURANT</p>
                    </div>
                    <hr />
                    {isAdmin ? (
                        <>
                            <NavLink className={navLinkClass} to="/dashboard/adminhome"><FaHome /> Admin Home</NavLink>
                            <NavLink className={navLinkClass} to="/dashboard/additems"><FaUtensils /> Add items</NavLink>
                            <NavLink className={navLinkClass} to="/dashboard/mangeitem"><FaAd /> Manage Item</NavLink>
                            <NavLink className={navLinkClass} to="/dashboard/booking"><FaBook /> Manage Booking</NavLink>
                            <NavLink className={navLinkClass} to="/dashboard/allusers"><FaUsers /> All Users</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className={navLinkClass} to="/dashboard/userhome"><FaHome /> User Home</NavLink>
                            <NavLink className={navLinkClass} to="/dashboard/reservation"><FaCalendar /> Reservation</NavLink>
                            <NavLink className={navLinkClass} to="/dashboard/paymenthistory"><FaPaypal /> Payment History</NavLink>
                            <NavLink className={navLinkClass} to="/dashboard/mycart"><FaCartArrowDown /> My Cart<div className="badge badge-secondary">{card.length}</div></NavLink>
                            <NavLink className={navLinkClass} to="/dashboard/addreview"><VscPreview /> Add Review</NavLink>
                            <NavLink className={navLinkClass} to="/dashboard/mybooking"><FaBook /> My Booking</NavLink>
                        </>
                    )}
                    <hr className="mx-5" />
                    <p className="title mx-5">USEFUL</p>
                    <NavLink className={navLinkClass} to="/dashboard/stats"><InsertChartIcon /> Stats</NavLink>
                    <NavLink className={navLinkClass} to="/dashboard/notifications"><NotificationsNoneIcon /> Notifications</NavLink>
                    <NavLink className={navLinkClass} to="/dashboard/settings"><SettingsApplicationsIcon /> Setting</NavLink>
                    <hr className="mx-5" />
                    <p className="title mx-5">USER</p>
                    <NavLink className={navLinkClass} to="/"><FaHome /> Home</NavLink>
                    <NavLink className={navLinkClass} to="/menu"><IoMenu /> Menu</NavLink>
                    <NavLink className={navLinkClass} to="/shop"><FaBagShopping /> Shop</NavLink>
                    <NavLink className={navLinkClass} to="/contact"><IoIosContacts /> Contact</NavLink>
                </div>
            </div>
            <div className="col-span-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
