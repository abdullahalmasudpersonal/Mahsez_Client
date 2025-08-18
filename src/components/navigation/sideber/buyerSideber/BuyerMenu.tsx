import { CreditCardOutlined,  ShoppingOutlined, UserOutlined } from "@ant-design/icons";

export const buyerMenus = [
    {
        key: '/buyer',
        icon: <UserOutlined />,
        label: "Profile",
    },
    {
        key: '/buyer/my-order',
        icon: <ShoppingOutlined />,
        label: "My Order",
        // children:[
        //     { key: '/buyer/my-order', label: "demo" },
        // ]
    },
    {
        key: '/buyer/my-payment',
        icon: <CreditCardOutlined />,
        label: "Payment",
    },
]