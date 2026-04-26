// Fake API for users using localStorage and simulated delays
const STORAGE_KEY = 'role_management_users';

// Seed data (used when localStorage is empty)
const seedUsers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@healthcare.com',
    role: 'doctor',
    permissions: ['read-user', 'update-own', 'view-patient-data', 'create-records'],
    department: 'Cardiology',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    isActive: true,
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@healthcare.com',
    role: 'admin',
    permissions: ['create-user', 'read-user', 'update-user', 'delete-user', 'manage-roles', 'manage-permissions'],
    department: 'Administration',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-01T08:00:00Z',
    isActive: true,
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john.smith@healthcare.com',
    role: 'patient',
    permissions: ['read-own', 'update-own', 'view-own-records'],
    department: 'Outpatient',
    createdAt: '2024-02-10T14:20:00Z',
    updatedAt: '2024-02-10T14:20:00Z',
    isActive: true,
  },
  {
    id: '4',
    name: 'Dr. Emily Brown',
    email: 'emily.brown@healthcare.com',
    role: 'doctor',
    permissions: ['read-user', 'update-own', 'view-patient-data', 'create-records'],
    department: 'Pediatrics',
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-01-20T09:15:00Z',
    isActive: true,
  },
];

const randomDelay = () => 300 + Math.floor(Math.random() * 500); // 300-800ms

const readStore = () => {
  if (typeof window === 'undefined' || !window.localStorage) return [...seedUsers];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedUsers));
      return [...seedUsers];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [...seedUsers];
  }
};

const writeStore = (users) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    // ignore quota errors in tests/dev
  }
};

export const getUsers = ({ page = 1, pageSize = 10, filters } = {}) =>
  new Promise((resolve) => {
    setTimeout(() => {
      let users = readStore();

      // filters
      if (filters) {
        if (filters.search) {
          const q = filters.search.toLowerCase();
          users = users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
        }
        if (filters.role && filters.role !== 'all') {
          users = users.filter(u => u.role === filters.role);
        }
        if (filters.isActive !== undefined && filters.isActive !== null && filters.isActive !== 'all') {
          users = users.filter(u => u.isActive === filters.isActive);
        }
      }

      const total = users.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const pageUsers = users.slice(start, end);

      resolve({ users: pageUsers, total, page, pageSize });
    }, randomDelay());
  });

export const getUserById = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = readStore();
      const u = users.find(x => x.id === id);
      if (!u) return reject(new Error(`User with ID ${id} not found`));
      resolve(u);
    }, randomDelay());
  });

export const addUser = (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = readStore();

      if (!data.name || data.name.trim().length < 2) {
        return reject(new Error('User name must be at least 2 characters'));
      }
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return reject(new Error('Invalid email format'));
      }
      if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
        return reject(new Error('User with this email already exists'));
      }
      if (users.some(u => u.name.toLowerCase() === data.name.toLowerCase())) {
        return reject(new Error('User with this name already exists'));
      }

      const nextId = String(Math.max(...users.map(u => parseInt(u.id, 10)).filter(n => !isNaN(n)), 0) + 1);
      const now = new Date().toISOString();
      const newUser = {
        id: nextId,
        name: data.name,
        email: data.email,
        role: data.role,
        permissions: Array.isArray(data.permissions) ? data.permissions : [],
        department: data.department,
        createdAt: now,
        updatedAt: now,
        isActive: true,
      };

      users.push(newUser);
      writeStore(users);
      resolve(newUser);
    }, randomDelay());
  });

export const updateUser = (id, data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = readStore();
      const idx = users.findIndex(u => u.id === id);
      if (idx === -1) return reject(new Error(`User with ID ${id} not found`));

      if (data.name !== undefined) {
        if (!data.name || data.name.trim().length < 2) return reject(new Error('User name must be at least 2 characters'));
        if (users.some(u => u.id !== id && u.name.toLowerCase() === data.name.toLowerCase())) {
          return reject(new Error('User with this name already exists'));
        }
      }

      if (data.email !== undefined) {
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return reject(new Error('Invalid email format'));
        if (users.some(u => u.id !== id && u.email.toLowerCase() === data.email.toLowerCase())) {
          return reject(new Error('User with this email already exists'));
        }
      }

      const user = users[idx];
      const updated = { ...user, ...data, updatedAt: new Date().toISOString() };
      users[idx] = updated;
      writeStore(users);
      resolve(updated);
    }, randomDelay());
  });

export const removeUser = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      let users = readStore();
      const idx = users.findIndex(u => u.id === id);
      if (idx === -1) return reject(new Error(`User with ID ${id} not found`));
      users = users.filter(u => u.id !== id);
      writeStore(users);
      resolve();
    }, randomDelay());
  });

export const searchUsers = (query) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const users = readStore();
      if (!query || !query.trim()) return resolve([]);
      const q = query.toLowerCase();
      resolve(users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
    }, randomDelay());
  });

export const getUsersByRole = (role) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const users = readStore();
      resolve(users.filter(u => u.role === role));
    }, randomDelay());
  });

export const getUsersByDepartment = (department) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const users = readStore();
      resolve(users.filter(u => u.department === department));
    }, randomDelay());
  });

export const getActiveUsers = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const users = readStore();
      resolve(users.filter(u => u.isActive));
    }, randomDelay());
  });

export const bulkUpdateUserRoles = (userIds, role) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const users = readStore();
      const updated = [];
      userIds.forEach((id) => {
        const idx = users.findIndex(u => u.id === id);
        if (idx !== -1) {
          users[idx] = { ...users[idx], role, updatedAt: new Date().toISOString() };
          updated.push(users[idx]);
        }
      });
      writeStore(users);
      resolve(updated);
    }, randomDelay());
  });

export default {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
  searchUsers,
  getUsersByRole,
  getUsersByDepartment,
  getActiveUsers,
  bulkUpdateUserRoles,
};
