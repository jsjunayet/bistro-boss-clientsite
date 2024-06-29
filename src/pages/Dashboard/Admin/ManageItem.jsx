import { Link } from "react-router-dom";
import useMenu from "../../../Hooks/useMenu";
import Title from "../../../share/Title";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { axiosSecure } from "../../../Hooks/UseAxois";
import Swal from "sweetalert2";
import { useState } from "react";
import DashboardNavbar from "../DashbaordComponent/DashboardNavbar";
import { Pagination, TextField, Button } from "@mui/material";

const ManageItem = () => {
    const [menu, refetch] = useMenu();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState("");
    const itemsPerPage = 5;

    const handleDelete = async (_id) => {
        console.log(_id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menus/${_id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                }
            }
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    

    const paginate = (items) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    const filteredMenu = menu.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const paginatedMenu = paginate(filteredMenu);

    return (
        <div>
            <div className="">
                <DashboardNavbar serarch={setFilterText} setcount={setCurrentPage}></DashboardNavbar>
            </div>
            <div>
                <p className="mb-2 text-2xl font-semibold">Total items: {menu.length}</p>
                <div className="mb-2 flex justify-between">
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="mr-20">
                            <tr className="bg-red-700 p-2 text-white">
                                <th></th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        {paginatedMenu.map((item, index) => (
                            <tbody key={item._id}>
                                <tr>
                                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <th>
                                        <img src={item.image} alt="" className="w-20 h-16 rounded-xl" />
                                    </th>
                                    <td>{item.name}</td>
                                    <td>{item.price}$</td>
                                    <td>
                                        <Link to={`/dashboard/update/${item._id}`} className="btn btn-ghost">
                                            <FaEdit className="text-2xl"></FaEdit>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-group">
                                            <FaTrash className="text-2xl"></FaTrash>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <div className="my-2 flex justify-center items-center">
                        <Pagination
                            count={Math.ceil(filteredMenu.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;
