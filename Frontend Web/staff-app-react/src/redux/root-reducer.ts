import AUTH_KEY from "features/staff_auth/constants/auth.keys";
import { authReducer } from "features/staff_auth/redux/auth.slice";
import CLASSES_KEY from "features/staff_classes/constants/classes.keys";
import { classesReducer } from "features/staff_classes/staff_classes";
import NOTIFICATION_KEY from "features/staff_notification/constants/notification.keys";
import { notificationReducer } from "features/staff_notification/staff_notification";
import SETTING_KEY from "features/staff_setting/constants/setting.keys";
import { settingReducer } from "features/staff_setting/staff_setting";
import USERS_KEY from "features/staff_users/constants/users.keys";
import { usersReducer } from "features/staff_users/staff_users";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  [USERS_KEY]: usersReducer,
  [AUTH_KEY]: authReducer,
  [CLASSES_KEY]: classesReducer,
  [NOTIFICATION_KEY]: notificationReducer,
  [SETTING_KEY]: settingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
