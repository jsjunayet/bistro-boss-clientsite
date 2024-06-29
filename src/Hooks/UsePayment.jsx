import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import { axiosSecure } from "./UseAxois";


const UsePayment = () => {
    const { user } = UseAuth()
    const { data: paymentuser = [],refetch } = useQuery({
        queryKey: ['paymentEmail', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`)
            return res.data
        },

    })
    return [paymentuser,refetch]
};

export default UsePayment;

export const AllUsePayment = () => {
    const { data: Allpaymentuser = [],refetch } = useQuery({
        queryKey: ['allpaymentEmail',],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`)
            return res.data
        },

    })
    return [Allpaymentuser,refetch]
};