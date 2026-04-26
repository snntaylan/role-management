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

// handle thunk lifecycle in extraReducers
rolesSlice.reducer;

// Extend reducer with extraReducers dynamically (createSlice already returns reducer; we attach after)
const originalReducer = rolesSlice.reducer;
const enhancedReducer = (state: IRolesState | undefined, action: any) => {
  let newState = originalReducer(state as any, action);
  switch (action.type) {
    case loadRoles.pending.type:
      newState = { ...(newState as IRolesState), loading: true, error: null } as IRolesState;
      break;
    case loadRoles.fulfilled.type:
      newState = { ...(newState as IRolesState), loading: false, roles: action.payload.roles, totalCount: action.payload.totalCount } as IRolesState;
      break;
    case loadRoles.rejected.type:
      newState = { ...(newState as IRolesState), loading: false, error: action.payload as string } as IRolesState;
      break;
    default:
      break;
  }
  return newState;
};

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
export default enhancedReducer;
