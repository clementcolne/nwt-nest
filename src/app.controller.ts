import {
  Controller,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { HttpInterceptor } from './interceptors/http.interceptor';

@Controller()
@UseInterceptors(HttpInterceptor)
export class AppController {
  constructor(private authService: AuthService) {}

  /**
   * Authentificate a user and returns the jwt token
   * @param req username and password of the user
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() req) {
    return this.authService.login(req);
  }
}
