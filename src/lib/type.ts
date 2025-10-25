import { Users } from "../entities/user";

export type userInfo = Pick<Users, "user_id" | "user_name" | "user_lastname">;
