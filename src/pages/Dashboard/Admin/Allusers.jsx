import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/UseAxois";
import { FaTrash, FaUser } from "react-icons/fa6";
import DashboardNavbar from "../DashbaordComponent/DashboardNavbar";
import { MdDelete } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import UseAuth from "../../../Hooks/UseAuth";

const AllUsers = () => {
    const axiosSecure = useAxios();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const rows = users.map((item, index) => ({
        id: index + 1,
        userId: item._id,  // Adding the actual user ID for API calls
        number: index + 1,
        name: item.name,
        email: item.email,
        role: item.role,
    }));

    const columns = [
        { field: 'number', headerName: 'Number', width: 100, padding: 5, cellClassName:'text-white' },
        { field: 'name', headerName: 'UserName', width: 200, cellClassName: 'text-white' },
        { field: 'email', headerName: 'UserEmail', width: 350,cellClassName: 'text-white' },
        {
            field: 'admin', headerName: 'Admin', width: 200, renderCell: (params) => (
                params.row.role === "admin" ? (
                    <span className="text-white text-xs mt-3 cursor-pointer bg-[#333]  rounded-md px-3 py-2">ADMIN</span>
                ) : (
                    <button 
                        type="button" 
                        onClick={() => handleAdmin(params.row.userId)} 
                    >
                        <span className="text-white text-xs mt-3 cursor-pointer bg-[#f5adad]  rounded-md px-3 py-2" >USER</span>
                    </button>
                )
            )
        },
        {
            field: 'delete', headerName: 'Delete', width: 200, renderCell: (params) => (
                <MdDelete 
                    onClick={() => handleDelete(params.row.userId)} 
                    className='text-white text-3xl mt-3 cursor-pointer bg-[#333]  rounded-md p-1' 
                />
            )
        },
    ];

    const handleDelete = (_id) => {
        axiosSecure.delete(`/users/${_id}`)
            .then(res => {
                if (res.data?.deletedCount > 0) {
                    refetch();
                }
            })
            .catch(err => console.error(err));
    }

    const handleAdmin = async (_id) => {
        try {
            const res = await axiosSecure.patch(`/users/admin/${_id}`);
            console.log(res);
            refetch();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <DashboardNavbar />
            <div className="font-semibold text-xl">
                <h1 className="text-xl uppercase font-semibold my-2">Total Users: {users?.length}</h1>
            </div>
            <div className="bg-red-700 text-white p-4 rounded-lg">
                <div style={{ height: 550, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 20, 30, 40]}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
