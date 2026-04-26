/**
 * Users Redux Slice
 * Manages user state for healthcare management system
 * 
 * Handles: user CRUD operations, pagination, filtering, search
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUsersState, ICreateUserRequest, IUpdateUserRequest, UserRole } from './usersTypes';
import * as usersApi from './usersApi';

/**
 * Initial state for users
 */
const initialState: IUsersState = {
  byId: {},
  allIds: [],
  selectedUserId: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  filters: {
    search: '',
    role: 'all',
    isActive: 'all',
    department: undefined,
  },
  validationErrors: {},
};

/**
 * Async thunk: Fetch users with pagination and filters
 */
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (
    {
      page = 1,
      pageSize = 10,
      filters,
    }: {
      page?: number;
      pageSize?: number;
      filters?: any;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await usersApi.fetchUsers(page, pageSize, filters);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk: Fetch single user
 */
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const user = await usersApi.fetchUserById(userId);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk: Create user
 */
export const createUser = createAsyncThunk(
  'users/createUser',
  async (data: ICreateUserRequest, { rejectWithValue }) => {
    try {
      const user = await usersApi.createUser(data);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk: Update user
 */
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, data }: { userId: string; data: IUpdateUserRequest }, { rejectWithValue }) => {
    try {
      const user = await usersApi.updateUser(userId, data);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk: Delete user
 */
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await usersApi.deleteUser(userId);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk: Search users
 */
export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async (query: string, { rejectWithValue }) => {
    try {
      const users = await usersApi.searchUsers(query);
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk: Get users by role
 */
export const getUsersByRole = createAsyncThunk(
  'users/getUsersByRole',
  async (role: string, { rejectWithValue }) => {
    try {
      const users = await usersApi.getUsersByRole(role);
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk: Bulk update roles
 */
export const bulkUpdateUserRoles = createAsyncThunk(
  'users/bulkUpdateRoles',
  async ({ userIds, role }: { userIds: string[]; role: string }, { rejectWithValue }) => {
    try {
      const users = await usersApi.bulkUpdateUserRoles(userIds, role);
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Users slice
 */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /**
     * Select user
     */
    selectUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },

    /**
     * Set search filter
     */
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.currentPage = 1;
    },

    /**
     * Set role filter
     */
    setRoleFilter: (state, action: PayloadAction<UserRole | 'all'>) => {
      state.filters.role = action.payload;
      state.currentPage = 1;
    },

    /**
     * Set active status filter
     */
    setActiveFilter: (state, action: PayloadAction<boolean | 'all'>) => {
      state.filters.isActive = action.payload;
      state.currentPage = 1;
    },

    /**
     * Set department filter
     */
    setDepartmentFilter: (state, action: PayloadAction<string | undefined>) => {
      state.filters.department = action.payload;
      state.currentPage = 1;
    },

    /**
     * Set pagination page
     */
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    /**
     * Set page size
     */
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },

    /**
     * Clear errors
     */
    clearError: (state) => {
      state.error = null;
      state.validationErrors = {};
    },

    /**
     * Reset filters
     */
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
    },

    /**
     * Clear users state
     */
    clearUsersState: () => initialState,
  },

  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.byId = {};
        state.allIds = [];

        // Normalize users
        action.payload.users.forEach((user) => {
          state.byId[user.id] = user;
          state.allIds.push(user.id);
        });

        state.currentPage = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single user
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.byId[action.payload.id] = action.payload;
        if (!state.allIds.includes(action.payload.id)) {
          state.allIds.push(action.payload.id);
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create user
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.validationErrors = {};
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.byId[action.payload.id] = action.payload;
        if (!state.allIds.includes(action.payload.id)) {
          state.allIds.push(action.payload.id);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.validationErrors = {};
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        delete state.byId[action.payload];
        state.allIds = state.allIds.filter(id => id !== action.payload);
        if (state.selectedUserId === action.payload) {
          state.selectedUserId = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Search users
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.byId = {};
        state.allIds = [];

        action.payload.forEach((user) => {
          state.byId[user.id] = user;
          state.allIds.push(user.id);
        });
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get users by role
    builder
      .addCase(getUsersByRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.byId = {};
        state.allIds = [];

        action.payload.forEach((user) => {
          state.byId[user.id] = user;
          state.allIds.push(user.id);
        });
      })
      .addCase(getUsersByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Bulk update roles
    builder
      .addCase(bulkUpdateUserRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(bulkUpdateUserRoles.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach((user) => {
          state.byId[user.id] = user;
        });
      })
      .addCase(bulkUpdateUserRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  selectUser,
  setSearchFilter,
  setRoleFilter,
  setActiveFilter,
  setDepartmentFilter,
  setPage,
  setPageSize,
  clearError,
  resetFilters,
  clearUsersState,
} = usersSlice.actions;

export default usersSlice.reducer;
