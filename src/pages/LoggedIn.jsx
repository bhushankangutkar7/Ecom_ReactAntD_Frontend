import BreadcrumbComponent from "../components/BreadcrumbComponent.jsx";
import SiderComponent from "../components/SiderComponent.jsx";
import ContentComponent from "../components/ContentComponent.jsx";
import { Layout, theme } from "antd";

const loggedIn = () => {

    const {
        token: { colorBgContainer, borderRadiusLG }
      } = theme.useToken();


    return(
        <>
            {/* Main Section */}
            <div style={{ padding: '0 48px' }}>
                {/* BreadCrumb Section */}
                <BreadcrumbComponent/>
                {/* Main external Section */}
                <Layout
                style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                    {/* Side section */}
                    <SiderComponent/>
                    <ContentComponent/>
                </Layout>
            </div>
        </>
    );
};


export default loggedIn;