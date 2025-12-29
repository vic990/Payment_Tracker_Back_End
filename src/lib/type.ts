import { Users } from "../entities/user";

export type userInfo = Pick<
  Users,
  "user_id" | "user_name" | "user_lastname" | "role_id"
>;
export type users = Omit<Users, "password_hash">;

// export interface users {
//           "user_id": number,
//         "user_name": string,
//         "user_lastname": string,
//         "email": string,
//         "role_id": number
// }
