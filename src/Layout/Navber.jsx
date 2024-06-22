
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import UseCardItem from "../Hooks/UseCarditem/UseCardItem";
import { FaCartShopping } from "react-icons/fa6";
import img from '../../src/assets/image/assets/home/placeholder.jpg'
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../Hooks/UseAxois";

const Navber = ({ Children }) => {
    const { user, logOut, tranID:tran_id } = UseAuth();
    const { data: selfuser = {} } = useQuery({
        queryKey: ['myemail', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/selfuser?email=${user?.email}`)
            return res.data

        }
    })
    console.log(selfuser)
    const [card] = UseCardItem()
    const handlesingout = () => {
        logOut()
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const navlink =
        <>
            <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? " border-b-2 border-gray-400" : ""
                }
            >
                Home
            </NavLink>
           {
            user &&  <NavLink
            to="/profile"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " border-b-2 border-gray-400" : ""
            }
        >
            Profile
            </NavLink>
           }
           {
            selfuser.role === "admin" &&  <NavLink
            to="/dashboard"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " border-b-2 border-gray-400" : ""
            }
        >
            dashboard
        </NavLink>
           }
            <Link>
                <Link to={'/card'} className=" flex items-center">
                    <FaCartShopping className="text-3xl text-whie" />
                    <div className="badge badge-secondary">{card.length}</div>
                </Link>
            </Link>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        {
                            user ? <img src={user?.photoURL} /> : <img src={img} alt="" />
                        }

                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] text-black p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60">

                    <li>
                        <a className="justify-between">
                            {
                                user ? user.displayName : 'Name'
                            }
                            <span className="badge">{card.length}</span>
                        </a>
                    </li>

                    {
                        user?.email ? <li>
                            <Link onClick={handlesingout} >LogOut</Link> </li> :
                            <li><NavLink to="/login"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? " border-b-2 border-gray-400" : ""
                                }
                            >Login </NavLink></li>
                    }
                </ul>
            </div>


        </>
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content fixed z-40 w-full bg-[#15151599] opacity-100 flex flex-col">
                {/* Navbar */}
                <div className="navbar  max-w-7xl mx-auto">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <div>
                            <p className="text-3xl text-bold uppercase text-white ">BISTRO BOSS</p>
                            <p className="tracking-[.55em] uppercase text-white">Restaurant</p>
                        </div>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu uppercase flex gap-5 items-center menu-horizontal text-white">
                            {/* Navbar menu content here */}
                            {navlink}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                {Children}
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu flex flex-col items-center  gap-2 uppercase  w-60 min-h-full bg-gray-900 text-white text-xl">
                    {/* Sidebar content here */}
                    {navlink}
                </ul>
            </div>
        </div>
    );
};

export default Navber;