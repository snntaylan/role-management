import type { IUser, IUserResponse, IUserListResponse, ICreateUserRequest, IUpdateUserRequest } from './usersTypes';
import fakeApi from './fakeApi';

export const fetchUsers = async (
  page: number = 1,
  pageSize: number = 10,
  filters?: { search?: string; role?: string; isActive?: boolean }
): Promise<IUserListResponse> => {
  return fakeApi.getUsers({ page, pageSize, filters });
};

export const fetchUserById = async (userId: string): Promise<IUserResponse> => {
  return fakeApi.getUserById(userId);
};

export const createUser = async (data: ICreateUserRequest): Promise<IUserResponse> => {
  return fakeApi.addUser(data);
};

export const updateUser = async (userId: string, data: IUpdateUserRequest): Promise<IUserResponse> => {
  return fakeApi.updateUser(userId, data);
};

export const deleteUser = async (userId: string): Promise<void> => {
  return fakeApi.removeUser(userId);
};

export const searchUsers = async (query: string): Promise<IUser[]> => {
  return fakeApi.searchUsers(query);
};

export const getUsersByRole = async (role: string): Promise<IUser[]> => {
  return fakeApi.getUsersByRole(role);
};

export const getUsersByDepartment = async (department: string): Promise<IUser[]> => {
  return fakeApi.getUsersByDepartment(department);
};

export const getActiveUsers = async (): Promise<IUser[]> => {
  return fakeApi.getActiveUsers();
};

export const bulkUpdateUserRoles = async (
  userIds: string[],
  role: string
): Promise<IUser[]> => {
  return fakeApi.bulkUpdateUserRoles(userIds, role);
};
