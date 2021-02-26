import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import loadJSON5 from 'src/common/utils/load-json5.util';

const grants = loadJSON5('../../config/grants.json5');
export const ACLModule = AccessControlModule.forRoles(new RolesBuilder(grants));
