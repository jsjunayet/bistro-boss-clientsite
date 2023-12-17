
import { useQuery } from '@tanstack/react-query';
import Title from '../../share/Title';
import UseAxois from '../../Hooks/UseAxois';
import UseAuth from '../../Hooks/UseAuth';
import UsePayment from '../../Hooks/UsePayment';

const PaymentHistory = () => {
    const { user } = UseAuth()
    // const { data: paymentuser = [] } = useQuery({
    //     queryKey: ['paymentEmail', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/payment/${user?.email}`)
    //         return res.data
    //     },

    // })
    const [paymentuser] = UsePayment()
    return (
        <div>
            <div>
                <Title heading={'---At a Glance!---'} paragraph={'PAYMENT HISTORY'}></Title>
            </div>
            <div>
                <p className='text-3xl text-semibold my-4'>Total Payments: {paymentuser.length}</p>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-[#D1A054] p-2 rounded-xl'>
                                <tr>

                                    <th>EMAIL</th>
                                    <th>Taka</th>
                                    <th>transactionID</th>
                                    <th>PAYMENT DATE</th>
                                    <th>Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    paymentuser.map((users) => <tr className=' border-b-[#D1A054]' key={users?._id}>

                                        <td>{users?.email}</td>
                                        <td className='text-xl font-semibold'>$ {users?.price}</td>
                                        <td>{users?.transactionID}</td>
                                        <td>{users?.date}</td>
                                        <td>{users?.status}</td>

                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PaymentHistory;