import AdminDashboardNavber from '@/components/navigation/dashboardNavber/adminDashboardNavber/AdminDashboardNavber';
import AdminSideber from '@/components/navigation/sideber/adminSideber/AdminSideber';
import { Drawer, Grid, Layout } from 'antd';
import { Content, } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const { useBreakpoint } = Grid;
const AdminLayout = () => {
    const screens = useBreakpoint();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>

            {screens.lg && <AdminSideber />}
            <Layout style={{ marginLeft: screens.lg ? 255 : 0, minHeight: '100vh', }}>
                <Content style={{
                    background: "radial-gradient(circle, #011a31ff 0%, #034b8aff 50%, #011f3bff 100%)", minHeight: '100vh',
                }}>
                    <div style={{ height: '64px' }}>
                        <AdminDashboardNavber onMenuClick={toggleDrawer} />
                    </div>
                    <div style={{
                        minHeight: 'calc(100vh - 64px)', maxWidth: '1600px', margin: 'auto', padding: '20px 10px', display: 'flex',
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
                    <AdminSideber isDrawer />
                </Drawer>
            )}
        </Layout>
    );
};

export default AdminLayout;
