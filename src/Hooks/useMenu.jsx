import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosSecure } from "./UseAxois";
import UseaxiosPublic from "./UseaxiosPublic";


const useMenu = () => {
    // const [menu, setmenu] = useState([])
    // const [loading, setloading] = useState(true)

    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setmenu(data)
    //             setloading(false)
    //         })
    // }, [])
    // return [menu, loading]
    const { data: menu = [], isFetching: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosSecure.get('/menu')
            return res.data
        }
    })
    return [menu, loading, refetch]
};

export default useMenu;