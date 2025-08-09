import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { lazy } from "react";
import Navber from "@/pages/shared/navber/navber/Navber";

// const Navber = lazy(() => import("@/components/navigation/navber/navber/Navber"));
// const Navber = lazy(() => import("@/pages/shared/navber/navber/Navber"));
const Footer = lazy(() => import("@/pages/shared/Footer/Footer"));

const CommonLayout = () => {
    return (
        <Layout>
            {/* <Navber /> */}
            <Navber/>
            <Content >
            {/* <Content style={{ padding: "20px 50px", minHeight: "80vh" }}>  style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}*/}
                <Outlet />
            </Content>
            <Footer />
        </Layout>
    );
};

export default CommonLayout;