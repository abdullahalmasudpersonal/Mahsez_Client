import AdminDashboardNavber from '@/components/navigation/dashboardNavber/AdminDashboardNavber';
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
            <Layout style={{ marginLeft: screens.lg ? 255 : 0 }}>
              
                <Content style={{
                    background: "radial-gradient(circle, #133c63ff 0%, #01203bff 50%, #001a33ff 100%)", padding: '84px 20px 20px 20px',
                }}>  <AdminDashboardNavber onMenuClick={toggleDrawer} />
                    <Outlet />
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
