import axios from "axios";

const getAllUsers = async() => {
    const backendApi = import.meta.env.VITE_BACKEND_API;

    try{
        const res = await axios.get(`${backendApi}/products`);
        // console.log(res);
        return res.data;
    }
    catch(err){
        // console.log(err);
        return err;
    }
};

export default getAllUsers;