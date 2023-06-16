import AUTH_KEY from "features/admin_auth/constants/auth.keys";
import { authReducer } from "features/admin_auth/redux/auth.slice";
import { settingReducer } from "features/admin_setting/admin_setting";
import SETTING_KEY from "features/admin_setting/constants/setting.keys";
import { usersReducer } from "features/admin_users/admin_users";
import USERS_KEY from "features/admin_users/constants/users.keys";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  [USERS_KEY]: usersReducer,
  [AUTH_KEY]: authReducer,
  [SETTING_KEY]: settingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
