import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosSecure } from "./UseAxois";
import UseaxiosPublic from "./UseaxiosPublic";


const useMenu = () => {
    // const [menu, setmenu] = useState([])
    // const [loading, setloading] = useState(true)

    // useEffect(() => {
    //     fetch('https://final-project-back-six.vercel.app/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setmenu(data)
    //             setloading(false)
    //         })
    // }, [])
    // return [menu, loading]
    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosSecure.get('/menu')
            return res.data
        }
    })
    return [menu, loading, refetch]
};

export default useMenu;