import React,{useContext, useEffect, useState} from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, ProductOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import Products from "./pages/Products.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "../src/pages/Register.jsx";
import LoggedIn from "../src/pages/LoggedIn.jsx";
import AuthContext from './context/authContext.jsx';


// const isLogin = true; //Hard quoated for now will change later
// const isAdmin = true; // Hard quoated for now will change later

// const isLogin = false; //Hard quoated for now will change later
// const isAdmin = false; // Hard quoated for now will change later




const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");


  const token = localStorage.getItem("authToken");

  const verifyToken = async(token) => {
    const backendApi = import.meta.env.VITE_BACKEND_API;

    if(!token){
      console.log(`No token found`);
      setIsLoggedIn(false);
    };

    try{
      const checkToken = await axios.get(`${backendApi}/verify-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        console.log(checkToken.status);

        if(checkToken.status === 200){
          console.log(checkToken);
          setIsLoggedIn(true);
          const decodedToken = jwtDecode(token);
          console.log(`Decoded Token: ${decodedToken}`)
          setUserRole(decodedToken.role_id);
        }else{
          console.log(`Invalid Token`);
          setIsLoggedIn(false);
        }
    }
    catch(err){
      console.log(`Token Verification failed`);
    }
  };


  useEffect(()=>{
    verifyToken(token);
    console.log('App Component');
  },[isLoggedIn, token]);

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, userRole, setUserRole}}>
      <ConfigProvider>
        <Router>
          <Layout style={{ minWidth: "450px"
          }}>
            {/* Header Component */}
            <HeaderComponent/> 
            <Routes>
            {/* Route Section */}
              <Route path="/" element={<Home/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/logged-in" element={<LoggedIn/>}/>
            </Routes>

            {/* Footer Section */}
            <FooterComponent/>
          </Layout>
        </Router>
      </ConfigProvider>
    </AuthContext.Provider>
    
    
  );
};
export default App;