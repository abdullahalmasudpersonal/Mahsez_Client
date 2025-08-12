
import { Layout, Avatar, Badge, Dropdown, Menu, Typography, Grid } from "antd";
import { BellOutlined, MenuOutlined, UserOutlined, } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;



const AdminDashboardNavber = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const screens = useBreakpoint();
    const menu = (
        <Menu
            items={[
                { key: "profile", label: "Profile" },
                { key: "settings", label: "Settings" },
                { type: "divider" },
                { key: "logout", label: "Logout" },
            ]}
        />
    );

    return (
        <Header
            style={{
                position: 'fixed',
                top: 0,
                left: screens.lg ? 255 : 0,
                right: 0,
                zIndex: 5,
                height: 64,
                background: "rgba(0, 31, 63, 0.56)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              
            }}
        >
            {!screens.lg && (
                <MenuOutlined
                    onClick={onMenuClick}
                    style={{ fontSize: "20px", marginRight: "16px", cursor: "pointer",color:'white' }}
                />
            )}
            <Text strong style={{ fontSize: 18,  color:'white' }}>
                Admin Dashboard
            </Text>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Badge count={5} overflowCount={9}>
                    <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
                </Badge>

                <Dropdown overlay={menu} trigger={["click"]}>
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <Avatar icon={<UserOutlined />} />
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default AdminDashboardNavber;
