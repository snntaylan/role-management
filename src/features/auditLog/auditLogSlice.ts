/**
 * Audit Log Redux Slice (Placeholder)
 * Will be implemented in Module 5
 */

import { createSlice } from '@reduxjs/toolkit';
import type { IAuditLogState } from '../roles/rolesTypes';

const initialState: IAuditLogState = {
  logs: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  filters: {},
};

const auditLogSlice = createSlice({
  name: 'auditLog',
  initialState,
  reducers: {},
});

export default auditLogSlice.reducer;
