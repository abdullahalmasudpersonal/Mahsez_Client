/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DashboardOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

interface MenuItem {
  key: string;
  title: string;
  path: string;
}

interface MenuData {
  key: string;
  title: string;
  icon: React.ComponentType<any>;
  items: MenuItem[];
}

const menuData: MenuData[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: DashboardOutlined,
    items: [
      { key: "home", title: "Home", path: "/admin" },
      { key: "rtl", title: "RTL", path: "/admin/" },
    ],
  },
  {
    key: "products",
    title: "Products",
    icon: AppstoreOutlined,
    items: [
      { key: "product-list", title: "List", path: "/admin/list-products" },
      {
        key: "create",
        title: "Create",
        path: "/admin/create-product",
      },
    ],
  },
  {
    key: "orders",
    title: "Orders",
    icon: SettingOutlined,
    items: [{ key: "order-list", title: "List", path: "/admin/list-orders" }],
  },
  {
    key: "offer",
    title: "Offer",
    icon: SettingOutlined,
    items: [{ key: "offer-list", title: "List", path: "/admin/list-orders" }],
  },
  {
    key: "blogs",
    title: "Blogs",
    icon: SettingOutlined,
    items: [
      { key: "blog-list", title: "List", path: "/admin/list-blogs" },
      { key: "create-blog", title: "Create Blog", path: "/admin/create-blog" },
    ],
  },
  {
    key: "users",
    title: "Users",
    icon: SettingOutlined,
    items: [
      { key: "admin", title: "All Admin", path: "/admin/all-admin" },
      { key: "buyer", title: "All Buyer", path: "/admin/all-buyer" },
    ],
  },
];

export default menuData;
export type { MenuData, MenuItem };
