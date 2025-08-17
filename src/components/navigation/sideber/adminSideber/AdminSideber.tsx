import { Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import logo from "@/assets/img/logo/mahsez.png";
import { useLocation, useNavigate } from "react-router-dom";
import { adminMenus } from "./AdminMenu";
import './AdminSideber.css'

const AdminSideber = ({ isDrawer }: { isDrawer?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (isDrawer) {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid rgba(136, 136, 136, 0.6)",
            flexShrink: 0,
          }}
        >
          <Image preview={false} width={140} src={logo} />
        </div>
        <div style={{ flex: 1, overflowY: "auto" }} className="admin-sidebar-menu-scroll">
          <Menu theme="dark"
            mode="inline"
            items={adminMenus}
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            style={{ borderRight: 0 }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Sider width={255} style={{
        height: "100vh",
        position: 'fixed',
        left: 0,
        top: 0,
        overflow: "hidden",
        borderRight: '.5px solid #263b44ff',
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
            cursor: 'pointer'
          }}
          onClick={() => navigate("/")}
        >
          <Image preview={false} width={140} height={55} src={logo} />
        </div>

        <div className="admin-sidebar-menu admin-sidebar-menu-scroll" style={{ height: "calc(100vh - 90px)", overflowY: 'auto', padding: '10px 0' }} >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            items={adminMenus}
          />
        </div>
      </Sider>
    </>
  );
};

export default AdminSideber;
