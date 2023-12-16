import AUTH_KEY from "features/student_auth/constants/auth.keys";
import { authReducer } from "features/student_auth/redux/auth.slice";
import FINANCE_KEY from "features/student_finance/constants/finance.keys";
import { financeReducer } from "features/student_finance/redux/finance.slice";
import NOTIFICATION_KEY from "features/student_notification/constants/notification.keys";
import { notificationReducer } from "features/student_notification/student_notification";
import SETTING_KEY from "features/student_setting/constants/setting.keys";
import { settingReducer } from "features/student_setting/student_setting";
import USERS_KEY from "features/student_users/constants/users.keys";
import { usersReducer } from "features/student_users/redux/users.slice";
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
