import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { from, map, Observable } from 'rxjs';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Return the user if the passwords + username match, otherwise false
   */
  validateUser(pseudo: string, pass: string): Observable<UserEntity> {
    return this._usersService
      .findOne(pseudo)
      .pipe(
        map((user: UserEntity) =>
          !!user && bcrypt.compareSync(pass, user.password) ? user : null,
        ),
      );
  }

  /**
   * Build and return the JWT token for the given user
   */
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
