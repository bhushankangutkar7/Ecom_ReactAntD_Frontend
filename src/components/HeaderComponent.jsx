import { Layout, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {LogoutOutlined, UserOutlined, HomeOutlined, LoginOutlined, AppstoreAddOutlined} from "@ant-design/icons"

const HeaderComponent = () => {
  const { isLoggedIn, setIsLoggedIn, setUserData, isAdmin } = useContext(AuthContext);
  const { Header } = Layout;
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUserData({});
    navigate("/login");
  };

  const userKey = isAdmin ? "admin" : "user";
  const userLabel = isAdmin ? "Admin" : "Employee";

  // Define the menu items based on login status
  const menuItems = isLoggedIn
    ? [
        { 
          key: "home", label: <NavLink to="/">Home</NavLink>, icon: <HomeOutlined /> },
        { key: {userKey}, label: <NavLink to={`/${userKey}`}>{userLabel}</NavLink>, icon: <UserOutlined /> },
        { key: "logout", label: "Log out", onClick: logOutUser, icon: <LogoutOutlined /> },
      ]
    : [
        { key: "home1", label: <NavLink to="/">Home</NavLink>, icon: <HomeOutlined /> },
        { key: "login", label: <NavLink to="/login">Login</NavLink>, icon: <LoginOutlined /> },
        { key: "register", label: <NavLink to="/register">Register</NavLink>, icon: <AppstoreAddOutlined /> },
      ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="demo-logo">
        <NavLink to="/home"><h1 style={{ color: "#d4d0c7", margin: 0 }}>Ecom</h1></NavLink>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{ borderBottom: "none" }}
          items={menuItems}
        />
      </div>
    </Header>
  );
};

export default HeaderComponent;
