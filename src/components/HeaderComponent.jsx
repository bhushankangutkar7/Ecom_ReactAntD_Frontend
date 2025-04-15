import {Layout, Menu} from "antd";
import { NavLink } from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/authContext";



const headerComponent = () => {

    const {isLoggedIn} = useContext(AuthContext);

    const {Header} = Layout;

    const navItems = isLoggedIn ? ["Home","Logout"] : ["Home", "Login", "Register"] ;

    const routeMap = isLoggedIn ? {
        Home: "/",
        Logout: "/logout",
      }:
        {
            Home: "/",
            Login: "/login",
            Register: "/register",
        };

    const items1 = navItems.map(key => ({
        key: routeMap[key],
        label: <NavLink to={routeMap[key]}>{key}</NavLink>,
    }));

    return(
        <>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent:"space-between" }}>
                <div  className="demo-logo">
                    <h1 style={{color: "#d4d0c7"}}>
                        Ecom
                    </h1>  
                </div>
 
                <div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['3']}
                        items={items1}
                        style={{ 
                            minWidth: 0,
                            flex: 1, 
                        }}
                    />
                </div>
                
            </Header>
        </>
    );
};

export default headerComponent;