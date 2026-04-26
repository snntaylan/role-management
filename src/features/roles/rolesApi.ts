/**
 * Roles API Service
 * Handles all API calls related to roles management
 * This service layer abstracts the backend API calls
 */

import type { IRole, CreateRoleRequest, UpdateRoleRequest } from './rolesTypes';
import * as fakeRolesApi from './fakeRolesApi';

export const fetchRoles = async (page: number = 1, limit: number = 10): Promise<{ roles: IRole[]; totalCount: number }> => {
  return fakeRolesApi.getRoles(page, limit);
};

/**
 * Fetch a single role by ID
 */
export const fetchRoleById = async (roleId: string): Promise<IRole> => {
  const role = await fakeRolesApi.getRoleById(roleId);
  if (!role) throw new Error('Role not found');
  return role;
};

/**
 * Create a new role
 */
export const createRole = async (roleData: CreateRoleRequest): Promise<IRole> => {
  return fakeRolesApi.createRole(roleData as any);
};

/**
 * Update an existing role
 */
export const updateRole = async (roleId: string, roleData: UpdateRoleRequest): Promise<IRole> => {
  return fakeRolesApi.updateRole(roleId, roleData as any);
};

/**
 * Delete a role
 */
export const deleteRole = async (roleId: string): Promise<void> => {
  return fakeRolesApi.deleteRole(roleId);
};

/**
 * Fetch roles by status
 */
export const fetchRolesByStatus = async (
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED',
  page: number = 1,
  limit: number = 10
): Promise<{ roles: IRole[]; totalCount: number }> => {
  const res = await fakeRolesApi.getRoles(page, limit);
  return { roles: res.roles.filter(r => r.status === status), totalCount: res.totalCount };
};

/**
 * Fetch parent roles (roles without parent)
 */
export const fetchParentRoles = async (page: number = 1, limit: number = 10): Promise<{ roles: IRole[]; totalCount: number }> => {
  const res = await fakeRolesApi.getRoles(page, limit);
  const parentOnly = res.roles.filter(r => !r.parentRoleId);
  return { roles: parentOnly, totalCount: parentOnly.length };
};

/**
 * Fetch child roles for a parent role
 */
export const fetchChildRoles = async (
  parentRoleId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ roles: IRole[]; totalCount: number }> => {
  const res = await fakeRolesApi.getRoles(page, limit);
  const children = res.roles.filter(r => r.parentRoleId === parentRoleId);
  return { roles: children, totalCount: children.length };
};

/**
 * Duplicate a role
 */
export const duplicateRole = async (roleId: string, newRoleName: string): Promise<IRole> => {
  const role = await fakeRolesApi.getRoleById(roleId);
  if (!role) throw new Error('Role not found');
  const duplicated = await fakeRolesApi.createRole({ ...role, name: newRoleName });
  return duplicated;
};

export const fetchPermissions = async () => {
  return fakeRolesApi.getPermissions();
};

export const createPermission = async (data: { name: string; description?: string; category?: string }) => {
  return fakeRolesApi.createPermission(data as any);
};

export const deletePermission = async (permissionId: string) => {
  return fakeRolesApi.deletePermission(permissionId);
};
