import AUTH_KEY from "features/teacher_auth/constants/auth.keys";
import { authReducer } from "features/teacher_auth/redux/auth.slice";
import FINANCE_KEY from "features/teacher_finance/constants/finance.keys";
import { financeReducer } from "features/teacher_finance/redux/finance.slice";
import NOTIFICATION_KEY from "features/teacher_notification/constants/notification.keys";
import { notificationReducer } from "features/teacher_notification/teacher_notification";
import SETTING_KEY from "features/teacher_setting/constants/setting.keys";
import { settingReducer } from "features/teacher_setting/teacher_setting";
import USERS_KEY from "features/teacher_users/constants/users.keys";
import { usersReducer } from "features/teacher_users/redux/users.slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  [AUTH_KEY]: authReducer,
  [NOTIFICATION_KEY]: notificationReducer,
  [SETTING_KEY]: settingReducer,
  [USERS_KEY]: usersReducer,
  [FINANCE_KEY]: financeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
