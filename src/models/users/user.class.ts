import { DBFile } from 'models/common/db-file.class';
import { BaseModel } from '../base-model.class';
import { Role } from './role.enum';
import { UserStatus } from './user-status.enum';

export class User extends BaseModel {
  email = '';
  firstName = '';
  lastName = '';
  language = '';
  createdAt?: Date;
  updatedAt?: Date;
  deletesAt?: Date;
  role: Role = Role.User;
  avatar?: DBFile;
  status: UserStatus = UserStatus.Registered;
  intro = false;
}
