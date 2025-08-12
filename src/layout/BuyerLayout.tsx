import BuyerDashboardNavber from '@/components/navigation/dashboardNavber/BuyerDashboardNavber';
import BuyerSideber from '@/components/navigation/sideber/buyerSideber/BuyerSideber';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const BuyerLayout = () => {
    return (
        <Layout>
            <BuyerSideber/>
            <Content>
                <BuyerDashboardNavber/>
                {/* <Content style={{ padding: "20px 50px", minHeight: "80vh" }}> */}
                <Outlet />
            </Content>
        </Layout>
    );
};

export default BuyerLayout;