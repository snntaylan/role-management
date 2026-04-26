import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { IUser } from './usersTypes';

/**
 * Base selector: get users slice
 */
const selectUsersState = (state: RootState) => state.users;

/**
 * Get normalized users object
 */
export const selectUsersById = createSelector([selectUsersState], (state) => state.byId);

/**
 * Get all user IDs
 */
export const selectAllUserIds = createSelector([selectUsersState], (state) => state.allIds);

/**
 * Get all users as array
 */
export const selectAllUsers = createSelector(
  [selectUsersById, selectAllUserIds],
  (byId, allIds) => allIds.map(id => byId[id]).filter(Boolean)
);

/**
 * Get selected user ID
 */
export const selectSelectedUserId = createSelector([selectUsersState], (state) => state.selectedUserId);

/**
 * Get selected user
 */
export const selectSelectedUser = createSelector(
  [selectUsersById, selectSelectedUserId],
  (byId, selectedId) => (selectedId ? byId[selectedId] : null)
);

/**
 * Get user by ID
 */
export const selectUserById = (userId: string) =>
  createSelector([selectUsersById], (byId) => byId[userId] || null);

/**
 * Get loading state
 */
export const selectUsersLoading = createSelector([selectUsersState], (state) => state.loading);

/**
 * Get error message
 */
export const selectUsersError = createSelector([selectUsersState], (state) => state.error);

/**
 * Get validation errors
 */
export const selectValidationErrors = createSelector([selectUsersState], (state) => state.validationErrors);

/**
 * Get pagination state
 */
export const selectPagination = createSelector([selectUsersState], (state) => ({
  currentPage: state.currentPage,
  pageSize: state.pageSize,
  total: state.total,
}));

/**
 * Get current page
 */
export const selectCurrentPage = createSelector([selectUsersState], (state) => state.currentPage);

/**
 * Get page size
 */
export const selectPageSize = createSelector([selectUsersState], (state) => state.pageSize);

/**
 * Get filters
 */
export const selectFilters = createSelector([selectUsersState], (state) => state.filters);

/**
 * Get search filter
 */
export const selectSearchFilter = createSelector([selectFilters], (filters) => filters.search);

/**
 * Get role filter
 */
export const selectRoleFilter = createSelector([selectFilters], (filters) => filters.role);

/**
 * Get active filter
 */
export const selectActiveFilter = createSelector([selectFilters], (filters) => filters.isActive);

/**
 * Get department filter
 */
export const selectDepartmentFilter = createSelector([selectFilters], (filters) => filters.department);

/**
 * Get users filtered by search
 */
export const selectFilteredBySearch = createSelector(
  [selectAllUsers, selectSearchFilter],
  (users, search) => {
    if (!search) return users;
    const searchLower = search.toLowerCase();
    return users.filter(
      u => u.name.toLowerCase().includes(searchLower) || u.email.toLowerCase().includes(searchLower)
    );
  }
);

/**
 * Get users by role
 */
export const selectUsersByRole = (role: string) =>
  createSelector([selectAllUsers], (users) => {
    if (role === 'all') return users;
    return users.filter(u => u.role === role);
  });

/**
 * Get active users
 */
export const selectActiveUsers = createSelector([selectAllUsers], (users) => users.filter(u => u.isActive));

/**
 * Get inactive users
 */
export const selectInactiveUsers = createSelector([selectAllUsers], (users) => users.filter(u => !u.isActive));

/**
 * Get user count by role
 */
export const selectUserCountByRole = createSelector([selectAllUsers], (users) => ({
  admin: users.filter(u => u.role === 'admin').length,
  doctor: users.filter(u => u.role === 'doctor').length,
  patient: users.filter(u => u.role === 'patient').length,
  total: users.length,
}));

/**
 * Get dashboard statistics
 */
export const selectUsersDashboardStats = createSelector(
  [selectAllUsers, selectUserCountByRole],
  (users, countByRole) => ({
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    inactiveUsers: users.filter(u => !u.isActive).length,
    adminCount: countByRole.admin,
    doctorCount: countByRole.doctor,
    patientCount: countByRole.patient,
    departments: [...new Set(users.map(u => u.department).filter(Boolean))],
  })
);

/**
 * Get filtered users (combines all filters)
 */
export const selectFilteredUsers = createSelector(
  [selectAllUsers, selectFilters],
  (users, filters) => {
    let filtered = users;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        u => u.name.toLowerCase().includes(searchLower) || u.email.toLowerCase().includes(searchLower)
      );
    }

    // Apply role filter
    if (filters.role !== 'all') {
      filtered = filtered.filter(u => u.role === filters.role);
    }

    // Apply active status filter
    if (filters.isActive !== 'all') {
      filtered = filtered.filter(u => u.isActive === filters.isActive);
    }

    // Apply department filter
    if (filters.department) {
      filtered = filtered.filter(u => u.department === filters.department);
    }

    return filtered;
  }
);

/**
 * Get total filtered users count
 */
export const selectFilteredUsersCount = createSelector([selectFilteredUsers], (users) => users.length);

/**
 * Get users for current page
 */
export const selectCurrentPageUsers = createSelector(
  [selectFilteredUsers, selectCurrentPage, selectPageSize],
  (filteredUsers, page, pageSize) => {
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    return filteredUsers.slice(startIdx, endIdx);
  }
);

/**
 * Get number of pages
 */
export const selectNumberOfPages = createSelector([selectFilteredUsersCount, selectPageSize], (total, pageSize) =>
  Math.ceil(total / pageSize)
);

/**
 * Get total users count
 */
export const selectTotalUsers = createSelector([selectFilteredUsersCount], (count) => count);

/**
 * Get users sorted by name
 */
export const selectUsersSortedByName = createSelector([selectAllUsers], (users) =>
  [...users].sort((a, b) => a.name.localeCompare(b.name))
);

/**
 * Get users sorted by creation date (newest first)
 */
export const selectUsersSortedByCreatedAt = createSelector([selectAllUsers], (users) =>
  [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
);

/**
 * Get grouped users by department
 */
export const selectUsersGroupedByDepartment = createSelector([selectAllUsers], (users) => {
  const grouped: Record<string, IUser[]> = {};

  users.forEach((user) => {
    const dept = user.department || 'Unassigned';
    if (!grouped[dept]) {
      grouped[dept] = [];
    }
    grouped[dept].push(user);
  });

  return grouped;
});

/**
 * Get grouped users by role
 */
export const selectUsersGroupedByRole = createSelector([selectAllUsers], (users) => {
  const grouped: Record<string, IUser[]> = {
    admin: [],
    doctor: [],
    patient: [],
  };

  users.forEach((user) => {
    grouped[user.role].push(user);
  });

  return grouped;
});

/**
 * Check if user email is unique
 */
export const selectIsEmailUnique = (email: string) =>
  createSelector([selectAllUsers], (users) => !users.some(u => u.email.toLowerCase() === email.toLowerCase()));

/**
 * Check if user name is unique
 */
export const selectIsNameUnique = (name: string) =>
  createSelector([selectAllUsers], (users) => !users.some(u => u.name.toLowerCase() === name.toLowerCase()));

/**
 * Get users with specific permission
 */
export const selectUsersWithPermission = (permission: string) =>
  createSelector([selectAllUsers], (users) => users.filter(u => u.permissions.includes(permission)));

/**
 * Get all departments
 */
export const selectAllDepartments = createSelector([selectAllUsers], (users) => {
  const departments = [...new Set(users.map(u => u.department).filter(Boolean))];
  return departments.sort();
});
