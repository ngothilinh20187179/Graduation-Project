import { Typography } from "antd";
import { SettingPaths } from "features/admin_setting/admin_setting";
import { memo } from "react";
import { Link } from "react-router-dom";

const SettingScreen = () => {
  return (
    <div>
      <Typography className="font-24">Settings</Typography>
      <ul>
        <li className="pt-20 pb-20">
          <Link to={SettingPaths.MY_PROFILE()} className="text-link-blue">
            My Profile
          </Link>
        </li>
        <li>
          <Link to={SettingPaths.CHANGE_PASSWORD()} className="text-link-blue">
            Change Password
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(SettingScreen);
