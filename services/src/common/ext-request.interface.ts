import { Request } from 'express';
import { GeneralUserProfile } from 'src/modules/users/dto/UserProfile.dto';

export interface ExtendedRequest extends Request {
  user: GeneralUserProfile;
}
