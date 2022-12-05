import { TFunction } from 'next-i18next';

export enum Role {
  GlobalAdmin = 'global_admin',

  Admin = 'admin',
  AccountManager = 'account_manager',
  SupergroupAdmin = 'super_group_admin',
  GroupAdmin = 'group_admin',
  CompanyAdmin = 'company_admin',

  //professional user
  User = 'user',
  PrivateUser = 'private_user',
}

export const rolesSelectOptions = (t: TFunction, isAdmin = false) => {
  const companyAdminOnlyRoles = [Role.CompanyAdmin, Role.User];
  const values = isAdmin ? Object.values(Role) : companyAdminOnlyRoles;

  isAdmin && values.filter(role => role !== Role.GlobalAdmin);

  return values.map(role => ({
    label: t(`common:userRoles.${role}`),
    value: role,
  }));
};

export const ALL_ROLES = Object.values(Role);

export const NO_PRIVATE_USERS = Object.values(Role).filter(
  (role: Role) => role !== Role.PrivateUser,
);

export const MY_PROJECTS_ACCESS = [
  Role.SupergroupAdmin,
  Role.GroupAdmin,
  Role.CompanyAdmin,
  Role.User,
];

export const ADMIN_ACCESS = [Role.AccountManager, Role.Admin, Role.GlobalAdmin];
