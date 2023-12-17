import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { FaAd, FaHome } from "react-icons/fa";
import Title from "../../share/Title";
import { VscPreview } from "react-icons/vsc";
import { IoMenu } from "react-icons/io5";
import { IoIosContacts } from "react-icons/io";
import { FaBagShopping, FaBook, FaBreadSlice, FaCalendar, FaCartArrowDown, FaFileContract, FaPaypal, FaUser, FaUsers, FaUtensils } from "react-icons/fa6";
import UseCardItem from "../../Hooks/UseCarditem/UseCardItem";
import { document } from "postcss";
import UseAdmin from "../../Hooks/UseAdmin";


const Dashboard = () => {
    const location = useLocation()
    const page = location.pathname.includes('/dashboard/mycart')
    const [card] = UseCardItem()
    const [isAdmin] = UseAdmin()
    console.log(isAdmin);

    return (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-16">
            <div className=" h-full bg-[#D1A054] col-span-2">

                <div className=" space-y-4">
                    <div className="mt-10 mb-12 flex items-center justify-center flex-col">
                        <p className="text-3xl text-bold uppercase text-black ">BISTRO BOSS</p>
                        <p className="tracking-[.60em] uppercase text-black">Restaurant</p>
                    </div>
                    {
                        isAdmin ?
                            <>
                                <Link className="flex gap-2 items-center mx-5 md:mx-16 uppercase text-xl" to={'/dashboard/adminhome'}><FaHome /> Admin Home</Link>
                                <Link className="flex gap-2 mx-5 md:mx-16  items-center uppercase text-xl" to={'/dashboard/additems'}>< FaUtensils /> Add items</Link>
                                <Link className="flex gap-2 mx-5 md:mx-16  items-center uppercase text-xl" to={'/dashboard/mangeitem'}>< FaAd /> Manage Item</Link>
                                <Link className="flex gap-2 mx-5 md:mx-16  items-center uppercase text-xl" to={'/dashboard/booking'}>< FaBook /> manage booking</Link>
                                <Link className="flex gap-2 mx-5 md:mx-16  items-center uppercase text-xl" to={'/dashboard/allusers'}>< FaUsers /> All users</Link>

                            </>
                            :
                            <><Link className="flex gap-2 items-center mx-5 md:mx-16 uppercase text-xl" to={'/dashboard/userhome'}><FaHome /> User Home</Link>
                                <Link className="flex gap-2 mx-5 md:mx-16  items-center uppercase text-xl" to={'/dashboard/reservation'}>< FaCalendar /> reservation</Link>
                                <Link className="flex gap-2 mx-5 md:mx-16 items-center uppercase text-xl" to={'/dashboard/paymenthistory'}><FaPaypal /> payment history</Link>
                                <Link className="flex gap-2 mx-5 md:mx-16 items-center uppercase text-xl" to={'/dashboard/mycart'}><FaCartArrowDown /> my cart<div className="badge badge-secondary">{card.length}</div></Link>
                                <Link className="flex gap-2 mx-5 md:mx-16 items-center uppercase text-xl" to={'/dashboard/addreview'}><VscPreview /> add review</Link>
                                <Link className="flex gap-2 mx-5 md:mx-16 items-center uppercase text-xl" to={'/dashboard/mybooking'}><FaBook /> my booking</Link></>
                    }
                    <hr className="mx-5 md:mx-16 " />
                    {/* share nav link */}
                    <Link className="flex gap-2 mx-5 md:mx-16 items-center uppercase text-xl" to={'/'}><FaHome /> Home</Link>
                    <Link className="flex gap-2 mx-5 md:mx-16 items-center uppercase text-xl" to={'/menu'}><IoMenu /> menu</Link>
                    <Link className="flex gap-2 mx-5 md:mx-16 items-center uppercase text-xl" to={'/shop'}><FaBagShopping /> shop</Link>
                    <Link className="flex gap-2 mx-5 md:mx-16 items-center uppercase text-xl" to={'/contact'}><IoIosContacts /> contact</Link>
                </div>

            </div>
            <div className=" col-span-5">

                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;