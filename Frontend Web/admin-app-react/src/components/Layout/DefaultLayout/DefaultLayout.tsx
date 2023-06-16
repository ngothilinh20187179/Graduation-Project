import { memo, ReactNode, useState } from "react";
import { Layout } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import { Outlet } from "react-router-dom";
import SiderLayout from "../SiderLayout/SiderLayout";
import HeaderLayout from "../HeaderLayout/HeaderLayout";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <SiderLayout collapsed={collapsed}/>
      <Layout>
        <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content className="full-height full-width pl-50 pt-30">
          {children}
          <Outlet />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default memo(DefaultLayout);
