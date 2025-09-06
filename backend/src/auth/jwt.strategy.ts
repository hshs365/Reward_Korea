
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // TODO: 환경 변수로 변경해야 합니다.
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneByUserNo(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
