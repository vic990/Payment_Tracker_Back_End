import { Users } from "../entities/user";
import { userInfo } from "../lib/type";

export function getUserInfo(user: Users): userInfo {
  return {
    user_id: user.user_id || 0,
    user_name: user.user_name,
    user_lastname: user.user_lastname,
  };
}
