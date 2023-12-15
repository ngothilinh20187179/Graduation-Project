import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";

const LoadingSpinner = () => {
  const antIconLoading = <LoadingOutlined className="font-40" spin />;
  return (
    <div className="flex-center full-height full-width">
      <Spin indicator={antIconLoading} />
    </div>
  );
};

export default LoadingSpinner;
