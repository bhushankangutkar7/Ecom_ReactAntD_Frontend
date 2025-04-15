import {Layout} from "antd";

const contentComponent = () => {
    const {Content} = Layout;

    return(
        <>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                Content
            </Content> 
        </>
    );
};

export default contentComponent;