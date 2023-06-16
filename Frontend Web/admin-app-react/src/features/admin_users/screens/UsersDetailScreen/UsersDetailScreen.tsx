import { getUserById } from "features/admin_users/admin_users";
import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "redux/root-reducer";
import { useAppDispatch, useAppSelector } from "redux/store";

const UsersDetailScreen = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.users);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getUserById(Number(id)))
  }, [id, dispatch, user]);
  
  return (
    <div>
      <p>test</p>
    </div>
  );
};

export default memo(UsersDetailScreen);
