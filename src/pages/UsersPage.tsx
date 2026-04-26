import { useState, useEffect } from 'react';
import { Layout } from '../components/layout';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
// MultiSelect removed in favor of simple read/write checkboxes
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useUsersFilters,
  useUsersPagination,
  useUsersDashboardStats,
} from '../features/users/usersHooks';
import type { ICreateUserRequest, IUpdateUserRequest, UserRole } from '../features/users/usersTypes';
import { USER_ROLE_LABELS, USER_VALIDATION } from '../features/users/usersTypes';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

/**
 * User form state
 */
// Form state shape is defined inline with Formik usage below

/**
 * Users Management Page Component
 */
export const UsersPage = () => {
  // Redux hooks
  const { users, loading: usersLoading, loadUsers } = useUsers();
  const { create: createUserHandler, loading: createLoading, error: createError } = useCreateUser();
  const { update: updateUserHandler, loading: updateLoading, error: updateError } = useUpdateUser();
  const { remove: deleteUserHandler, loading: deleteLoading, error: deleteError } = useDeleteUser();
  const { filters, setSearch, setRole } = useUsersFilters();
  const { users: paginatedUsers, currentPage, goToPage, numberOfPages } = useUsersPagination();
  const stats = useUsersDashboardStats();

  // Local state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Permissions simplified to 'read' and 'write' per requirements

  // Load users on mount
  useEffect(() => {
    loadUsers(1, 10);
  }, []);

  /**
   * Validate form data
   */
  // Formik validation schema (basic)
  const baseSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(USER_VALIDATION.NAME_MIN_LENGTH, `Name must be at least ${USER_VALIDATION.NAME_MIN_LENGTH} characters`)
      .max(USER_VALIDATION.NAME_MAX_LENGTH, `Name must not exceed ${USER_VALIDATION.NAME_MAX_LENGTH} characters`)
      .required('Name is required'),
    email: Yup.string().trim().matches(USER_VALIDATION.EMAIL_PATTERN, 'Invalid email format').required('Email is required'),
    role: Yup.mixed().oneOf(['admin', 'doctor', 'patient']).required('Role is required'),
    department: Yup.string().max(USER_VALIDATION.DEPARTMENT_MAX_LENGTH),
    permissions: Yup.array().of(Yup.string()),
  });

  /**
   * Handle create user
   */
  // Formik submit handlers will perform duplicate checks and call the API
  const [createApiError, setCreateApiError] = useState<string | null>(null);
  const [editApiError, setEditApiError] = useState<string | null>(null);
  const [deleteApiError, setDeleteApiError] = useState<string | null>(null);

  const handleCreateSubmit = async (values: { name: string; email: string; role: string; department: string; permissions: string[] }, { setSubmitting, setErrors }: any) => {
    // Duplicate checks
    const duplicateName = users.some(u => u.name.toLowerCase() === values.name.toLowerCase());
    const duplicateEmail = users.some(u => u.email.toLowerCase() === values.email.toLowerCase());
    const errors: Record<string, string> = {};
    if (duplicateName) errors.name = 'A user with this name already exists';
    if (duplicateEmail) errors.email = 'A user with this email already exists';
    if (Object.keys(errors).length) {
      setErrors(errors);
      setSubmitting(false);
      return;
    }

    try {
      const userData: ICreateUserRequest = {
        name: values.name.trim(),
        email: values.email.trim(),
        role: values.role as UserRole,
        permissions: values.permissions || [],
        department: values.department?.trim() || undefined,
      };
      await createUserHandler(userData);
      setCreateApiError(null);
      setSuccessMessage('User created successfully');
      setShowCreateModal(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setCreateApiError(err.message || 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Handle edit user
   */
  const handleEditSubmit = async (values: { name: string; email: string; role: string; department: string; permissions: string[] }, { setSubmitting, setErrors }: any) => {
    if (!selectedUser) return;

    // Duplicate checks (exclude selected user)
    const duplicateName = users.some(u => u.id !== selectedUser.id && u.name.toLowerCase() === values.name.toLowerCase());
    const duplicateEmail = users.some(u => u.id !== selectedUser.id && u.email.toLowerCase() === values.email.toLowerCase());
    const errors: Record<string, string> = {};
    if (duplicateName) errors.name = 'A user with this name already exists';
    if (duplicateEmail) errors.email = 'A user with this email already exists';
    if (Object.keys(errors).length) {
      setErrors(errors);
      setSubmitting(false);
      return;
    }

    try {
      const userData: IUpdateUserRequest = {
        name: values.name.trim(),
        email: values.email.trim(),
        role: values.role as UserRole,
        permissions: values.permissions || [],
        department: values.department?.trim() || undefined,
      };

      await updateUserHandler(selectedUser.id, userData);
      setEditApiError(null);
      setSuccessMessage('User updated successfully');
      setShowEditModal(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setEditApiError(err.message || 'Failed to update user');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Handle delete user
   */
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUserHandler(selectedUser.id);
      setSuccessMessage('User deleted successfully');
      setShowDeleteModal(false);
      resetForm();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      setDeleteApiError(error.message || 'Failed to delete user');
    }
  };

  /**
   * Open create modal
   */
  const openCreateModal = () => {
    setSelectedUser(null);
    setShowCreateModal(true);
  };

  /**
   * Open edit modal
   */
  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  /**
   * Open delete modal
   */
  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  /**
   * Reset form
   */
  const resetForm = () => {
    // noop - Formik manages form state
  };

  /**
   * Handle search
   */
  const handleSearch = (value: string) => {
    setSearch(value);
    goToPage(1);
  };

  /**
   * Handle role filter
   */
  const handleRoleFilter = (value: string) => {
    setRole((value as UserRole) || 'all');
    goToPage(1);
  };

  return (
    // <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="mt-2 text-gray-600">Manage healthcare team members and user accounts</p>
          </div>
          <Button
            onClick={openCreateModal}
            variant="primary"
            size="lg"
            disabled={usersLoading}
          >
            + Add New User
          </Button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert variant="success" title="Success">{successMessage}</Alert>
        )}

        {/* Error Message */}
        {(createError || updateError || deleteError) && (
          <Alert variant="error" title="Error">{createError || updateError || deleteError || 'An error occurred'}</Alert>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-600">Providers</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.doctorCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
            <h3 className="text-sm font-medium text-gray-600">Patients</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.patientCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Search by name or email"
              placeholder="Search users..."
              value={filters.search}
              onChange={(e) => handleSearch((e.target as HTMLInputElement).value)}
              type="text"
            />
            <Select
              label="Filter by role"
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'admin', label: 'Administrator' },
                { value: 'doctor', label: 'Doctor' },
                { value: 'patient', label: 'Patient' },
              ]}
              value={filters.role}
              onChange={(e) => handleRoleFilter((e.target as HTMLSelectElement).value)}
            />
            <div className="flex items-end">
              <Button
                onClick={() => {
                  setSearch('');
                  setRole('all');
                  goToPage(1);
                }}
                variant="secondary"
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {paginatedUsers.length > 0 ? (
            <>
              <Table
                columns={[
                  {
                    key: 'name',
                    label: 'Name',
                    render: (value: unknown, row: any) => (
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{String(value)}</span>
                        <span className="text-sm text-gray-500">{String(row.email)}</span>
                      </div>
                    ),
                  },
                  {
                    key: 'role',
                    label: 'Role',
                    render: (value: unknown) => (
                      <Badge variant={(value as string) === 'admin' ? 'danger' : (value as string) === 'doctor' ? 'info' : 'success'}>
                        {USER_ROLE_LABELS[(value as UserRole) ?? 'patient']}
                      </Badge>
                    ),
                  },
                  {
                    key: 'department',
                    label: 'Department',
                    render: (value: unknown) => <span className="text-gray-600">{String(value) || '-'}</span>,
                  },
                  {
                    key: 'isActive',
                    label: 'Status',
                    render: (value: unknown) => (
                      <Badge variant={value ? 'success' : 'warning'}>{value ? 'Active' : 'Inactive'}</Badge>
                    ),
                  },
                  {
                    key: 'actions',
                    label: 'Actions',
                    render: (_: unknown, row: any) => (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => openEditModal(row)}
                          variant="secondary"
                          size="sm"
                          disabled={usersLoading}
                          isLoading={false}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => openDeleteModal(row)}
                          variant="danger"
                          size="sm"
                          disabled={deleteLoading}
                          isLoading={false}
                        >
                          Delete
                        </Button>
                      </div>
                    ),
                  },
                ]}
                data={paginatedUsers as any[]}
                rowKey="id"
              />

              {/* Pagination */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {numberOfPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => goToPage(currentPage - 1)}
                    variant="secondary"
                    size="sm"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => goToPage(currentPage + 1)}
                    variant="secondary"
                    size="sm"
                    disabled={currentPage === numberOfPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">No users found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Create User Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Add New User"
          size="md"
        >
          <Formik
            initialValues={{ name: '', email: '', role: 'patient', department: '', permissions: [] }}
            validationSchema={baseSchema}
            onSubmit={handleCreateSubmit}
          >
            {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                {createApiError && (
                  <Alert variant="error" title="Error">{createApiError}</Alert>
                )}

                <Input
                  label="Name"
                  name="name"
                  placeholder="Enter user name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && errors.name ? String(errors.name) : undefined}
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && errors.email ? String(errors.email) : undefined}
                  required
                />

                <Select
                  label="Role"
                  name="role"
                  options={[
                    { value: 'admin', label: 'Administrator' },
                    { value: 'doctor', label: 'Doctor' },
                    { value: 'patient', label: 'Patient' },
                  ]}
                  value={values.role}
                  onChange={(e) => setFieldValue('role', (e.target as HTMLSelectElement).value)}
                  required
                />

                <div>
                  <label className="font-medium block mb-2">Permissions</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={values.permissions.includes('read')}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const next = checked ? Array.from(new Set([...values.permissions, 'read'])) : values.permissions.filter((p: string) => p !== 'read');
                          setFieldValue('permissions', next);
                        }}
                      />
                      <span>Read</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={values.permissions.includes('write')}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const next = checked ? Array.from(new Set([...values.permissions, 'write'])) : values.permissions.filter((p: string) => p !== 'write');
                          setFieldValue('permissions', next);
                        }}
                      />
                      <span>Write</span>
                    </label>
                  </div>
                </div>

                <Input
                  label="Department"
                  name="department"
                  placeholder="Enter department (optional)"
                  value={values.department}
                  onChange={handleChange}
                />

                <div className="flex gap-3 justify-end pt-4">
                  <Button onClick={() => setShowCreateModal(false)} variant="secondary">Cancel</Button>
                  <Button type="submit" variant="primary" isLoading={isSubmitting || createLoading}>Create User</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>

        {/* Edit User Modal */}
        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title={`Edit User: ${selectedUser?.name}`} size="md">
          <Formik
            enableReinitialize
            initialValues={{
              name: selectedUser?.name || '',
              email: selectedUser?.email || '',
              role: selectedUser?.role || 'patient',
              department: selectedUser?.department || '',
              permissions: selectedUser?.permissions || [],
            }}
            validationSchema={baseSchema}
            onSubmit={handleEditSubmit}
          >
            {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                {editApiError && (
                  <Alert variant="error" title="Error">{editApiError}</Alert>
                )}

                <Input label="Name" name="name" placeholder="Enter user name" value={values.name} onChange={handleChange} error={touched.name && errors.name ? String(errors.name) : undefined} required />

                <Input label="Email" name="email" type="email" placeholder="Enter email address" value={values.email} onChange={handleChange} error={touched.email && errors.email ? String(errors.email) : undefined} required />

                <Select label="Role" name="role" options={[{ value: 'admin', label: 'Administrator' }, { value: 'doctor', label: 'Doctor' }, { value: 'patient', label: 'Patient' }]} value={values.role} onChange={(e) => setFieldValue('role', (e.target as HTMLSelectElement).value)} required />

                <div>
                  <label className="font-medium block mb-2">Permissions</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={values.permissions.includes('read')} onChange={(e) => {
                        const checked = e.target.checked;
                        const next = checked ? Array.from(new Set([...values.permissions, 'read'])) : values.permissions.filter((p: string) => p !== 'read');
                        setFieldValue('permissions', next);
                      }} />
                      <span>Read</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={values.permissions.includes('write')} onChange={(e) => {
                        const checked = e.target.checked;
                        const next = checked ? Array.from(new Set([...values.permissions, 'write'])) : values.permissions.filter((p: string) => p !== 'write');
                        setFieldValue('permissions', next);
                      }} />
                      <span>Write</span>
                    </label>
                  </div>
                </div>

                <Input label="Department" name="department" placeholder="Enter department (optional)" value={values.department} onChange={handleChange} />

                <div className="flex gap-3 justify-end pt-4">
                  <Button onClick={() => setShowEditModal(false)} variant="secondary">Cancel</Button>
                  <Button type="submit" variant="primary" isLoading={isSubmitting || updateLoading}>Update User</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete User"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete <strong>{selectedUser?.name}</strong>? This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                onClick={() => setShowDeleteModal(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteUser}
                variant="danger"
                isLoading={deleteLoading}
              >
                Delete User
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    // </Layout>
  );
};