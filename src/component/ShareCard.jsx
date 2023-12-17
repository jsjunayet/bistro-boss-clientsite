import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthControl } from "../Auth/AuthProvider";
import UseAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import UseAxois from "../Hooks/UseAxois";
import UseCardItem from "../Hooks/UseCarditem/UseCardItem";

const ShareCard = ({ item }) => {
    const { price, name, image, recipe, _id } = item
    const { user } = UseAuth()
    const axiosSecure = UseAxois()
    const navigate = useNavigate()
    const [, refetch] = UseCardItem()

    const handleCard = (_id) => {
        const CardItem = { price, name, image, recipe, menuID: _id, email: user?.email }
        if (user && user.email) {
            axiosSecure.post('/card', CardItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your add to card",
                            showConfirmButton: true,
                            timer: 1500
                        });
                        refetch()
                    }
                })
        }
        else {
            Swal.fire({
                title: "Login?",
                text: "Please Login now and get the add to card!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            });
        }


    }
    return (
        <div>
            <div className="card  bg-base-100 shadow-xl">
                <img src={image} alt="Shoes" />
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-medium">Price : $ {price}</p>
                        <button onClick={() => handleCard(_id)} className="btn btn-outline text-[#BB8506] border-0 border-b-2 border-[#BB8506] hover:bg-black">add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareCard;