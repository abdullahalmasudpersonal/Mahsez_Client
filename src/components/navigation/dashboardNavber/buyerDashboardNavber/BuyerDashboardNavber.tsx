import { useUpdateAdminOnlineStatusMutation } from "@/redux/features/admin/adminApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery } from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import socket from "@/utils/Socket";
import { LogoutOutlined, MenuOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Grid, Layout, MenuProps, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import './buyerDashboardNavber.css'

const { Header } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const BuyerDashboardNavber = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const screens = useBreakpoint();
    const { data: userData } = useGetMyProfileQuery({});
    const { user, name, profileImg } = userData?.data || {};
    const [updateAdminOnlineStatus] = useUpdateAdminOnlineStatusMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const userId = userData.data.id;
        socket.emit("userOffline", userId);
        if (user?.role === "buyer") {
            await updateAdminOnlineStatus({ userId });
        }
        dispatch(logout());
        navigate("/", { replace: true });
    };

    const menuItems: MenuProps['items'] = [
        {
            key: "user-info",
            label: (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Avatar src={profileImg || undefined} size={74} style={{ backgroundColor: '#f56a00', border: '2px solid rgba(190, 190, 190, 1)', }} icon={<UserOutlined />} />
                    <Typography style={{ color: 'white', fontSize: '19px', fontWeight: 700, padding: '10px 0 0 0' }}>{name}</Typography>
                    <Typography style={{ color: 'white' }}><small>Buyer</small></Typography>
                </div>
            ),
        },
        { type: 'divider' as const, style: { backgroundColor: 'rgba(83, 83, 83, 0.7)', margin: '10px 0' } },
        { key: "profile", label: "Profile", icon: <UserOutlined style={{ fontSize: 19 }} /> },
        { key: "settings", label: "Settings", icon: <SettingOutlined style={{ fontSize: 19 }} /> },
        { type: 'divider' as const, style: { backgroundColor: 'rgba(83, 83, 83, 0.7)', margin: '10px 0' } },
        { key: "logout", label: "Logout", icon: <LogoutOutlined style={{ fontSize: 19 }} /> },
    ];

    const handleMenuClick = (e: { key: string }) => {
        if (e.key === "logout") {
            handleLogout();
        }
        else if (e.key === "profile") {
            navigate("/buyer");
        }
    };

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
                    style={{ fontSize: "20px", marginRight: "16px", cursor: "pointer", color: 'white' }}
                />
            )}
            <Text strong style={{ fontSize: 18, color: 'white' }}>
                Buyer Dashboard
            </Text>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Dropdown menu={{ items: menuItems, onClick: handleMenuClick, className: "buyerNavberProfileDropdown", }} trigger={["click"]} >
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <Avatar src={profileImg || undefined} style={{ backgroundColor: '#f56a00', border: '2px solid rgba(190, 190, 190, 1)', verticalAlign: 'middle' }} size="large" icon={<UserOutlined />} />

                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default BuyerDashboardNavber;
