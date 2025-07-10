import { Users } from "../entities/user";
import { userInfo } from "../lib/types";

export function getuserInfo(user: Users): userInfo {
  let newUser: userInfo;
  newUser.user_id = user.user_id;
  newUser.user_name = user.user_name;
  newUser.user_lastname = user.user_lastname;

  return newUser;
}
