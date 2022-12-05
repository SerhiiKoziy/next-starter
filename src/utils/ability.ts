import { AbilityBuilder } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import { AppAbility, AppAbilityInstace } from 'models/common/ability.types';
import { ADMIN_ACCESS, Role } from 'models/users/role.enum';
import { User } from 'models/users/user.class';
import { createContext } from 'react';

export const AbilityContext = createContext<AppAbility>(new AppAbilityInstace());
export const Can = createContextualCan(AbilityContext.Consumer);

export const getAdminRole = (userRole: string): string | undefined => {
  const adminRoles = [Role.Admin, Role.GlobalAdmin];

  const adminRole = adminRoles.find(role => role === userRole);

  return adminRole;
};

export function defineAbilitiesFor(user: User) {
  const { can, rules } = new AbilityBuilder<AppAbility>(AppAbilityInstace);
  if (ADMIN_ACCESS.includes(user.role)) {
    can('manage', 'AdminPanel');
    can('read', 'PromotionCode');
  }

  if (user.role === Role.User) {
    can('manage', 'Project');
    can('read', 'PromotionCode');
  }

  if (user.role === Role.AccountManager) {
    can('manage', 'Company');
    can('manage', 'User');
    can('read', 'Project');
    can('delete', 'Project');
  }

  if (getAdminRole(user.role)) {
    can('read', 'Supergroup');
    can('read', 'Group');
    can('manage', 'PromotionCode');
    can('manage', 'Company');
    can('manage', 'User');
    can('manage', 'AccountManager');
    can('delete', 'Post');
    can('delete', 'Comment');
  }

  if (user.role === Role.SupergroupAdmin) {
    can('read', 'Supergroup');
    can('read', 'Group');
    can('read', 'Company');
    can('read', 'User');
    can('read', 'PromotionCode');

    can('manage', 'Project');
  }

  if (user.role === Role.GroupAdmin) {
    can('read', 'Group');
    can('read', 'Company');
    can('read', 'User');
    can('read', 'PromotionCode');

    can('manage', 'Project');
  }

  if (user.role === Role.CompanyAdmin) {
    can('manage', 'User');
    can('manage', 'MyCompany');
    can('manage', 'Project');
    can('read', 'PromotionCode');
  }

  // Rules for every user
  can('manage', 'Post', { userId: user.id });
  can('manage', 'Comment', { userId: user.id });

  return rules;
}

export function buildAbilityFor(user: User): AppAbility {
  return new AppAbilityInstace(defineAbilitiesFor(user));
}
