import { Breadcrumb } from "antd";
import { HomeOutlined,ApartmentOutlined, UserOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom";

const Items = [
    {
        title: <><NavLink to=""><HomeOutlined/> Home</NavLink></>,
    },
    {
        title: <><NavLink to=""><ApartmentOutlined /> Company Name</NavLink></>
    },
    {
        title: <><NavLink to=""><UserOutlined /> Admin or User</NavLink></>
    },
];


const breadCrumbComponent = () => {
    return (
        <Breadcrumb 
            style={{ margin: '16px 0' }}
            items={Items}
        />
    );
};

export default breadCrumbComponent;