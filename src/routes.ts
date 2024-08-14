import {UserController} from "./users/user.controller";

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
        action: "byId"
    }
];
