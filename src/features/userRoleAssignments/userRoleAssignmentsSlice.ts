/**
 * User Role Assignments Redux Slice (Placeholder)
 * Will be implemented in Module 3
 */

import { createSlice } from '@reduxjs/toolkit';
import type { IUserRoleAssignmentsState } from '../roles/rolesTypes';

const initialState: IUserRoleAssignmentsState = {
  assignments: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
};

const userRoleAssignmentsSlice = createSlice({
  name: 'userRoleAssignments',
  initialState,
  reducers: {},
});

export default userRoleAssignmentsSlice.reducer;
