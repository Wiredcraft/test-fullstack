import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-poll') {
  constructor(
    @InjectModel(User) private model: ReturnModelType<typeof User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    } as StrategyOptions);
  }

  async validate({id}) {
    console.log('validatevalidate', id)
    return await this.model.findById(id);
  }
}