import { refresh_tokens } from "../entities/refreshTokens";
import { RefreshTokensRepository } from "../repositories/refreshTokens.repository";
import { getUserInfo } from "../lib/getUserInfo";
import { userInfo } from "../lib/type";
import { generateRefreshToken } from "../lib/authenticate";

export class AuthTokenService {
  private authTokenRepository: RefreshTokensRepository;

  constructor() {
    this.authTokenRepository = new RefreshTokensRepository();
  }

  async saveRefreshToken(infoUser: userInfo): Promise<string> {
    const refreshToken = generateRefreshToken(infoUser);
    //hay que implementar el update del refreshtoken
    return refreshToken;
  }
}
