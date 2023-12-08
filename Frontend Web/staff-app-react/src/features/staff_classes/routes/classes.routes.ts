import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { ClassesRoutePaths } from "../staff_classes";

const SUBJECTS_SCREEN: RouteItem = {
  id: "staff-classes-subjects",
  path: ClassesRoutePaths.SUBJECTS,
  component: lazy(() => import("../screens/SubjectScreen/SubjectScreen")),
};

const EDIT_SUBJECT_SCREEN: RouteItem = {
  id: "staff-classes-edit-subject",
  path: ClassesRoutePaths.EDIT_SUBJECT,
  component: lazy(
    () => import("../screens/EditSubjectScreen/EditSubjectScreen")
  ),
};

const CREATE_SUBJECT_SCREEN: RouteItem = {
  id: "staff-classes-create-subject",
  path: ClassesRoutePaths.CREATE_SUBJECT,
  component: lazy(
    () => import("../screens/CreateSubjectScreen/CreateSubjectScreen")
  ),
};

const ROOMS_SCREEN: RouteItem = {
  id: "staff-classes-rooms",
  path: ClassesRoutePaths.ROOMS,
  component: lazy(() => import("../screens/RoomScreen/RoomScreen")),
};

const CREATE_ROOM_SCREEN: RouteItem = {
  id: "staff-classes-create-room",
  path: ClassesRoutePaths.CREATE_ROOM,
  component: lazy(
    () => import("../screens/CreateRoomScreen/CreateRoomScreen")
  ),
};

const EDIT_ROOM_SCREEN: RouteItem = {
  id: "staff-classes-edit-room",
  path: ClassesRoutePaths.EDIT_ROOM,
  component: lazy(
    () => import("../screens/EditRoomScreen/EditRoomScreen")
  ),
};

const CLASSES_SCREEN: RouteItem = {
  id: "staff-classes",
  path: ClassesRoutePaths.CLASSES,
  component: lazy(() => import("../screens/ClassScreen/ClassScreen")),
};

const CLASS_DETAIL_SCREEN: RouteItem = {
  id: "staff-class-detail",
  path: ClassesRoutePaths.GET_CLASS,
  component: lazy(() => import("../screens/ClassDetailScreen/ClassDetailScreen")),
};

const CREATE_CLASS_SCREEN: RouteItem = {
  id: "staff-classes-create-class",
  path: ClassesRoutePaths.CREATE_CLASS,
  component: lazy(
    () => import("../screens/CreateClassScreen/CreateClassScreen")
  ),
};

export const CLASSES_ROUTES = [
  SUBJECTS_SCREEN,
  EDIT_SUBJECT_SCREEN,
  CREATE_SUBJECT_SCREEN,
  ROOMS_SCREEN,
  CREATE_ROOM_SCREEN,
  EDIT_ROOM_SCREEN,
  CLASSES_SCREEN,
  CLASS_DETAIL_SCREEN,
  CREATE_CLASS_SCREEN,
];
