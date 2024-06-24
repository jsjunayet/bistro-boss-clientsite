import { Link } from "react-router-dom";
import useMenu from "../../../Hooks/useMenu";
import Title from "../../../share/Title";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { axiosSecure } from "../../../Hooks/UseAxois";
import Swal from "sweetalert2";
import { useState } from "react";
import DashboardNavbar from "../DashbaordComponent/DashboardNavbar";


const ManageItem = () => {
    const [visibleItems, setVisibleItems] = useState(10);
    const [menu, refetch] = useMenu()
    const handledelte = (_id) => {
        console.log(_id);

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
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                const res = axiosSecure.delete(`/menus/${_id}`)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch()
                }

            }
        });

    }
    const handleLoadMore = () => {
        // Increase the number of visible items, e.g., by 10
        setVisibleItems(menu.length);
    };
    return (
        <div>
            <div className="">
                <DashboardNavbar></DashboardNavbar>
            </div>
            <div>
                <p className="my-4 text-2xl font-semibold">Total items: {menu.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="mr-20">
                            <tr className="bg-[#D1A054] p-2 ">
                                <th></th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        {
                            menu.slice(0, visibleItems).map((item, index) => <tbody key={item._id}>
                                {/* row 1 */}
                                <tr>
                                    <th>{index + 1}</th>
                                    <th><img src={item.image} alt="" className="w-20 h-16 rounded-xl" /></th>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/update/${item._id}`} className="btn btn-ghost">
                                            <FaEdit className="text-2xl"></FaEdit>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handledelte(item._id)} className="btn btn-group">
                                            <FaTrash className="text-2xl"></FaTrash>
                                        </button>
                                    </td>

                                </tr>
                                {/* row 2 */}

                                {/* row 3 */}

                            </tbody>)

                        }
                        <button onClick={handleLoadMore}>Load More</button>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;