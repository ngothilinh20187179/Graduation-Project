import { Button, Result } from "antd";
import { TopPaths } from "features/student_top/student_top";
import { useNavigate } from "react-router-dom";

const RefusedConnection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-center full-height">
        <Result
          title="Hmmm...can't reach this page"
          subTitle="ERR_CONNECTION_REFUSED"
          extra={<Button type="primary" onClick={() => navigate(TopPaths.TOP())}>Back Home</Button>}
        />
    </div>
  );
};
export default RefusedConnection;
