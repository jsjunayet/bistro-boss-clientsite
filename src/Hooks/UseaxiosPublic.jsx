import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://final-project-back-six.vercel.app'
})
const UseaxiosPublic = () => {
    return axiosPublic

};

export default UseaxiosPublic;