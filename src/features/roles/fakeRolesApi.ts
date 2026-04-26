/**
 * Fake Roles & Permissions API
 * - Persists to localStorage under 'role_management_roles'
 * - Returns Promises with 300-800ms random delay to simulate network
 */
import type { IRole, IPermission } from './rolesTypes';

const STORAGE_KEY = 'role_management_roles';

const randomDelay = () => 300 + Math.floor(Math.random() * 500);

const seedRoles = (): { roles: IRole[]; permissions: IPermission[] } => {
  const now = new Date().toISOString();
  const permissions: IPermission[] = [
    { id: 'READ_USER', name: 'READ_USER', description: 'Read user data', category: 'User Management', createdAt: now, updatedAt: now },
    { id: 'WRITE_USER', name: 'UPDATE_USER', description: 'Update user data', category: 'User Management', createdAt: now, updatedAt: now },
  ];

  const roles: IRole[] = [
    { id: 'role_admin', name: 'Administrator', description: 'Full access', permissions: permissions.map(p => p.name as any), status: 'ACTIVE', createdAt: now, updatedAt: now, createdBy: 'system', updatedBy: 'system' },
    { id: 'role_doctor', name: 'Doctor', description: 'Clinical provider', permissions: [permissions[0].name], status: 'ACTIVE', createdAt: now, updatedAt: now, createdBy: 'system', updatedBy: 'system' },
    { id: 'role_patient', name: 'Patient', description: 'Patient account', permissions: [], status: 'ACTIVE', createdAt: now, updatedAt: now, createdBy: 'system', updatedBy: 'system' },
  ];

  return { roles, permissions };
};

const readStore = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { roles: IRole[]; permissions: IPermission[] };
  } catch (e) {
    return null;
  }
};

const writeStore = (data: { roles: IRole[]; permissions: IPermission[] }) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
};

const ensureSeed = () => {
  const existing = readStore();
  if (!existing) {
    const seeded = seedRoles();
    writeStore(seeded);
    return seeded;
  }
  return existing;
};

export const getRoles = async (page = 1, limit = 50): Promise<{ roles: IRole[]; totalCount: number }> => {
  const delay = randomDelay();
  await new Promise((r) => setTimeout(r, delay));
  const store = ensureSeed();
  const roles = store.roles.slice((page - 1) * limit, page * limit);
  return { roles, totalCount: store.roles.length };
};

export const getRoleById = async (id: string): Promise<IRole | null> => {
  await new Promise((r) => setTimeout(r, randomDelay()));
  const store = ensureSeed();
  return store.roles.find((r) => r.id === id) || null;
};

export const createRole = async (roleData: Partial<IRole>): Promise<IRole> => {
  await new Promise((r) => setTimeout(r, randomDelay()));
  const store = ensureSeed();
  const now = new Date().toISOString();
  const newRole: IRole = {
    id: `role_${Math.random().toString(36).slice(2, 9)}`,
    name: roleData.name || 'New Role',
    description: roleData.description || '',
    permissions: roleData.permissions || [],
    status: (roleData.status as any) || 'ACTIVE',
    createdAt: now,
    updatedAt: now,
    createdBy: roleData.createdBy || 'system',
    updatedBy: roleData.updatedBy || 'system',
  };
  store.roles.push(newRole);
  writeStore(store);
  return newRole;
};

export const updateRole = async (roleId: string, data: Partial<IRole>): Promise<IRole> => {
  await new Promise((r) => setTimeout(r, randomDelay()));
  const store = ensureSeed();
  const idx = store.roles.findIndex((r) => r.id === roleId);
  if (idx === -1) throw new Error('Role not found');
  store.roles[idx] = { ...store.roles[idx], ...data, updatedAt: new Date().toISOString() };
  writeStore(store);
  return store.roles[idx];
};

export const deleteRole = async (roleId: string): Promise<void> => {
  await new Promise((r) => setTimeout(r, randomDelay()));
  const store = ensureSeed();
  store.roles = store.roles.filter((r) => r.id !== roleId);
  writeStore(store);
};

export const getPermissions = async (): Promise<IPermission[]> => {
  await new Promise((r) => setTimeout(r, randomDelay()));
  const store = ensureSeed();
  return store.permissions;
};

export const createPermission = async (data: Partial<IPermission>): Promise<IPermission> => {
  await new Promise((r) => setTimeout(r, randomDelay()));
  const store = ensureSeed();
  const now = new Date().toISOString();
  const perm: IPermission = {
    id: data.id || `perm_${Math.random().toString(36).slice(2, 9)}`,
    name: (data.name as any) || 'NEW_PERMISSION',
    description: data.description || '',
    category: data.category || 'General',
    createdAt: now,
    updatedAt: now,
  };
  store.permissions.push(perm);
  writeStore(store);
  return perm;
};

export const deletePermission = async (permissionId: string): Promise<void> => {
  await new Promise((r) => setTimeout(r, randomDelay()));
  const store = ensureSeed();
  // remove permission
  store.permissions = store.permissions.filter((p) => p.id !== permissionId);
  // remove permission references from roles
  store.roles = store.roles.map((r) => ({ ...r, permissions: r.permissions.filter((p) => p !== permissionId) }));
  writeStore(store);
};

export default {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getPermissions,
};
