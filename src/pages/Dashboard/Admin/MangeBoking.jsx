import { MdDelete } from "react-icons/md";
import { DataGrid } from '@mui/x-data-grid';
import DashboardNavbar from "../DashbaordComponent/DashboardNavbar";
import { AllUsePayment } from "../../../Hooks/UsePayment";
const MangeBoking = () => {
    const [Allpaymentuse] = AllUsePayment()
    console.log(Allpaymentuse)
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
                <span className="text-white text-xs mt-3 cursor-pointer bg-[#333]  rounded-md px-3 py-2" >pending</span>
            )
        },
       
    ];

    const rows = Allpaymentuse.map((item, index) => ({
      
        id: index + 1,
        number: index + 1,
        name: item.name,
        itemNames: item.itemNames,
        location: item.address,
        phone:item?.phone,
        date: item.date.substring(0, 10),
        price: item.price,
        status: 'status',
        _id: item._id,
    }));



    return (
        <div >
           <DashboardNavbar></DashboardNavbar>
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