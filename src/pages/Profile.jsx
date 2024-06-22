import axios from "axios";
import { MdFreeCancellation } from "react-icons/md";
import Swal from "sweetalert2";
import UseAuth from "../Hooks/UseAuth";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import UsePayment from "../Hooks/UsePayment";


const Profile = () => {
    const {user}=UseAuth()
    const [paymentuser] = UsePayment()
    console.log(paymentuser)
   


    const total = paymentuser.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.price),0);
    const columns = [
        { field: 'number', headerName: 'Number', width: 100, padding: 5 },
        { field: 'name', headerName: 'UserName', width: 150 },
        { field: 'itemNames', headerName: 'ItemNames', width: 250 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'date', headerName: 'Date', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        {
            field: 'status', headerName: 'Status', width: 100, renderCell: (params) => (
                <p>pending</p>
            )
        },
        {
          field: 'action', headerName: 'Action', width: 100, renderCell: (params) => (
              <MdFreeCancellation  className=' text-white text-4xl mt-2 cursor-pointer bg-red-800 rounded-md p-[1px]' />
          )
      },
    ];

    const rows = paymentuser.map((item, index) => ({
      
        id: index + 1,
        number: index + 1,
        name: item.name,
        itemNames: item.itemNames,
        location: item.address,
        phone:item?.phone,
        date: item.date.substring(0, 10),
        price: item.price,
        action: 'Cancel',
        status: 'status',
        _id: item._id,
    }));

   




    return (
        <div className={`mt-10`}>
           
            <div>
    <div className='flex justify-center  items-center pt-20'>
     
      <div className='bg-white shadow-lg rounded-2xl w-[75%]'>
        <img
          alt='profile'
          src='https://wallpapercave.com/wp/wp10784415.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
          {
           user ? <img src={user?.photoURL} className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white ' /> : <img className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white" src={"https://i.ibb.co/RHSLGWS/download-1.png"} alt="" />
                        
          }
          </a>

          <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full'>
            {"USER"}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user?.email}</span>
              </p>
              <div>
              <p className='flex gap-1'>
                Total Order : 
                <span className='font-bold text-black '>{paymentuser?.length}</span>
              </p>
              <p className='flex gap-1'>
                Total Buy : <spam className="font-bold"> {total}</spam>
              </p>
              </div>
              <div>
                <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                  Update Profile
                </button>
                <button className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>         
     </div>
         <div>
                    <div className={`mx-2 md:mx-0`}>
                        <div className=' mt-10  max-w-[1240px] mx-auto z-10'>
                            <div style={{ height: 500, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10, 20, 30, 40]}
                                    getRowClassName={(_, index) =>
                                        index % 4 === 0 ? 'bg-green-500' : 'bg-gray-300'
                                    }
                                />
                            </div>
                        </div>
                    </div>
         </div>
        </div>
    );
};

export default Profile;
