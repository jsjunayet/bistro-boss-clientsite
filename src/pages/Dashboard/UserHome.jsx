import { useQuery } from "@tanstack/react-query";
import Title from "../../share/Title";
import UseAuth from "../../Hooks/UseAuth";
import { axiosSecure } from "../../Hooks/UseAxois";
import { MdOutlineReviews } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaCalendar, FaStripe } from "react-icons/fa6";
import UsePayment from "../../Hooks/UsePayment";
import UseCardItem from "../../Hooks/UseCarditem/UseCardItem";


const UserHome = () => {
    const { user } = UseAuth()
    const { data: selfuser = {} } = useQuery({
        queryKey: ['myemail', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/selfuser?email=${user?.email}`)
            return res.data

        }
    })
    const [paymentuser] = UsePayment()
    const [card] = UseCardItem()
    console.log(selfuser)
    return (
        <div>
            <div className="my-10">

                <Title heading="---HOME---" paragraph="Hi, Welcome Back!"></Title>

            </div>
            <div>

            </div>
            <div className="flex">
                <div className="w-1/2 bg-[#FFEDD5] h-96 flex flex-col justify-center items-center">
                    <div className=" space-y-3">
                        <img src={selfuser?.img} className="w-40 h-40 rounded-full mx-auto" alt="" />
                        <p className="text-2xl font-semibold text-center">{selfuser?.name}</p>
                        <p className="text-xl">{selfuser?.email}</p>

                    </div>
                </div>
                <div className="w-1/2 bg-[#FEF9C3] flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-semibold mb-4">Your Activities</h1>
                    <div className=" space-y-3">
                        <p className="text-xl font-medium flex items-center gap-2 text-[#0088FE]"><FaShoppingCart className="text-2xl" /> Orders: {card.length} </p>
                        <p className="text-xl font-medium flex items-center gap-2 text-[#00C4A1]"><MdOutlineReviews className="text-2xl" /> Reviews: 0</p>
                        <p className="text-xl font-medium flex items-center gap-2 text-[#FFBB28]"> <FaCalendar className="text-2xl"></FaCalendar> Bookings: 0</p>
                        <p className="text-xl font-medium flex items-center gap-2 text-[#FF8042]"> <FaStripe className="text-2xl"></FaStripe> Payment: {paymentuser.length}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserHome;