/**
 * Role Management System - Core Types
 * Defines all TypeScript interfaces and enums for roles, permissions, and access control
 */

/**
 * Permission - defines all possible permissions in the system
 */
export const Permission = {
  // User Management
  CREATE_USER: 'CREATE_USER',
  READ_USER: 'READ_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',

  // Role Management
  CREATE_ROLE: 'CREATE_ROLE',
  READ_ROLE: 'READ_ROLE',
  UPDATE_ROLE: 'UPDATE_ROLE',
  DELETE_ROLE: 'DELETE_ROLE',
  ASSIGN_ROLE: 'ASSIGN_ROLE',

  // Permission Management
  CREATE_PERMISSION: 'CREATE_PERMISSION',
  READ_PERMISSION: 'READ_PERMISSION',
  UPDATE_PERMISSION: 'UPDATE_PERMISSION',
  DELETE_PERMISSION: 'DELETE_PERMISSION',

  // Audit & Logging
  VIEW_AUDIT_LOG: 'VIEW_AUDIT_LOG',
  EXPORT_AUDIT_LOG: 'EXPORT_AUDIT_LOG',

  // System Administration
  ADMIN_PANEL: 'ADMIN_PANEL',
  MANAGE_SYSTEM_SETTINGS: 'MANAGE_SYSTEM_SETTINGS',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

/**
 * Role Status - defines the lifecycle states of a role
 */
export const RoleStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ARCHIVED: 'ARCHIVED',
} as const;

export type RoleStatus = (typeof RoleStatus)[keyof typeof RoleStatus];

/**
 * Permission interface - represents a single permission in the system
 */
export interface IPermission {
  id: string;
  name: Permission;
  description: string;
  category: string; // e.g., 'User Management', 'Role Management', etc.
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}

/**
 * Role interface - represents a role with associated permissions
 */
export interface IRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[]; // Array of permission names
  status: RoleStatus;
  parentRoleId?: string; // For role hierarchy
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
  createdBy: string; // User ID who created this role
  updatedBy: string; // User ID who last updated this role
}

/**
 * User Role Assignment interface - tracks which roles a user has
 */
export interface IUserRoleAssignment {
  id: string;
  userId: string;
  roleId: string;
  assignedAt: string; // ISO 8601 timestamp
  assignedBy: string; // User ID who made the assignment
  expiresAt?: string; // Optional expiration date
  isActive: boolean;
}

/**
 * Access Control interface - represents a permission check result
 */
export interface IAccessControl {
  hasPermission: boolean;
  permission: Permission;
  userId: string;
  reason?: string; // Explanation if permission is denied
}

/**
 * Audit Log interface - tracks changes to roles and permissions
 */
export interface IAuditLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ASSIGN' | 'REVOKE';
  entityType: 'ROLE' | 'PERMISSION' | 'USER_ROLE_ASSIGNMENT';
  entityId: string;
  entityName: string;
  performedBy: string; // User ID who performed the action
  changes?: Record<string, { oldValue: unknown; newValue: unknown }>; // Track what changed
  timestamp: string; // ISO 8601 timestamp
  status: 'SUCCESS' | 'FAILURE';
  errorMessage?: string;
}

/**
 * Redux State interfaces
 */

/**
 * Roles state - manages all roles in the system
 */
export interface IRolesState {
  roles: IRole[];
  loading: boolean;
  error: string | null;
  selectedRoleId: string | null;
  totalCount: number; // For pagination
  currentPage: number;
}

/**
 * Permissions state - manages all permissions in the system
 */
export interface IPermissionsState {
  permissions: IPermission[];
  loading: boolean;
  error: string | null;
  selectedPermissionId: string | null;
  totalCount: number; // For pagination
  currentPage: number;
}

/**
 * User Role Assignment state - manages user role assignments
 */
export interface IUserRoleAssignmentsState {
  assignments: IUserRoleAssignment[];
  loading: boolean;
  error: string | null;
  totalCount: number; // For pagination
  currentPage: number;
}

/**
 * Access Control state - manages permission checks and access decisions
 */
export interface IAccessControlState {
  userPermissions: Set<Permission>; // Set of permissions for current user
  loading: boolean;
  error: string | null;
  lastCheckedAt: string | null; // When permissions were last verified
}

/**
 * Audit Log state - manages system audit logs
 */
export interface IAuditLogState {
  logs: IAuditLog[];
  loading: boolean;
  error: string | null;
  totalCount: number; // For pagination
  currentPage: number;
  filters: {
    entityType?: 'ROLE' | 'PERMISSION' | 'USER_ROLE_ASSIGNMENT';
    action?: 'CREATE' | 'UPDATE' | 'DELETE' | 'ASSIGN' | 'REVOKE';
    dateFrom?: string;
    dateTo?: string;
  };
}

/**
 * API Request/Response DTOs
 */

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: Permission[];
  parentRoleId?: string;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissions?: Permission[];
  status?: RoleStatus;
  parentRoleId?: string;
}

export interface AssignRoleRequest {
  userId: string;
  roleId: string;
  expiresAt?: string;
}

export interface RevokeRoleRequest {
  userRoleAssignmentId: string;
}
