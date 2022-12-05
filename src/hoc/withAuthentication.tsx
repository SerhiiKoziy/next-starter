import { useUser } from 'hooks-data/use-user';
import { Role } from 'models/users/role.enum';
import { useRouter } from 'next/router';
import React from 'react';
import { AbilityContext, buildAbilityFor } from 'utils/ability';
import { webRoutes } from 'utils/web-routes';

const withAuthentication = <TOriginalProps extends Record<string, unknown>>(
  WrappedComponent: React.FC<TOriginalProps>,
  roles: Role[] = [],
  authenticationOptional = false,
): React.FC<TOriginalProps> => {
  const RequiresAuthComp: React.FC<TOriginalProps> = props => {
    const { user } = useUser(authenticationOptional);
    const router = useRouter();

    if (user) {
      if (!roles.length || (roles.length && roles.includes(user.role))) {
        return (
          <AbilityContext.Provider value={buildAbilityFor(user)}>
            <WrappedComponent {...props} />
          </AbilityContext.Provider>
        );
      } else {
        router.replace(webRoutes.home);
        return null;
      }
    } else {
      return authenticationOptional ? <WrappedComponent {...props} /> : <div>loading</div>;
    }
  };

  RequiresAuthComp.displayName = `withAuthentication(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return RequiresAuthComp;
};

export default withAuthentication;
