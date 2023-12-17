import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import { axiosSecure } from "./UseAxois";


const UsePayment = () => {
    const { user } = UseAuth()
    const { data: paymentuser = [] } = useQuery({
        queryKey: ['paymentEmail', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`)
            return res.data
        },

    })
    return [paymentuser]
};

export default UsePayment;