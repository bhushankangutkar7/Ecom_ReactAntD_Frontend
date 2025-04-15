import {Layout, Menu} from "antd";

const footerComponent = () => {

    const {Footer} = Layout;

    return(
        <>
            <Footer style={{ textAlign: 'center', height: "10vh" }}>
                Ecom Practice ©{new Date().getFullYear()} Created by Bhushan
            </Footer>
        </>
    );

};

export default footerComponent;