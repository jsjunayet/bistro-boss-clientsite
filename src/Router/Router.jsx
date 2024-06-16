import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Contact from "../pages/contact/Contact";
import Menu from "../pages/Menu/Menu";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import Reservation from "../pages/Dashboard/Reservation";
import Payment from "../pages/Dashboard/Payment";
import MyCard from "../pages/Dashboard/MyCard";

import Booking from "../pages/Dashboard/Booking";
import UserReview from "../pages/Dashboard/UserReview";
import UserHome from "../pages/Dashboard/UserHome";
import Allusers from "../pages/Dashboard/Admin/Allusers";
import Additem from "../pages/Dashboard/Admin/Additem";
import ManageItem from "../pages/Dashboard/Admin/ManageItem";
import UpdateItem from "../pages/Dashboard/Admin/UpdateItem";
import AdminRoute from "../pages/Dashboard/AdminRoute";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome";
import MangeBoking from "../pages/Dashboard/Admin/MangeBoking";
import AdminRoutes from "../pages/Dashboard/Admin/AdminRoutes";
import Card from "../pages/Card/Card";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/shop/:category',
                element: <Shop></Shop>
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: '/card',
                element: <Card></Card>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }


        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/userhome',
                element: <UserHome></UserHome>
            },

            {
                path: '/dashboard/reservation',
                element: <Reservation></Reservation>
            },
            {
                path: '/dashboard/payment',
                element: <Payment></Payment>
            },
            {
                path: '/dashboard/paymenthistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: '/dashboard/mycart',
                element: <MyCard></MyCard>
            },
            {
                path: '/dashboard/addreview',
                element: <UserReview></UserReview>
            },
            {
                path: '/dashboard/mybooking',
                element: <Booking></Booking>
            },
            // adimin routes
            {
                path: '/dashboard/adminhome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><Allusers></Allusers></AdminRoute>
            },
            {
                path: '/dashboard/additems',
                element: <AdminRoute><Additem></Additem></AdminRoute>
            },

            {
                path: '/dashboard/mangeitem',
                element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
            },
            {
                path: '/dashboard/update/:id',
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
            {
                path: 'dashboard/booking',
                element: <MangeBoking></MangeBoking>
            }
        ]
    }
]);

export default Router;