import { memo, ReactNode, useState } from "react";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Outlet } from "react-router-dom";
import SiderLayout from "../SiderLayout/SiderLayout";
import HeaderLayout from "../HeaderLayout/HeaderLayout";
import cx from "classnames";
import styles from "./DefaultLayout.module.scss";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <SiderLayout collapsed={collapsed}/>
      <Layout>
        <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content className={cx(styles.content, "full-width")}>
          {children}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(DefaultLayout);
