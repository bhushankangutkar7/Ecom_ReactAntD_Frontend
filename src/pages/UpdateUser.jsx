import { Layout } from "antd";
import React, {useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../components/BreadcrumbComponent.jsx";
import SiderComponent from "../components/SiderComponent.jsx";
import AuthContext from "../context/AuthContext.jsx";
import SiderSelectContext from "../context/SiderSelectContext.jsx";
import UpdateUserContent from "../components/content-components/UpdateUserContent.jsx";



const updateUser = () => {
    const {isLoggedIn, userData}=useContext(AuthContext);
    const {siderSelection} = useContext(SiderSelectContext);
    const {Content} = Layout;
    const navigate = useNavigate();

    useEffect(()=>{
        if(!(isLoggedIn)){
            navigate("/login");
        }
    });


    return(
        <>
            {/* Main Section */}
            <div style={{ padding: '0 48px' }}>
                {/* BreadCrumb Section */}  
                <BreadcrumbComponent/>
                {/* Main external Section */}
                <Layout style={{ padding: '24px 0' }}>
                    <SiderComponent />
                    <Content style={{ padding: '0 24px', minHeight: 280, maxWidth: 1600, minWidth: 300 }}>
                        <UpdateUserContent/>
                    </Content>
                </Layout>
        
            </div>
        </>
    );
};


export default updateUser;