/**
 * Roles Redux Slice
 * Manages the state of roles including loading, errors, and CRUD operations
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IRolesState, IRole } from './rolesTypes';
import * as rolesApi from './rolesApi';

const initialState: IRolesState = {
  roles: [],
  loading: false,
  error: null,
  selectedRoleId: null,
  totalCount: 0,
  currentPage: 1,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    // Fetch actions
    fetchRolesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRolesSuccess: (state, action: PayloadAction<{ roles: IRole[]; totalCount: number }>) => {
      state.loading = false;
      state.roles = action.payload.roles;
      state.totalCount = action.payload.totalCount;
    },
    fetchRolesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create role
    createRoleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createRoleSuccess: (state, action: PayloadAction<IRole>) => {
      state.loading = false;
      state.roles.push(action.payload);
      state.totalCount += 1;
    },
    createRoleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update role
    updateRoleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateRoleSuccess: (state, action: PayloadAction<IRole>) => {
      state.loading = false;
      const index = state.roles.findIndex((role) => role.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    },
    updateRoleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete role
    deleteRoleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteRoleSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.roles = state.roles.filter((role) => role.id !== action.payload);
      state.totalCount -= 1;
    },
    deleteRoleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Select role
    selectRole: (state, action: PayloadAction<string | null>) => {
      state.selectedRoleId = action.payload;
    },

    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Reset state
    resetRolesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRoles.fulfilled, (state, action: PayloadAction<{ roles: IRole[]; totalCount: number }>) => {
        state.loading = false;
        state.roles = action.payload.roles;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(loadRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Async thunk to load roles from API
export const loadRoles = createAsyncThunk('roles/loadRoles', async (_arg, { rejectWithValue }) => {
  try {
    const res = await rolesApi.fetchRoles(1, 1000);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to load roles');
  }
});

export const {
  fetchRolesStart,
  fetchRolesSuccess,
  fetchRolesFailure,
  createRoleStart,
  createRoleSuccess,
  createRoleFailure,
  updateRoleStart,
  updateRoleSuccess,
  updateRoleFailure,
  deleteRoleStart,
  deleteRoleSuccess,
  deleteRoleFailure,
  selectRole,
  setCurrentPage,
  clearError,
  resetRolesState,
} = rolesSlice.actions;
export default rolesSlice.reducer;
