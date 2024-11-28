import { Link, Outlet } from "react-router-dom";
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { Menu, Typography } from "antd";
import menuData, { MenuData } from "./ManuData";
import { createElement } from "react";
import logo from "../../../../public/assets/img/logo/mahsez.png";

const { SubMenu } = Menu;

const Admin = () => {
  return (
    <>
      <PageTitle pageTitle="Admin" />
      <div className="dashboardNavber">
        <div className="container-xxl px-0">
          <div
            className="dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "60px" }}
            >
              <Link to="/">
                <img src={logo} alt="log" height="45px" />
              </Link>
            </div>
            <div>
              <Typography
                style={{
                  color: "rgb(255, 123, 0)",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Admin Dashboard
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="breadcrumb-bg">
        <div className="container-xxl">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 ">
              <li className="breadcrumb-item">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="breadcrumb-home-btn"
                  />
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/dashboard" className="breadcrumbItem">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Admin
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="home-bg">
        {/*       <div className="container-xxl py-4 p-0 ">
          <h1
            className="p-0 text-center "
            style={{
              fontFamily: "𝕿𝖞𝖕𝖊 𝖘𝖔𝖒𝖊𝖙𝖍𝖎𝖓𝖌 𝖙𝖔 𝖘𝖙𝖆𝖗𝖙",
              color: "rgb(233, 93, 0)",
            }}
          >
            Admin Panel
          </h1>
        </div> */}
        <div className="container-xxl px-0 py-4">
          <div className="dashboard">
            <div className="dashboard-dev1">
              {/*             <Link to="/admin">
                <button>Home</button>
              </Link>
              <Link to="/admin/graphs">
                <button>Graph</button>
              </Link>
              <Link to="/admin/allOrder">
                <button>All Order</button>
              </Link>
              <Link to="/admin/allAdmin">
                <button>All Admin</button>
              </Link>
              <Link to="/admin/products">
                <button>Product</button>
              </Link>
              <Link to="/admin/create-product">
                <button>Create Product</button>
              </Link>
              <Link to="/admin/update_product">
                <button className="mb-5">Update Product</button>
              </Link> */}

              <Menu
                mode="inline"
                defaultOpenKeys={[]} // Set default open keys as 'dashboard'
              >
                {menuData.map((menu: MenuData) => (
                  <SubMenu
                    key={menu.key}
                    icon={createElement(menu.icon)}
                    title={menu.title}
                  >
                    {menu.items.map((item) => (
                      <Menu.Item key={item.key}>
                        <Link style={{ textDecoration: "none" }} to={item.path}>
                          {item.title}
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ))}
              </Menu>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
