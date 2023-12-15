import { memo } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space, Button } from "antd";
import { ButtonProps } from "antd/es/button";

interface ButtonDropdownProps extends ButtonProps {
  menuProps: MenuProps;
}
const DropdownButton = ({
  menuProps,
  children,
  ...rest
}: ButtonDropdownProps) => {
  const buttonContent = (
    <div>
      <Dropdown
        menu={menuProps}
        trigger={["click"]}
        getPopupContainer={() =>
          document.getElementById("areaScroll") as HTMLElement
        }
      >
        <Button {...rest}>
          <Space>
            {children}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
  return buttonContent;
};

export default memo(DropdownButton);
