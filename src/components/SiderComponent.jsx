import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Layout, theme, ConfigProvider} from "antd";
import {UserOutlined, ProductOutlined, UserAddOutlined, UsergroupAddOutlined, AppstoreAddOutlined, WindowsOutlined} from "@ant-design/icons";
import AuthContext from "../context/AuthContext";
import SiderSelectContext from "../context/SiderSelectContext.jsx";

const {Sider}  = Layout;

const siderComponent = () => {

    const {isAdmin} = useContext(AuthContext);
    const {setSiderSelection} = useContext(SiderSelectContext);

    const navigate = useNavigate();
 

    const items3= isAdmin ? [
        {key: "manage-users", label: "Manage Users", icon: <UserAddOutlined />,
            children: [
                {key: "all-users", label: "All Users", icon: <UsergroupAddOutlined/>},
                {key: "add-user", label: "Add User", icon: <UserAddOutlined/>}
            ]
        },
        {key: "manage-products", label: "Manage Products", icon: <ProductOutlined />,
            children:[
                {key: "all-products", label: "All Products", icon: < WindowsOutlined/>},
                {key: "add-product", label: "Add Product", icon: <AppstoreAddOutlined/> }
            ]
         }
    ] :
    [
        {key: "manage-products", label: "Manage Products", icon: <ProductOutlined />,
            children:[
                {key: "all-products", label: "All Products", icon: < WindowsOutlined/>},
                {key: "add-product", label: "Add Product", icon: <AppstoreAddOutlined/> }
            ]
         }
    ];

    const handleClick = (e) => {
        setSiderSelection(()=> e.key);
        navigate("/admin")
    };

    

    
    return(
            <Sider
            width={200}>
                <Menu
                mode="inline"
                defaultSelectedKeys={['all-users']}
                defaultOpenKeys={['manage-users','manage-products']}
                style={{ height: '100%' }}
                items={items3}
                onClick={handleClick}
                />
            </Sider>            
    );
};

export default siderComponent;