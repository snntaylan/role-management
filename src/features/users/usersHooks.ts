/**
 * Users Custom Hooks
 * Simplified API for component consumption of user state and actions
 */

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { ICreateUserRequest, IUpdateUserRequest, UserRole } from './usersTypes';
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  getUsersByRole,
  bulkUpdateUserRoles,
  selectUser,
  setSearchFilter,
  setRoleFilter,
  setActiveFilter,
  setDepartmentFilter,
  setPage,
  setPageSize,
  clearError,
  resetFilters,
} from './usersSlice';
import {
  selectAllUsers,
  selectSelectedUser,
  selectUsersLoading,
  selectUsersError,
  selectCurrentPage,
  selectPageSize,
  selectTotalUsers,
  selectNumberOfPages,
  selectFilters,
  selectCurrentPageUsers,
  selectActiveUsers,
  selectUserCountByRole,
  selectUsersDashboardStats,
  selectUserById as selectUserByIdSelector,
  selectUsersSortedByName,
  selectUsersGroupedByRole,
  selectUsersGroupedByDepartment,
  selectAllDepartments,
} from './usersSelectors';

/**
 * Hook: Get all users
 */
export const useUsers = () => {
  const users = useAppSelector(selectAllUsers);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const dispatch = useAppDispatch();

  const loadUsers = (page?: number, pageSize?: number) => {
    dispatch(fetchUsers({ page, pageSize }));
  };

  return { users, loading, error, loadUsers };
};

/**
 * Hook: Get selected user
 */
export const useSelectedUser = () => {
  const user = useAppSelector(selectSelectedUser);
  const dispatch = useAppDispatch();

  const selectUserHandler = (userId: string | null) => {
    dispatch(selectUser(userId));
  };

  return { user, selectUser: selectUserHandler };
};

/**
 * Hook: Get user by ID
 */
export const useUserById = (userId: string) => {
  const user = useAppSelector((state) => selectUserByIdSelector(userId)(state));
  const loading = useAppSelector(selectUsersLoading);
  const dispatch = useAppDispatch();

  const loadUser = () => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  };

  return { user, loading, loadUser };
};

/**
 * Hook: Create user
 */
export const useCreateUser = () => {
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const dispatch = useAppDispatch();

  const create = async (data: ICreateUserRequest) => {
    const result = await dispatch(createUser(data));
    return result.payload;
  };

  return { create, loading, error };
};

/**
 * Hook: Update user
 */
export const useUpdateUser = () => {
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const dispatch = useAppDispatch();

  const update = async (userId: string, data: IUpdateUserRequest) => {
    const result = await dispatch(updateUser({ userId, data }));
    return result.payload;
  };

  return { update, loading, error };
};

/**
 * Hook: Delete user
 */
export const useDeleteUser = () => {
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const dispatch = useAppDispatch();

  const remove = async (userId: string) => {
    await dispatch(deleteUser(userId));
  };

  return { remove, loading, error };
};

/**
 * Hook: Search users
 */
export const useSearchUsers = () => {
  const users = useAppSelector(selectAllUsers);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const dispatch = useAppDispatch();

  const search = async (query: string) => {
    if (query.trim()) {
      await dispatch(searchUsers(query));
    } else {
      dispatch(clearError());
    }
  };

  return { users, loading, error, search };
};

/**
 * Hook: Get users by role
 */
export const useUsersByRole = (role: UserRole | 'all') => {
  const allUsers = useAppSelector(selectAllUsers);
  const loading = useAppSelector(selectUsersLoading);
  const dispatch = useAppDispatch();

  const filteredUsers = role === 'all' ? allUsers : allUsers.filter(u => u.role === role);

  const loadByRole = async () => {
    if (role !== 'all') {
      await dispatch(getUsersByRole(role));
    }
  };

  return { users: filteredUsers, loading, loadByRole };
};

/**
 * Hook: User pagination
 */
export const useUsersPagination = () => {
  const currentPage = useAppSelector(selectCurrentPage);
  const pageSize = useAppSelector(selectPageSize);
  const total = useAppSelector(selectTotalUsers);
  const numberOfPages = useAppSelector(selectNumberOfPages);
  const users = useAppSelector(selectCurrentPageUsers);
  const loading = useAppSelector(selectUsersLoading);
  const dispatch = useAppDispatch();

  const goToPage = (page: number) => {
    dispatch(setPage(page));
  };

  const changePageSize = (size: number) => {
    dispatch(setPageSize(size));
  };

  return {
    users,
    currentPage,
    pageSize,
    total,
    numberOfPages,
    loading,
    goToPage,
    changePageSize,
  };
};

/**
 * Hook: User filters
 */
export const useUsersFilters = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const setSearch = (search: string) => {
    dispatch(setSearchFilter(search));
  };

  const setRole = (role: UserRole | 'all') => {
    dispatch(setRoleFilter(role));
  };

  const setActive = (isActive: boolean | 'all') => {
    dispatch(setActiveFilter(isActive));
  };

  const setDepartment = (department?: string) => {
    dispatch(setDepartmentFilter(department));
  };

  const reset = () => {
    dispatch(resetFilters());
  };

  return {
    filters,
    setSearch,
    setRole,
    setActive,
    setDepartment,
    reset,
  };
};

/**
 * Hook: Active users
 */
export const useActiveUsers = () => {
  const users = useAppSelector(selectActiveUsers);
  return { users };
};

/**
 * Hook: User count by role
 */
export const useUserCountByRole = () => {
  const counts = useAppSelector(selectUserCountByRole);
  return counts;
};

/**
 * Hook: Users dashboard statistics
 */
export const useUsersDashboardStats = () => {
  const stats = useAppSelector(selectUsersDashboardStats);
  return stats;
};

/**
 * Hook: Users sorted by name
 */
export const useUsersSortedByName = () => {
  const users = useAppSelector(selectUsersSortedByName);
  return users;
};

/**
 * Hook: Users grouped by role
 */
export const useUsersGroupedByRole = () => {
  const grouped = useAppSelector(selectUsersGroupedByRole);
  return grouped;
};

/**
 * Hook: Users grouped by department
 */
export const useUsersGroupedByDepartment = () => {
  const grouped = useAppSelector(selectUsersGroupedByDepartment);
  return grouped;
};

/**
 * Hook: Get all departments
 */
export const useAllDepartments = () => {
  const departments = useAppSelector(selectAllDepartments);
  return departments;
};

/**
 * Hook: Bulk update user roles
 */
export const useBulkUpdateUserRoles = () => {
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const dispatch = useAppDispatch();

  const bulkUpdate = async (userIds: string[], role: string) => {
    const result = await dispatch(bulkUpdateUserRoles({ userIds, role }));
    return result.payload;
  };

  return { bulkUpdate, loading, error };
};

/**
 * Hook: Clear errors
 */
export const useClearErrors = () => {
  const dispatch = useAppDispatch();

  const clearErr = () => {
    dispatch(clearError());
  };

  return clearErr;
};
