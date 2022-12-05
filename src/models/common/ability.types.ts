import { Ability, AbilityClass } from '@casl/ability';
import { User } from 'models/users/user.class';

export type AbilityActions = 'view' | 'manage' | 'create' | 'read' | 'update' | 'delete';

export type Subjects =
  | 'User'
  | User
  | 'Company'
  | 'MyCompany'
  | 'Project'
  | 'Group'
  | 'Supergroup'
  | 'Notification'
  | Notification
  | 'AccountManager'
  | 'Post'
  | Comment
  | 'Comment'
  | 'AdminPanel'
  | 'PromotionCode';

export type AppAbility = Ability<[AbilityActions, Subjects]>;
export const AppAbilityInstace = Ability as AbilityClass<AppAbility>;
