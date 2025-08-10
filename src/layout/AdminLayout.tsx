import AdminDashboardNavber from '@/components/navigation/dashboardNavber/AdminDashboardNavber';
import AdminSideber from '@/components/navigation/sideber/AdminSideber';
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
            <Layout>
                <AdminDashboardNavber onMenuClick={toggleDrawer} />
                <Content style={{ margin: '16px', padding: 24, background: '#ad5757ff' }}>
                    <Outlet />
                </Content>
            </Layout>
            {/* মোবাইলে Drawer */}
            {!screens.lg && (
                <Drawer
                    title="Admin Menu"
                    placement="left"
                    closable
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    
                    bodyStyle={{ padding: 0 }}
                >
                    <AdminSideber isDrawer />
                </Drawer>
            )}
        </Layout>
    );
};

export default AdminLayout;

// import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
// import { Button, Layout, Menu, theme } from 'antd';

// const { Header, Sider, Content } = Layout;

// const AdminLayout: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           items={[
//             {
//               key: '1',
//               icon: <UserOutlined />,
//               label: 'nav 1',
//             },
//             {
//               key: '2',
//               icon: <VideoCameraOutlined />,
//               label: 'nav 2',
//             },
//             {
//               key: '3',
//               icon: <UploadOutlined />,
//               label: 'nav 3',
//             },
//           ]}
//         />
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0, background: colorBgContainer }}>
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 64,
//               height: 64,
//             }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           Content
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminLayout;