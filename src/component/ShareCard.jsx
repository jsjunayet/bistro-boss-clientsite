import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import UseAxois from "../Hooks/UseAxois";
import UseCardItem from "../Hooks/UseCarditem/UseCardItem";

const ShareCard = ({ item }) => {
    const { price, name, image, recipe, _id } = item;
    const { user } = UseAuth();
    const axiosSecure = UseAxois();
    const navigate = useNavigate();
    const [, refetch] = UseCardItem();

    const handleCard = (_id) => {
        const CardItem = { price, name, image, recipe, menuID: _id, email: user?.email };
        if (user && user.email) {
            axiosSecure.post('/card', CardItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            toast: true,
                            position: "top-end", // or any position you prefer
                            icon: "success",
                            title: "Item added to cart",
                            showConfirmButton: false,
                            timer: 1500, // Lowered timer for faster notification
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        });
                        refetch();
                    }
                });
        } else {
            Swal.fire({
                title: "Login?",
                text: "Please login to add items to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        }
    };

    return (
        <div className="card mx-2 mt-2 md:mt-0  md:mx-0 bg-base-100 shadow-xl flex flex-col md:h-[500px]">
            <div className="overflow-hidden md:h-2/3">
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="card-body p-4 flex flex-col justify-between md:h-1/3">
                <h2 className="card-title text-lg font-semibold">{name}</h2>
                <p className="text-gray-700">{recipe}</p>
                <div className="flex justify-between items-center mt-auto">
                    <p className="text-xl font-medium">Price: ${price}</p>
                    <button onClick={() => handleCard(_id)} className="btn btn-outline text-red-700 border-0 border-b-2 border-red-700 hover:bg-black">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareCard;
