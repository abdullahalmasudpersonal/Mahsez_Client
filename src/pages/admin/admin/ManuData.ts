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
      { key: "main", title: "Main", path: "/dashboard/main" },
      { key: "rtl", title: "RTL", path: "/dashboard/main" },
      { key: "horizontal", title: "Horizontal", path: "/dashboard/main" },
      { key: "ecommerce", title: "Ecommerce", path: "/dashboard/main" },
      { key: "blog", title: "Blog", path: "/dashboard/main" },
    ],
  },
  {
    key: "products",
    title: "Products",
    icon: AppstoreOutlined,
    items: [
      { key: "list", title: "List", path: "/admin/list-products" },
      { key: "Grid", title: "Grid", path: "/dashboard/main" },
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
    items: [
      { key: "ui1", title: "UI Element 1", path: "/dashboard/main" },
      { key: "ui2", title: "UI Element 2", path: "/dashboard/main" },
    ],
  },
  {
    key: "admins",
    title: "Admins",
    icon: SettingOutlined,
    items: [
      { key: "ui1", title: "UI Element 1", path: "/dashboard/main" },
      { key: "ui2", title: "UI Element 2", path: "/dashboard/main" },
    ],
  },
  {
    key: "buyers",
    title: "Buyers",
    icon: SettingOutlined,
    items: [
      { key: "ui1", title: "UI Element 1", path: "/dashboard/main" },
      { key: "ui2", title: "UI Element 2", path: "/dashboard/main" },
    ],
  },
];

export default menuData;
export type { MenuData, MenuItem };
