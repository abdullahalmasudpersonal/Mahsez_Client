import { CreditCardOutlined, /* DashboardOutlined, SettingOutlined, */ ShoppingOutlined, UserOutlined } from "@ant-design/icons";

export const buyerMenus = [
    // {
    //     key: '',
    //     icon: <DashboardOutlined />,
    //     label: "Dashboard",
    // },
    {
        key: '',
        icon: <UserOutlined />,
        label: "Profile",
    },
    {
        key: 'my-order',
        icon: <ShoppingOutlined />,
        label: "My Order",
    },
    {
        key: 'my-payment',
        icon: <CreditCardOutlined />,
        label: "Payment",
    },
    // {
    //     key: '',
    //     icon: <UserOutlined />,
    //     label: "Profile",
    // },
    // {
    //     key: '',
    //     icon: <SettingOutlined />,
    //     label: "Setting",
    // },

]