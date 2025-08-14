import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Navber from "@/pages/shared/navber/navber/Navber";
import Footer from "@/pages/shared/Footer/Footer";
import BottemHeader from "@/pages/shared/navber/BottemHeader/BottemHeader";
import ScrollManager from "@/pages/shared/ScrollManager/ScrollManager";
import ScrollingBtn from "@/pages/shared/ScrollingBtn/ScrollingBtn";

const CommonLayout = () => {
  return (
    <Layout>
      <Navber />
      <Content>
        <Outlet />
      </Content>
      <Footer />
      <BottemHeader />
      <ScrollManager />
      <ScrollingBtn />
    </Layout>
  );
};

export default CommonLayout;
