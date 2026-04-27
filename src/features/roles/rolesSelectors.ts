/**
 * Roles Selectors
 * Memoized selectors for accessing role state efficiently
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { IRole } from './rolesTypes';

// Base selector
export const selectRolesState = (state: RootState) => state.roles;

// Select all roles
export const selectAllRoles = createSelector(
  [selectRolesState],
  (rolesState) => rolesState.roles
);

// Select roles loading state
export const selectRolesLoading = createSelector(
  [selectRolesState],
  (rolesState) => rolesState.loading
);

// Select roles error
export const selectRolesError = createSelector(
  [selectRolesState],
  (rolesState) => rolesState.error
);

// Select selected role ID
export const selectSelectedRoleId = createSelector(
  [selectRolesState],
  (rolesState) => rolesState.selectedRoleId
);

// Select selected role
export const selectSelectedRole = createSelector(
  [selectAllRoles, selectSelectedRoleId],
  (roles, selectedId) => {
    return selectedId ? roles.find((role) => role.id === selectedId) : undefined;
  }
);

// Select role by ID
export const selectRoleById = (roleId: string) => createSelector(
  [selectAllRoles],
  (roles) => roles.find((role) => role.id === roleId)
);

// Select role by name
export const selectRoleByName = (roleName: string) => createSelector(
  [selectAllRoles],
  (roles) => roles.find((role) => role.name === roleName)
);

// Select total count
export const selectRolesTotalCount = createSelector(
  [selectRolesState],
  (rolesState) => rolesState.totalCount
);

// Select current page
export const selectRolesCurrentPage = createSelector(
  [selectRolesState],
  (rolesState) => rolesState.currentPage
);

// Select active roles only
export const selectActiveRoles = createSelector(
  [selectAllRoles],
  (roles) => roles.filter((role) => role.status === 'ACTIVE')
);

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
