import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <Layout>
            <Content>
                {/* <Content style={{ padding: "20px 50px", minHeight: "80vh" }}> */}
                <Outlet />
            </Content>
        </Layout>
    );
};

export default AuthLayout;