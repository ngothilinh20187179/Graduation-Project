import AUTH_KEY from "features/admin_auth/constants/auth.keys";
import { authReducer } from "features/admin_auth/redux/auth.slice";
import { classesReducer } from "features/admin_classes/admin_classes";
import CLASSES_KEY from "features/admin_classes/constants/classes.keys";
import { notificationReducer } from "features/admin_notification/admin_notification";
import NOTIFICATION_KEY from "features/admin_notification/constants/notification.keys";
import POSITIONS_KEY from "features/admin_position/constants/positions.keys";
import { positionsReducer } from "features/admin_position/redux/position.slice";
import { settingReducer } from "features/admin_setting/admin_setting";
import SETTING_KEY from "features/admin_setting/constants/setting.keys";
import { spendingReducer } from "features/admin_spending/admin_spending";
import SPENDINGS_KEY from "features/admin_spending/constants/spending.keys";
import { usersReducer } from "features/admin_users/admin_users";
import USERS_KEY from "features/admin_users/constants/users.keys";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  [USERS_KEY]: usersReducer,
  [AUTH_KEY]: authReducer,
  [SETTING_KEY]: settingReducer,
  [CLASSES_KEY]: classesReducer,
  [NOTIFICATION_KEY]: notificationReducer,
  [POSITIONS_KEY]: positionsReducer,
  [SPENDINGS_KEY]: spendingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
