/**
 * Access Control Redux Slice (Placeholder)
 * Will be implemented in Module 4
 */

import { createSlice } from '@reduxjs/toolkit';
import type { IAccessControlState } from '../roles/rolesTypes';

const initialState: IAccessControlState = {
  userPermissions: new Set(),
  loading: false,
  error: null,
  lastCheckedAt: null,
};

const accessControlSlice = createSlice({
  name: 'accessControl',
  initialState,
  reducers: {},
});

export default accessControlSlice.reducer;
