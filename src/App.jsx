import React, { useContext, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { ConfigProvider, Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Admin from './pages/Admin.jsx';
import User from './pages/User.jsx';
import NotFound from './pages/NotFound.jsx';
import AuthContext from './context/AuthContext.jsx';
import SiderSelectContext from './context/SiderSelectContext.jsx';
import ProductsSelectContext from './context/ProductsSelectContext.jsx';
import UpdateProduct from './pages/UpdateProduct.jsx';
import UpdateUser from './pages/UpdateUser.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [siderSelection, setSiderSelection] = useState();
  const [productSelection, setProductSelection] = useState();
  
  const authToken = localStorage.getItem('authToken');
  const backendApi = import.meta.env.VITE_BACKEND_API;

  // Token verification function
  const verifyToken = async (token) => {
    if (!token) {
      console.log('No token found');
      setIsLoggedIn(false);
      setLoading(false); 
      return;
    }

    try {
      const verifyTokenLink = `${import.meta.env.VITE_BACKEND_API}/verify-token`;
      const verifyTokenResponse = await axios.get(verifyTokenLink, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (verifyTokenResponse.status === 200) {
        const decodedToken = jwtDecode(token);
        const { user_id, role_id, company_id, company_name, exp } = decodedToken;
        setIsLoggedIn(true);
        setUserData({ user_id, role_id, company_id, company_name, exp });
        if(role_id === 1){
          setSiderSelection("all-users")
        }
        
        if(role_id == 2){
          setSiderSelection(`all-products`)
        }
      } else {
        console.log('Invalid Token');
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.log('Token Verification failed');
      setIsLoggedIn(false);
    } finally {
      setLoading(false); // Token verification completed
    }
  };

  useEffect(() => {
    if (authToken) {
      verifyToken(authToken);
    } else {
      setLoading(false); // No token found, but we still need to set loading to false
    }
  }, [authToken]);

  // Check for role_id for redirection
  const isAdmin = userData.role_id === 1 ? true : false;
  const isUser = userData.role_id === 2 ? true : false;

  // If still loading, show loading spinner or any fallback UI
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent:"center", alignItems: "center", height: "100vh", flexDirection: "column"}}>
        <Spin size="large"></Spin>
        <h3>Loading</h3>
      </div>
      
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, isAdmin, isUser, authToken, backendApi}}>
      <SiderSelectContext.Provider value={{siderSelection, setSiderSelection}}>
        <ProductsSelectContext value={{productSelection, setProductSelection}}>
          <ConfigProvider>
            <Router>
              <Layout style={{ minWidth: '450px' }}>
                {/* Header Component */}
                <HeaderComponent />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Navigate to="/" />} />
                  <Route path="/login" element={ !isLoggedIn?<Login /> : <Navigate to="/"/> } />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Routes */}
                  <Route
                    path="/admin"
                    element={isLoggedIn && isAdmin ? <Admin /> : <Navigate to="/login" />}
                  />
                  <Route
                    path={`:companyId/users/:id`}
                    element={isLoggedIn? <UpdateUser /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/user"
                    element={isLoggedIn && isUser ? <User /> : <Navigate to="/login" />}
                  />
                  {/* Fallback route */}
                  <Route
                    path={`:companyId/products/:id`}
                    element={isLoggedIn? <UpdateProduct /> : <Navigate to="/login" />}
                  />
                  {/* Fallback route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>

                {/* Footer Section */}
                <FooterComponent />
              </Layout>
            </Router>
          </ConfigProvider>
        </ProductsSelectContext>
      </SiderSelectContext.Provider>  
    </AuthContext.Provider>
  );
};

export default App;
