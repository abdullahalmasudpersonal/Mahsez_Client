import BuyerDashboardNavber from '@/components/navigation/dashboardNavber/buyerDashboardNavber/BuyerDashboardNavber';
import BuyerSideber from '@/components/navigation/sideber/buyerSideber/BuyerSideber';
import { Drawer, Grid, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const { useBreakpoint } = Grid;
const BuyerLayout = () => {
    const screens = useBreakpoint();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {screens.lg && <BuyerSideber />}
            <Layout style={{ marginLeft: screens.lg ? 255 : 0, minHeight: '100vh', }}>
                <Content style={{
                    background: "radial-gradient(circle, #011a31ff 0%, #034b8aff 50%, #011f3bff 100%)", minHeight: '100vh',
                }}> <div style={{ height: '64px' }}>
                        <BuyerDashboardNavber onMenuClick={toggleDrawer} />
                    </div>
                    <div style={{
                        minHeight: 'calc(100vh - 64px)', maxWidth: '1200px', margin: 'auto', padding: '20px 10px', display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
            {/* মোবাইলে Drawer */}
            {!screens.lg && (
                <Drawer
                    width={280}
                    placement="left"
                    closable={false}
                    maskClosable={true}
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    styles={{ body: { padding: 0, backgroundColor: "#001529" } }}
                >
                    <BuyerSideber isDrawer />
                </Drawer>
            )}
        </Layout>
    );
};

export default BuyerLayout;