import { Breadcrumb } from "antd";
import { HomeOutlined,ApartmentOutlined, UserOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom";
import AuthContext from "../context/authContext";
import { use, useContext } from "react";




const breadCrumbComponent = () => {
    const {userData} = useContext(AuthContext);

    const {role_id, company_name} = userData;


    const Items = [
        {
            title: <><NavLink to=""><HomeOutlined/> Home</NavLink></>,
        },
        {
            title: <><NavLink to=""><ApartmentOutlined /> {company_name} </NavLink></>
        },
        {
            title: <><NavLink to=""><UserOutlined /> {role_id === 1 ? "Admin": "User"} </NavLink></>
        },
    ];

    return (
        <Breadcrumb 
            style={{ margin: '16px 0' }}
            items={Items}
        />
    );
};

export default breadCrumbComponent;