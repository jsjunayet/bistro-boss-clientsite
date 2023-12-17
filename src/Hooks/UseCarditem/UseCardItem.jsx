import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../UseAxois";
import UseAuth from "../UseAuth";



const UseCardItem = () => {
    const { user } = UseAuth()
    const { data: card = [], refetch } = useQuery({
        queryKey: ['card', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/card?mail=${user?.email}`)
            return res.data
        }
    })
    return [card, refetch]
};

export default UseCardItem;