import { FaAd, FaHome } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { IoMenu } from "react-icons/io5";
import { IoIosContacts } from "react-icons/io";
import { FaBagShopping, FaBook, FaCalendar, FaCartArrowDown, FaPaypal, FaUsers, FaUtensils } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";

import UseAdmin from "../../Hooks/UseAdmin";
import { IoMdLogOut } from "react-icons/io";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import UseCardItem from "../../Hooks/UseCarditem/UseCardItem";

const Dashboard = () => {
    const location = useLocation();
    const page = location.pathname.includes('/dashboard/mycart');
    const [card] = UseCardItem();
    const [isAdmin] = UseAdmin();
    const { user, logOut } = UseAuth();
    const handlesingout = () => {
        logOut()
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };
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
                    <button className="flex hover:text-red-700 gap-2 items-center mx-4 rounded uppercase text-base"><IoStatsChartSharp/> Stats</button>
                    <button className="flex hover:text-red-700 gap-2 items-center mx-4 rounded uppercase text-base"><IoIosNotifications /> Notifications</button>
                    <button className="flex hover:text-red-700 gap-2 items-center mx-4 rounded uppercase text-base"><IoSettingsOutline /> Setting</button>
                    <hr className="mx-5" />
                    <p className="title mx-5">USER</p>
                    <NavLink className={navLinkClass} to="/"><FaHome /> Home</NavLink>
                    <NavLink className={navLinkClass} to="/profile"><IoMenu /> Profile</NavLink>
                    <NavLink className={navLinkClass} to="/card"><FaBagShopping />Card</NavLink>
                    <hr className="mx-5" />
                    <button onClick={handlesingout} className="flex hover:text-red-700 gap-2 items-center mx-4 rounded uppercase text-base"><IoMdLogOut />Logout</button>
                </div>
            </div>
            <div className="col-span-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
