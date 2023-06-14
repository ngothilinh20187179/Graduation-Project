import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ApiStatusCodes } from "constants/api.constants";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex-center full-height">
        <Result
          status={ApiStatusCodes.NOT_FOUND}
          title={ApiStatusCodes.NOT_FOUND}
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary" onClick={() => navigate("/")}>Back Home</Button>}
        />
      </div>
    </div>
  );
};
export default NotFound;
