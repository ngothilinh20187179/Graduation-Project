import { Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { memo } from "react";
import styles from "./SiderLayout.module.scss";
import cx from "classnames";
import {DingdingOutlined} from "@ant-design/icons";

const SiderLayout = ({ collapsed }: { collapsed: boolean }) => {
  
  return (
    <Sider className={cx(styles.sliderLayout)} collapsible collapsed={collapsed} trigger={null}>
      <div className="pl-10 pt-10">
        <DingdingOutlined className="font-40" style={{ color: "white" }}/>
        <Typography style={{ color: "white" }}>EnglishEZ</Typography>
      </div>
      <Menu mode="inline"/>
    </Sider>
  );
};

export default memo(SiderLayout);
