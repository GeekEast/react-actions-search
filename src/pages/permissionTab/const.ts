import { ISearch } from './interfaces';
import { intersection, compact } from 'lodash';

export const ROLE_TEMPLATE_OPTIONS = [
  {
    label: 'Hiring Manager',
    value: 'ph-role-hiring-manager',
  },

  {
    label: 'Recruiter',
    value: 'ph-role-recruiter',
  },
];

export const ROLE_ACTIONS_MAPPINGS: Record<string, string[]> = {
  'ph-role-hiring-manager': ['apps:viewVacancy'],
  'ph-role-recruiter': ['apps:viewVacancy', 'org:viewUser', 'org:editUser'],
};

export const SECTION_ACTIONS_MAPPINGS: ISearch = {
  'Vacancy Management': [{ name: 'View Vacancy', value: 'apps:viewVacancy' }],
  'User Management': [
    { name: 'View User', value: 'org:viewUser' },
    { name: 'Edit User', value: 'org:editUser' },
  ],
};

export const getActionsFromSectionActionsMappings = (mappings: ISearch) => {
  return Object.values(mappings).reduce((acc, curr) => {
    const actionNames = curr.map((action) => action.value);
    return acc.concat(actionNames);
  }, [] as string[]);
};

export const ALL_ACTION_NAMES: string[] = getActionsFromSectionActionsMappings(
  SECTION_ACTIONS_MAPPINGS
);

export const getActionsTemplateFromActions = (actions: string[]) => {
  const matchedRoleNames = compact(
    Object.keys(ROLE_ACTIONS_MAPPINGS).map((roleKey) => {
      const roleActions = ROLE_ACTIONS_MAPPINGS[roleKey];
      if (
        intersection(roleActions, actions).length === roleActions.length &&
        roleActions.length === actions.length
      ) {
        return roleKey;
      }
      return null;
    })
  );

  if (matchedRoleNames.length === 1) {
    return matchedRoleNames[0];
  }

  if (matchedRoleNames.length > 1) {
    console.warn("There's more than one matched role name");
    return matchedRoleNames[0];
  }

  return null;
};
