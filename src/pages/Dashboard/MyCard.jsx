import { FaTrash } from "react-icons/fa6";
import UseCardItem from "../../Hooks/UseCarditem/UseCardItem";
import Title from "../../share/Title";
import UseAxois from "../../Hooks/UseAxois";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const MyCard = () => {
    const [card, refetch] = UseCardItem()
    const axiosSecure = UseAxois()
    const totalprice = card.reduce((previous, current) => previous + current.price, 0)
    console.log(totalprice)
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
    return (
        <div className="">
            <div className="my-10 ">
                <Title heading="---My Cart---" paragraph="WANNA ADD MORE?"></Title>
            </div>
            <div className="md:mr-16 mr-0 bg-white pt-10">
                <div className=" md:flex space-y-2 justify-around items-center">
                    <p className="text-xl font-semibold uppercase">Total orders: {card.length}</p>
                    <p className="text-2xl font-semibold uppercase">total price: ${totalprice}</p>
                    {
                        card.length ? <Link to={'/dashboard/payment'}>
                            <button className="btn btn-outline   bg-[#D1A054] text-xl">pay</button>
                        </Link> :
                            <button disabled className="btn btn-outline   bg-[#D1A054] text-xl">pay</button>
                    }
                </div>
                <div className="mt-5 md:mx-5 mx-0 ">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-[#D1A054] rounded-xl">
                                <tr className="text-xl font-medium text-center">
                                    <th >NO</th>
                                    <th>ITEM IMAGE</th>
                                    <th>ITEM NAME</th>
                                    <th>PRICE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    card.map((item, index) => <tr key={item._id}>
                                        <th className="text-xl  text-center">
                                            <label>
                                                <p>{index + 1}</p>
                                            </label>
                                        </th>
                                        <td className="text-xl  text-center">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-20 h-20">
                                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td className="text-xl  text-center">
                                            <p>{item.name}</p>
                                        </td>
                                        <td className="text-xl  text-center">
                                            <p>{item.price}</p>
                                        </td>
                                        <th className="text-xl  text-center">
                                            <button onClick={() => handledelte(item._id)} className="btn btn-ghost btn-sm"><FaTrash className="text-2xl text-red-800"></FaTrash></button>
                                        </th>
                                    </tr>)
                                }
                                {/* row 2 */}

                                {/* row 3 */}

                                {/* row 4 */}

                            </tbody>
                            {/* foot */}


                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyCard;