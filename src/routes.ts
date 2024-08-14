import { UserController } from "./users/user.controller";
export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
];
