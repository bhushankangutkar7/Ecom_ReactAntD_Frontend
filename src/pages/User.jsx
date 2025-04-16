import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext.jsx";
import BreadcrumbComponent from "../components/BreadcrumbComponent.jsx";
import SiderComponent from "../components/SiderComponent.jsx";
import ContentComponent from "../components/ContentComponent.jsx";
import { Layout } from "antd";

const user = () => {
    const {isLoggedIn, setIsLoggedIn, userData, setUserData}=useContext(AuthContext);

    const navigate = useNavigate();

    

    if(!isLoggedIn){
        console.log(isLoggedIn)
        navigate("/login");
    }


    return(
        <>
            {/* Main Section */}
            <div style={{ padding: '0 48px' }}>
                {/* BreadCrumb Section */}  
                <BreadcrumbComponent/>
                {/* Main external Section */}
                <Layout
                style={{ padding: '24px 0' }}
                >
                    {/* Side section */}
                    <SiderComponent/>
                    <ContentComponent/>
                </Layout>
            </div>
        </>
    );
};


export default user;