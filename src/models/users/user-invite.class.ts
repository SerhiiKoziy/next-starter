import { Role } from './role.enum';

export class UserInviteForm {
  items: UserInvite[] = [];
}

export class UserInvite {
  email = '';
  role: Role = Role.User;
  companyId? = '';
  groupId? = '';
  supergroupId? = '';
}
