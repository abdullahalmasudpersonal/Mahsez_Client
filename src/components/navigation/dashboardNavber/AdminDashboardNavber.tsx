
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
                background: "#fff",
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #f0f0f0",
            }}
        >
            {!screens.lg && (
                <MenuOutlined
                    onClick={onMenuClick}
                    style={{ fontSize: "20px", marginRight: "16px", cursor: "pointer" }}
                />
            )}
            <Text strong style={{ fontSize: 18 }}>
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
