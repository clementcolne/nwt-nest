import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  /**
   * Constructor of LocalStrategy
   * @param _authService AuthService
   */
  constructor(private _authService: AuthService) {
    super();
  }

  /**
   * Return an error if the user is not authorized with his JWT token
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this._authService
      .validateUser(username, password)
      .toPromise();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
