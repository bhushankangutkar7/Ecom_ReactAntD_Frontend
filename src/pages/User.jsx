import { Layout } from "antd";
import React, {useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../components/BreadcrumbComponent.jsx";
import SiderComponent from "../components/SiderComponent.jsx";
import AllUsersContentComponent from "../components/content-components/AllUsersContentComponent.jsx";
import AddUserContentComponent from "../components/content-components/AddUserContentComponent.jsx";
import AllProductsContentComponent from "../components/content-components/AllProductsContentComponent.jsx";
import AddProductContentComponent from "../components/content-components/AddProductContentComponent.jsx";
import AuthContext from "../context/AuthContext.jsx";
import SiderSelectContext from "../context/SiderSelectContext.jsx";

const User = () => {
    const {isLoggedIn, userData}=useContext(AuthContext);
    const {siderSelection,} = useContext(SiderSelectContext);

    const {Content} = Layout;
    const navigate = useNavigate();

    useEffect(()=>{
        if(!(isLoggedIn && userData.role_id === 2)){
            navigate("/login");
        }
    });



    const renderContent = () => {
        switch(siderSelection){
            case "all-products":
                return <><AllProductsContentComponent/></>;
            case "add-product":
                return <><AddProductContentComponent/></>
        }
    };


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
                        {renderContent()}
                    </Content>
                </Layout>

            </div>
        </>
    );
};


export default User;