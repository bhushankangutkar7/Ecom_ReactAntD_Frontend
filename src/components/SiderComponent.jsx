import React from "react";
import { Menu, Layout, theme, ConfigProvider} from "antd";
import {UserOutlined, ProductOutlined} from "@ant-design/icons";

const {Sider}  = Layout;

const siderComponent = () => {

    const isAdmin = true;

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const sideBarChildrenLength = 2;

    const subnav = isAdmin ? ["Manage Users", "Manage Products"] : ["Manage Products"];

    const subnavIcons = isAdmin ? [UserOutlined, ProductOutlined] : [ProductOutlined];

    const options = isAdmin ? [`All Users`,`Add User`, `All Products`, `Add Product`]: [`All Products`, `Add Product`];


    const items2 = subnavIcons.map((icon, index) => {
        const key = String(index + 1);
        
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: subnav[index],
            children: Array.from({ length: sideBarChildrenLength }).map((_, j) => {
            const subKey = index * sideBarChildrenLength + j + 1;
            return {
                key: subKey,
                label: options[subKey-1],
            };
            }),
        };
    });

    
    return(
            <Sider style={{ background: colorBgContainer }} width={200}>
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
                />
            </Sider>        
    );
};

export default siderComponent;