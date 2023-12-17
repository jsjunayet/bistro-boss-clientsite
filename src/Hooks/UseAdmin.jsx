import React, { useContext } from 'react';
import { AuthControl } from '../Auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from './UseAxois';

const UseAdmin = () => {
    const { user } = useContext(AuthControl)
    const { data: isAdmin, isPending: isAdminloading, refetch } = useQuery({
        queryKey: [user?.email, 'isadmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log(res.data?.admin)
            return res.data?.admin
        }
    })
    return [isAdmin, isAdminloading, refetch]
};

export default UseAdmin;