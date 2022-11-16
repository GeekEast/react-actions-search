import { ISearch } from './interfaces';

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

export const ROLE_ACTIONS_MAPPINGS = {
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
