import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import logo from "@/assets/img/logo/mahsez.png";

const items = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: "Dashboard",
    children: [
      { key: "11", label: "Option 1" },
      { key: "12", label: "Option 2" },
    ],
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "Product",
    children: [
      { key: "21", label: "List" },
      { key: "22", label: "Create" },
    ],
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "Order",
    children: [
      { key: "31", label: "List" },
      { key: "32", label: "Option 2" },
    ],
  },
  {
    key: "4",
    icon: <SettingOutlined />,
    label: "Offer",
    children: [
      { key: "41", label: "List" },
      { key: "42", label: "Create" },
    ],
  },
  {
    key: "5",
    icon: <SettingOutlined />,
    label: "Blog",
    children: [
      { key: "51", label: "List" },
      { key: "52", label: "Create" },
    ],
  },
  {
    key: "6",
    icon: <SettingOutlined />,
    label: "Admin",
    children: [
      { key: "61", label: "List" },
      { key: "62", label: "Create" },
    ],
  },
  {
    key: "7",
    icon: <SettingOutlined />,
    label: "Buyer",
    children: [
      { key: "71", label: "List" },
      { key: "72", label: "Create" },
    ],
  },
];

const AdminSideber = ({ isDrawer }: { isDrawer?: boolean }) => {
  if (isDrawer) {
    return (
      <Menu
        mode="inline"
        items={items}
        style={{ height: "100%", borderRight: 0, overflow: "auto" }}
      />
    );
  }
  return (
    <Sider width={255}   style={{
    background: "#001529",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  }}>
      <div
        style={{
          padding: "16px",
          display: 'flex',
          justifyContent: 'center',
          borderBottom: "1px solid rgba(255,255,255,0.2)",  flexShrink: 0,
        }}
      >
        <Image preview={false} width={140} src={logo} />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </div>
    </Sider>
  );
};

export default AdminSideber;
