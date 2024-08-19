import { UserController } from "./controllers/user.controller";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "byId",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "create",
  },
  {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "delete",
  },
];
