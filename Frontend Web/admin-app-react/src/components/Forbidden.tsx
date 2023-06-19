import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ApiStatusCodes } from "../constants/api.constants";
import { TopPaths } from "features/admin_top/admin_top";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-center full-height">
        <Result
          status={ApiStatusCodes.FORBIDDEN}
          title={ApiStatusCodes.FORBIDDEN}
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button type="primary" onClick={() => navigate(TopPaths.TOP())}>Back Home</Button>}
        />
    </div>
  );
};
export default NotFound;
