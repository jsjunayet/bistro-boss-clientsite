import { useState } from "react";
import UseCardItem from "../../Hooks/UseCarditem/UseCardItem";
import { Link } from 'react-router-dom';
import UseAuth from "../../Hooks/UseAuth";
import { FaTrash } from "react-icons/fa";
import UseAxois from "../../Hooks/UseAxois";
import Swal from "sweetalert2";
import axios from "axios";

const Cart = () => {
  const {user}=UseAuth()
  const axiosSecure = UseAxois()
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [card, refetch] = UseCardItem();
  const handledelte = (_id) => {
    console.log(_id)
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/card/${_id}`)
                .then(res => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch()
                })
        }
    });
}


  // Function to calculate total price
  const totalPrice = card.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const itemNames = card.map(item => item.name).join(', ');
    
    const Cards = {name, phone,address, date: new Date(), category: card.map(item => item?.name), postalCode, email:user.email,itemNames,cardId: card.map(item => item?._id),
      menuID: card.map(item => item.menuID),
      status: 'pending', price:totalPrice}
    const res = await axios.post(`http://localhost:5000/order`,Cards);
    window.location.replace(res.data.url)
  };

  // Render if cart is empty
  if (card.length === 0) {
    return <div className="container mx-auto mt-10 p-5  h-screen flex justify-center items-center shadow-lg">Your cart is empty. Please add items from our menu.</div>;
  }

  // Render cart and checkout form
  return (
    <div className=" bg-white">
      <div className={`container mx-auto grid ${card.length <= 3 ? "" : "md:grid-cols-8 grid-cols-1"} gap-5 mt-10 p-5 `}>
        <div className={`${card.length <= 3 ? "" : "col-span-5"}`}>
          <h1 className="text-3xl font-bold mb-6 pt-3">Add Cart</h1>
          <div className={`grid gap-3 mb-6 ${card.length === 1 ? "grid-cols-1" : "md:grid-cols-2 grid-cols-1"}`}>
            {card.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-100 p-5 rounded">
                <div className="flex items-center">
                  <img className="w-20 h-20 object-cover mr-4" src={item.image} alt={item.name} />
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-gray-700">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
                <button onClick={() => handledelte(item._id)} className="text-red-600 text-2xl"><FaTrash className="text-2xl text-red-800"/></button>
              </div>
            ))}
          </div>
        </div>
        <div className={`${card.length <= 3 ? "" : "md:col-span-3 w-full"}`}>
          <div className="w-full px-5 pb-3 bg-white shadow-lg">
            <h1 className={`text-3xl font-bold mb-6 ${card.length <= 3 ? "" : "pt-3"}`}>Checkout</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Name:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="email"
                  id="email"
                  value={user?.email}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="address">Address:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="postalCode">Postal Code:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>
              <div className="text-2xl text-red-600 mb-4">Total: ${totalPrice.toFixed(2)}</div>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                type="submit"
              >
                Process Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
