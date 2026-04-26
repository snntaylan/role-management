/**
 * Permissions Redux Slice (Placeholder)
 * Will be implemented in Module 2
 */

import { createSlice } from '@reduxjs/toolkit';
import type { IPermissionsState } from '../roles/rolesTypes';

const initialState: IPermissionsState = {
  permissions: [],
  loading: false,
  error: null,
  selectedPermissionId: null,
  totalCount: 0,
  currentPage: 1,
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
});

export default permissionsSlice.reducer;
