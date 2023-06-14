import AUTH_KEY from "features/staff_auth/constants/auth.keys";
import { authReducer } from "features/staff_auth/redux/auth.slice";
import USERS_KEY from "features/staff_users/constants/users.keys";
import { usersReducer } from "features/staff_users/staff_users";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  [USERS_KEY]: usersReducer,
  [AUTH_KEY]: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
