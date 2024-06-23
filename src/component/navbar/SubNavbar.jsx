import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { IoIosHome, IoMdSpeedometer, IoMdPerson } from "react-icons/io";
import img from '../../../src/assets/image/assets/home/placeholder.jpg';
import UseAuth from "../../Hooks/UseAuth";
import UseCardItem from "../../Hooks/UseCarditem/UseCardItem";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hooks/UseAxois";
import { FaCartShopping } from "react-icons/fa6";
import TopBar from "./TopBar"; // Import the TopBar component

const SubNavbar = () => {
    const { user, logOut } = UseAuth();
    const { data: selfuser = {} } = useQuery({
        queryKey: ['myemail', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/selfuser?email=${user?.email}`)
            return res.data
        }
    });
    const [card] = UseCardItem();
    const handlesingout = () => {
        logOut()
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const Links = [
        {
            id: 1,
            path: "/",
            title: "Home",
            icon: <IoIosHome />,
        },
        user && {
            id: 2,
            path: "/profile",
            title: "Profile",
            icon: <IoMdPerson />,
        },
        user && user.role === "admin" && {
            id: 3,
            path: "/dashbaord",
            title: "Dashboard",
            icon: <IoMdSpeedometer />
        }
    ].filter(Boolean);
    const [open, setOpen] = useState(false);
    const controls = useAnimation();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingDown = currentScrollPos > prevScrollPos;

            const threshold = 78;

            if (isScrollingDown && currentScrollPos > threshold) {
                controls.start({ opacity: 0, y: -50 });
            } else {
                controls.start({ opacity: 1, y: 0 });
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos, controls]);

    const closeMenu = () => setOpen(false);

    return (
        <>
            <TopBar /> {/* Include the TopBar component here */}
            <motion.nav
            className={`fixed ${prevScrollPos==0?"top-8":"top-0"} left-0 w-full z-50 ${open ? "bg-black" : "bg-red-700"} shadow-lg`}
                animate={controls}
                initial={{ opacity: 1, y: 0 }}
            >
                <div className="max-w-[1180px] mx-auto py-0 flex flex-col md:flex-row justify-between items-center">
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/"
                            className="font-bold mr-5 md:text-2xl text-base  flex items-center font-[Poppins] text-white"
                        >
                            <span className="text-3xl text-indigo-600 mr-2">
                                <ion-icon name="logo-ionic"></ion-icon>
                            </span>
                            JUNAYET | <span className={`ml-1`}>RESTAURANT</span>
                        </Link>
                        <div className="md:hidden flex justify-center items-center gap-2 ml-2">
                            <Link to={'/card'} className="flex items-center">
                                <FaCartShopping className="text-xl text-white" />
                                <div className="badge badge-sm badge-secondary">{card.length}</div>
                            </Link>
                            <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-6 rounded-full">
                                    {user ? <img src={user?.photoURL} /> : <img src={img} alt="" />}
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] text-black p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60">
                                <li>
                                    <a className="justify-between">
                                        {user ? user?.displayName : 'Name'}
                                        <span className="badge">{card.length}</span>
                                    </a>
                                </li>
                                {user?.email ? (
                                    <li>
                                        <Link onClick={handlesingout}>LogOut</Link>
                                    </li>
                                ) : (
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? " border-b-2 border-gray-400" : ""
                                            }
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                            <motion.div
                                onClick={() => setOpen(!open)}
                                className="text-3xl cursor-pointer transition-transform duration-300 transform"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {open ? (
                                    <FiX onClick={closeMenu} className="text-2xl text-white" />
                                ) : (
                                    <FiMenu className="text-2xl text-white" />
                                )}
                            </motion.div>
                        </div>
                    </motion.div>

                    <ul
                        className={`md:flex md:items-center md:space-x-6 md:pb-0 pb-3 ${open ? "block" : "hidden md:block"}`}
                    >
                        {Links.map((link) => (
                            <motion.li
                                key={link.name}
                                className="md:my-0 my-2"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <NavLink href={link.path} icon={link.icon} title={link.title} />
                            </motion.li>
                        ))}
                        <Link>
                           <div className=" hidden md:block">
                           <Link to={'/card'} className="flex items-center">
                                <FaCartShopping className="text-xl text-white" />
                                <div className="badge badge-sm badge-secondary">{card.length}</div>
                            </Link>
                           </div>
                        </Link>
                        <div className="dropdown dropdown-end md:block hidden">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-6 rounded-full">
                                    {user ? <img src={user?.photoURL} /> : <img src={img} alt="" />}
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] text-black p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60">
                                <li>
                                    <a className="justify-between">
                                        {user ? user?.displayName : 'Name'}
                                        <span className="badge">{card.length}</span>
                                    </a>
                                </li>
                                {user?.email ? (
                                    <li>
                                        <Link onClick={handlesingout}>LogOut</Link>
                                    </li>
                                ) : (
                                <li><Link to={"/login"}>Login</Link></li>
                                )}
                            </ul>
                        </div>
                    </ul>
                </div>
            </motion.nav>
        </>
    );
};

export default SubNavbar;
