import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxois from "../../../Hooks/UseAxois";
import { FaTrash, FaUser } from "react-icons/fa6";


const Allusers = () => {
    const axiosSecure = useAxois()
    const queryClient = useQueryClient()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }

    })
    console.log(users)
    const handledelte = (_id) => {
        console.log(_id)
        axiosSecure.delete(`/users/${_id}`)
            .then(res => {
                if (res.data?.deletedCount > 0) {
                    refetch()
                }
            })

    }
    // const handleAdmin = (_id) => {
    //     console.log('hello2', _id)
    //     axiosSecure.patch(`/users/admin/${_id}`)
    //         .then(res => {
    //             console.log('hello', res.data)
    //             refetch()
    //         })

    // }
    const handleAdmin = async (_id) => {
        const res = await axiosSecure.patch(`/users/admin/${_id}`)
        console.log(res)
        refetch()


    }
    // const handleAdmin = useMutation({
    //     mutationFn: (_id) => {
    //         return axiosSecure.patch(`/users/admin/${_id}`)
    //     },
    //     onSuccess: () => {
    //         // ✅ refetch the comments list for our blog post
    //         queryClient.invalidateQueries({
    //             queryKey: ['users']
    //         })
    //     },
    // })
    return (
        <div>
            <div className="flex justify-around my-4">
                <h1>All users</h1>
                <h1>total users : {users?.length}</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Roll</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users?.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        {
                                            item.role == "admin" ? 'Admin' :
                                                <button type="button" onClick={() => handleAdmin(item._id)} className="btn btn-ghost btn-sm"><FaUser className="text-2xl text-red-800 bg-orange-600"></FaUser></button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handledelte(item._id)} className="btn btn-ghost btn-sm"><FaTrash className="text-2xl text-red-800"></FaTrash></button>

                                    </td>
                                </tr>)
                            }
                            {/* row 2 */}

                            {/* row 3 */}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Allusers;