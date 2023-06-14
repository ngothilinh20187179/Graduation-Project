import AUTH_KEY from "features/admin_auth/constants/auth.keys";
import { authReducer } from "features/admin_auth/redux/auth.slice";
import { usersReducer } from "features/admin_users/admin_users";
import USERS_KEY from "features/admin_users/constants/users.keys";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  [USERS_KEY]: usersReducer,
  [AUTH_KEY]: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
