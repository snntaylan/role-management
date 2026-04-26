/**
 * User Types for Healthcare Management System
 * 
 * Supports user model with id, name, role, permissions structure
 * as specified in healthcare portal requirements
 */

import type { IPermission } from '../roles/rolesTypes';

/**
 * User Role Types
 * Healthcare organization roles: Admin, Doctor, Patient
 */
export type UserRole = 'admin' | 'doctor' | 'patient';

/**
 * User Model Structure
 * Aligns with minimum requirements: { id, name, role, permissions }
 */
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[]; // Array of permission IDs
  department?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

/**
 * User Form Data (for creation and updates)
 */
export interface IUserFormData {
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
  department?: string;
}

/**
 * User Creation Request DTO
 */
export interface ICreateUserRequest {
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
  department?: string;
}

/**
 * User Update Request DTO
 */
export interface IUpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
  permissions?: string[];
  department?: string;
  isActive?: boolean;
}

/**
 * User Response DTO from API
 */
export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
  department?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

/**
 * Bulk User Response for list operations
 */
export interface IUserListResponse {
  users: IUser[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * User State
 * Normalized state structure for Redux
 */
export interface IUsersState {
  // Entities - normalized storage
  byId: Record<string, IUser>;
  allIds: string[];

  // UI State
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;

  // Pagination
  currentPage: number;
  pageSize: number;
  total: number;

  // Filters
  filters: {
    search: string;
    role: UserRole | 'all';
    isActive: boolean | 'all';
    department?: string;
  };

  // Validation
  validationErrors: Record<string, string>;
}

/**
 * Role-specific permissions mapping
 */
export const ROLE_PERMISSIONS_MAP: Record<UserRole, string[]> = {
  admin: ['create-user', 'read-user', 'update-user', 'delete-user', 'manage-roles', 'manage-permissions'],
  doctor: ['read-user', 'update-own', 'view-patient-data', 'create-records'],
  patient: ['read-own', 'update-own', 'view-own-records'],
};

/**
 * User role display labels for UI
 */
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrator',
  doctor: 'Doctor',
  patient: 'Patient',
};

/**
 * User status display options
 */
export const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active', color: 'success' },
  { value: 'inactive', label: 'Inactive', color: 'danger' },
] as const;

/**
 * Validation constraints
 */
export const USER_VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  DEPARTMENT_MAX_LENGTH: 50,
} as const;
