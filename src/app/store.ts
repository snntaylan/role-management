/**
 * Redux Store Configuration
 * Combines all reducers and configures the Redux store
 */

import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from '../features/roles/rolesSlice';
import permissionsReducer from '../features/permissions/permissionsSlice';
import userRoleAssignmentsReducer from '../features/userRoleAssignments/userRoleAssignmentsSlice';
import usersReducer from '../features/users/usersSlice';
import type { IUsersState } from '../features/users/usersTypes';

const USERS_STORAGE_KEY = 'role_management_users_state_v1';
const FAKEAPI_USERS_KEY = 'role_management_users';

const normalizeUsersArray = (usersArray: any[]): IUsersState => {
  const byId: Record<string, any> = {};
  const allIds: string[] = [];
  usersArray.forEach((u) => {
    byId[u.id] = u;
    allIds.push(u.id);
  });

  return {
    byId,
    allIds,
    selectedUserId: null,
    loading: false,
    error: null,
    currentPage: 1,
    pageSize: 10,
    total: usersArray.length,
    filters: {
      search: '',
      role: 'all',
      isActive: 'all',
      department: undefined,
    },
    validationErrors: {},
  };
};

const loadUsersState = (): Partial<{ users: IUsersState }> => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return {};

    // Prefer normalized users state if present
    const rawState = localStorage.getItem(USERS_STORAGE_KEY);
    if (rawState) {
      const parsed = JSON.parse(rawState);
      return { users: parsed };
    }

    // Fallback: load raw users array from fakeApi storage and normalize
    const raw = localStorage.getItem(FAKEAPI_USERS_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      return { users: normalizeUsersArray(arr) };
    }

    return {};
  } catch (e) {
    return {};
  }
};

export const store = configureStore({
  reducer: {
    roles: rolesReducer,
    permissions: permissionsReducer,
    userRoleAssignments: userRoleAssignmentsReducer,
    users: usersReducer,
  },
  preloadedState: loadUsersState() as any,
});

// Subscribe to users slice changes and persist to localStorage
store.subscribe(() => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const state = store.getState();
    const usersState: IUsersState = state.users;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersState));
  } catch (e) {
    // ignore write errors
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
