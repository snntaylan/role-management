/**
 * Roles Custom Hooks
 * Provides convenient hooks for components to interact with role state and actions
 */

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import {
  selectAllRoles,
  selectRolesLoading,
  selectRolesError,
  selectSelectedRole,
  selectRoleById,
  selectActiveRoles,
  selectRolesByPermission,
  selectParentRoles,
  selectChildRoles,
} from './rolesSelectors';
import {
  selectRole,
  clearError,
  setCurrentPage,
  resetRolesState,
} from './rolesSlice';
import { loadRoles } from './rolesSlice';

/**
 * Hook to get all roles with loading and error states
 */
export const useRoles = () => {
  const dispatch = useAppDispatch();
  const roles = useAppSelector(selectAllRoles);
  const loading = useAppSelector(selectRolesLoading);
  const error = useAppSelector(selectRolesError);

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    roles,
    loading,
    error,
    clearError: handleClearError,
  };
};

/**
 * Hook to get selected role
 */
export const useSelectedRole = () => {
  const dispatch = useAppDispatch();
  const selectedRole = useAppSelector(selectSelectedRole);
  const loading = useAppSelector(selectRolesLoading);

  const handleSelectRole = (roleId: string | null) => {
    dispatch(selectRole(roleId));
  };

  return {
    selectedRole,
    loading,
    selectRole: handleSelectRole,
  };
};

/**
 * Hook to get a specific role by ID
 */
export const useRoleById = (roleId: string) => {
  const role = useAppSelector((state) => selectRoleById(roleId)(state));
  return role;
};

/**
 * Hook to get active roles
 */
export const useActiveRoles = () => {
  const activeRoles = useAppSelector(selectActiveRoles);
  const loading = useAppSelector(selectRolesLoading);

  const dispatch = useAppDispatch();

  // Ensure roles are loaded once
  useEffect(() => {
    if (!activeRoles || activeRoles.length === 0) {
      dispatch(loadRoles());
    }
  }, []);

  return {
    roles: activeRoles,
    loading,
  };
};

/**
 * Hook to get roles with a specific permission
 */
export const useRolesByPermission = (permission: string) => {
  const roles = useAppSelector((state) => selectRolesByPermission(permission)(state));
  const loading = useAppSelector(selectRolesLoading);

  return {
    roles,
    loading,
  };
};

/**
 * Hook to get parent roles (roles without parent)
 */
export const useParentRoles = () => {
  const parentRoles = useAppSelector(selectParentRoles);
  const loading = useAppSelector(selectRolesLoading);

  return {
    roles: parentRoles,
    loading,
  };
};

/**
 * Hook to get child roles for a parent role
 */
export const useChildRoles = (parentRoleId: string) => {
  const childRoles = useAppSelector((state) => selectChildRoles(parentRoleId)(state));
  const loading = useAppSelector(selectRolesLoading);

  return {
    roles: childRoles,
    loading,
  };
};

/**
 * Hook to manage pagination
 */
export const useRolesPagination = () => {
  const dispatch = useAppDispatch();

  const handleSetPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return {
    setPage: handleSetPage,
  };
};

/**
 * Hook to reset roles state
 */
export const useResetRolesState = () => {
  const dispatch = useAppDispatch();

  const reset = () => {
    dispatch(resetRolesState());
  };

  return { reset };
};
