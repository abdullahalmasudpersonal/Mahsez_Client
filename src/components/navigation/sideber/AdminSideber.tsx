import { Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import logo from "@/assets/img/logo/mahsez.png";
import { adminMenus } from "./AdminMenu";

const AdminSideber = ({ isDrawer }: { isDrawer?: boolean }) => {
  if (isDrawer) {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}
        >
          <Image preview={false} width={140} src={logo} />
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Menu
            mode="inline"
            items={adminMenus}
            style={{ borderRight: 0 }}
          />
        </div>
      </div>
    );
  }



  return (
    <><style>
      {`
          .admin-sidebar-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .admin-sidebar-scrollbar::-webkit-scrollbar-track {
            background: #001529;
          }
          .admin-sidebar-scrollbar::-webkit-scrollbar-thumb {
            background-color: #1890ff;
            border-radius: 4px;
            border: 2px solid #001529;
          }
          .admin-sidebar-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #0063c0ff #001529;
          }
        `}
    </style>
      <Sider width={255} style={{
        height: "100vh",
        overflow: "hidden",
      }}>
        <div
          style={{
            padding: "17px",
            display: 'flex',
            justifyContent: 'center',
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            flexShrink: 0,
            position: 'sticky',
            top: '0',
            zIndex: 1,
          }}
        >
          <Image preview={false} width={140} height={55} src={logo} />
        </div>

        <div className="admin-sidebar-scrollbar" style={{ height: "calc(100vh - 90px)", overflowY: 'auto', padding: '10px 0' }} >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={adminMenus}
          />
        </div>
      </Sider>
    </>
  );
};

export default AdminSideber;
