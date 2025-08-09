import AdminDashboardNavber from '@/components/navigation/dashboardNavber/AdminDashboardNavber';
import AdminSideber from '@/components/navigation/sideber/AdminSideber';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <Layout>
            <AdminSideber/>
            <Content>
                <AdminDashboardNavber/>
                {/* <Content style={{ padding: "20px 50px", minHeight: "80vh" }}> */}
                <Outlet />
            </Content>
        </Layout>
    );
};

export default AdminLayout;