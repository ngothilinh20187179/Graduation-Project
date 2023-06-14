import { getUserById } from "features/admin_users/admin_users";
import { useEffect } from "react";
import { useAppDispatch } from "redux/store";

const TopScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserById(1))
  }, [dispatch]);
  
  return (
    <div>
      <p>root</p>
    </div>
  );
};

export default TopScreen;
