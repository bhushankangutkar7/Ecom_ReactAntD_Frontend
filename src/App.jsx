import React,{useState} from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, ProductOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const isLogin = true; //Hard quoated for now will change later
const isAdmin = true; // Hard quoated for now will change later

// const isLogin = false; //Hard quoated for now will change later
// const isAdmin = false; // Hard quoated for now will change later

const navItems = isLogin ? ["Home"] : ["Home", "Login"] ;

const items1 = navItems.map(key => ({
  key,
  label: `${key}`,
}));


const subnav = isAdmin ? ["Manage Users", "Manage Products"] : ["Manage Products"];

const subnavIcons = isAdmin ? [UserOutlined, ProductOutlined] : [ProductOutlined];

const options = isAdmin ? [`All Users`,`Add User`, `All Products`, `Add Product`]: [`All Products`, `Add Product`];


const sideBarChildrenLength = 2;

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

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{height: "100vh"}}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <div style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Company Name</Breadcrumb.Item>
          <Breadcrumb.Item>Admin or User</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
        </Layout>
      </div>
      <Footer style={{ textAlign: 'center', height: "10vh" }}>
        Ecom Practice ©{new Date().getFullYear()} Created by Bhushan
      </Footer>
    </Layout>
  );
};
export default App;