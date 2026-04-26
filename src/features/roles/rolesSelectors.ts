/**
 * Roles Selectors
 * Memoized selectors for accessing role state efficiently
 */

import type { RootState } from '../../app/store';
import type { IRole } from './rolesTypes';

// Base selector
export const selectRolesState = (state: RootState) => state.roles;

// Select all roles
export const selectAllRoles = (state: RootState): IRole[] => state.roles.roles;

// Select roles loading state
export const selectRolesLoading = (state: RootState): boolean => state.roles.loading;

// Select roles error
export const selectRolesError = (state: RootState): string | null => state.roles.error;

// Select selected role ID
export const selectSelectedRoleId = (state: RootState): string | null => state.roles.selectedRoleId;

// Select selected role
export const selectSelectedRole = (state: RootState): IRole | undefined => {
  const selectedId = state.roles.selectedRoleId;
  return selectedId ? state.roles.roles.find((role) => role.id === selectedId) : undefined;
};

// Select role by ID
export const selectRoleById = (roleId: string) => (state: RootState): IRole | undefined => {
  return state.roles.roles.find((role) => role.id === roleId);
};

// Select role by name
export const selectRoleByName = (roleName: string) => (state: RootState): IRole | undefined => {
  return state.roles.roles.find((role) => role.name === roleName);
};

// Select total count
export const selectRolesTotalCount = (state: RootState): number => state.roles.totalCount;

// Select current page
export const selectRolesCurrentPage = (state: RootState): number => state.roles.currentPage;

// Select active roles only
export const selectActiveRoles = (state: RootState): IRole[] => {
  return state.roles.roles.filter((role) => role.status === 'ACTIVE');
};

// Select inactive roles
export const selectInactiveRoles = (state: RootState): IRole[] => {
  return state.roles.roles.filter((role) => role.status === 'INACTIVE');
};

// Select archived roles
export const selectArchivedRoles = (state: RootState): IRole[] => {
  return state.roles.roles.filter((role) => role.status === 'ARCHIVED');
};

// Select roles with specific permission
export const selectRolesByPermission = (permission: string) => (state: RootState): IRole[] => {
  return state.roles.roles.filter((role) => role.permissions.includes(permission as never));
};

// Select parent roles (roles without a parent)
export const selectParentRoles = (state: RootState): IRole[] => {
  return state.roles.roles.filter((role) => !role.parentRoleId);
};

// Select child roles for a given parent
export const selectChildRoles = (parentRoleId: string) => (state: RootState): IRole[] => {
  return state.roles.roles.filter((role) => role.parentRoleId === parentRoleId);
};

// Select role count
export const selectRolesCount = (state: RootState): number => state.roles.roles.length;

// Select roles sorted by name
export const selectRolesSortedByName = (state: RootState): IRole[] => {
  return [...state.roles.roles].sort((a, b) => a.name.localeCompare(b.name));
};

// Select roles sorted by creation date (newest first)
export const selectRolesSortedByCreatedAt = (state: RootState): IRole[] => {
  return [...state.roles.roles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};
