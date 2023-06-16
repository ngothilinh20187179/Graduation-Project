import { Typography } from "antd";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { memo } from "react";

const TopScreen = () => {
  
  return (
    <div>
      <Typography>test top screen</Typography>
      <LoadingSpinner />
    </div>
  );
};

export default memo(TopScreen);
