import { Layout } from "antd";
import React, {useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../components/BreadcrumbComponent.jsx";
import SiderComponent from "../components/SiderComponent.jsx";
import AllProductsContent from "../components/content-components/AllProductsContent.jsx";
import AddProductContent from "../components/content-components/AddProductContent.jsx";
import AuthContext from "../context/AuthContext.jsx";
import SiderSelectContext from "../context/SiderSelectContext.jsx";

const User = () => {
    const {isLoggedIn, userData}=useContext(AuthContext);
    const {siderSelection,} = useContext(SiderSelectContext);

    const {Content} = Layout;
    const navigate = useNavigate();

    const renderContent = () => {
        switch(siderSelection || ProductsSelectContext){
            case "add-product":
                return <><AddProductContent/></>;
            case "all-products":
                return <><AllProductsContent/></>; 

        }
    };

    useEffect(() => {
        if (!(isLoggedIn || userData?.role_id === 2)) {
            navigate("/login");
        }
    }, [isLoggedIn, userData]);
    


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