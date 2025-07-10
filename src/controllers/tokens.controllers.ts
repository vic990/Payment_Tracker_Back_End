import { generatefreshToken, generateAccessToken } from "../auth/generateToken";
import { getuserInfo } from "../auth/generateUserInfo";
import { AppDataSource } from "../database/data-source";
import { refresh_tokens } from "../entities/token";
import { Users } from "../entities/user";

export async function saveToken(token: refresh_tokens): Promise<boolean> {
  const { user_id } = token;

  const tokensRepository = await AppDataSource.getRepository(
    refresh_tokens
  ).save(token);

  return tokensRepository ? true : false;
}

export async function createRefreshtoken(user: Users): Promise<string> {
  const refreshToken = generatefreshToken(getuserInfo(user));
  const newToken: refresh_tokens = {
    token: refreshToken,
    user_id: user.user_id,
  };

  const savedToken = await saveToken(newToken);

  return savedToken ? refreshToken : "";
}

export function createAccessToken(user: Users): string {
  return generateAccessToken(getuserInfo(user));
}
