import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";

export const adminMenus = [
  {
    key: "",
    icon: <MailOutlined />,
    label: "Dashboard",
    // children: [
    //   { key: "/admin/product-list", label: "List" },
    //   { key: "/admin/product-create", label: "Create" },
    // ],
  },
  {
    key: "product",
    icon: <AppstoreOutlined />,
    label: "Product",
    children: [
      { key: "/admin/product-list", label: "List" },
      { key: "/admin/product-create", label: "Create" },
    ],
  },
  {
    key: "order",
    icon: <SettingOutlined />,
    label: "Order",
    children: [
      { key: "/admin/order-list", label: "List" },
      { key: "/admin/", label: "Option 2" },
    ],
  },
  {
    key: "offer",
    icon: <SettingOutlined />,
    label: "Offer",
    children: [
      { key: "/admin/order-list", label: "List" },
      { key: "/admin/order-list", label: "Create" },
    ],
  },
  {
    key: "blog",
    icon: <SettingOutlined />,
    label: "Blog",
    children: [
      { key: "/admin/blog-list", label: "List" },
      { key: "/admin/blog-create", label: "Create" },
    ],
  },
  {
    key: "visitor",
    icon: <SettingOutlined />,
    label: "Visitor",
    children: [
      { key: "/admin/visitor-list", label: "List" },
      // { key: "/admin/admin-create", label: "Create" },
    ],
  },
  {
    key: "admin",
    icon: <SettingOutlined />,
    label: "Admin",
    children: [
      { key: "/admin/admin-list", label: "List" },
      { key: "/admin/admin-create", label: "Create" },
    ],
  },
  {
    key: "buyer",
    icon: <SettingOutlined />,
    label: "Buyer",
    children: [
      { key: "/admin/buyer-list", label: "List" },
      // { key: "/admin/buyer-list", label: "Create" },
    ],
  },
];
