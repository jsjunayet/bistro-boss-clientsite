import { MdDelete } from "react-icons/md";
import { DataGrid } from '@mui/x-data-grid';
import DashboardNavbar from "../DashbaordComponent/DashboardNavbar";
import { AllUsePayment } from "../../../Hooks/UsePayment";
import { useState } from "react";
import Swal from "sweetalert2";
import { axiosSecure } from "../../../Hooks/UseAxois";
const MangeBoking = () => {
    const [Allpaymentuse, refetch] = AllUsePayment()
    const [filterText, setFilterText] = useState("");
    const filteredData = Allpaymentuse.filter((item) =>
        item?.name?.toLowerCase().includes(filterText.toLowerCase())
    );
    const columns = [
        { field: 'number', headerName: 'Number', width: 70, padding: 5, cellClassName: 'text-white'  },
        { field: 'name', headerName: 'UserName', width: 150, cellClassName: 'text-white' },
        { field: 'itemNames', headerName: 'ItemNames', width: 250, cellClassName: 'text-white' },
        { field: 'location', headerName: 'Location', width: 150, cellClassName: 'text-white' },
        { field: 'phone', headerName: 'Phone', width: 150, cellClassName: 'text-white' },
        { field: 'date', headerName: 'Date', width: 100, cellClassName: 'text-white' },
        { field: 'price', headerName: 'Price', width: 100, cellClassName: 'text-white' },
        {
            field: 'status', headerName: 'Status', width: 100, renderCell: (params) => (
                <span onClick={() => handledelivered(params.row._id)} className="text-white text-xs mt-3 cursor-pointer bg-[#333]  rounded-md px-3 py-2" >{params.row.status}</span>
            )
        },
       
    ];
    const handledelivered = async(id)=>{
        try{
          Swal.fire({
            title: "Are you sure?",
            text: "You Want to pending this user food",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Please Pending"
        }).then(async (result) => {
            if (result.isConfirmed) {
              const res = await  axiosSecure.patch(`/update/delivered/${id}`)
              if(res.data.modifiedCount>0){
                Swal.fire({
                  toast: true,
                  position: "top-end",
                  icon: "success",
                  title:`Succefull pending`,
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              });
              refetch()
              }      
            }
        });
    
        }catch(err){
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "This order is exclusively for the user.",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    
        }
        }

    const rows = filteredData?.map((item, index) => ({
        id: index + 1,
        number: index + 1,
        name: item.name,
        itemNames: item.itemNames,
        location: item.address,
        phone:item?.phone,
        date: item.date.substring(0, 10),
        price: `${item.price}$`,
        status: item.status,
        _id: item._id,
    }));



    return (
        <div >
           <DashboardNavbar serarch={setFilterText}></DashboardNavbar>
         <div className="bg-red-700 mr-5">
         <div  style={{ height: 600, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 10 },
                                        },
                                    }}
                                    pageSizeOptions={[ 10, 20, 30, 40]}
                                    
                                />
                            </div>
         </div>
        </div>
    );
};

export default MangeBoking;