import React, { useState, useEffect } from 'react';
import { RolesList } from '../components/features/RolesList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAllRoles } from '../features/roles/rolesSelectors';
import { loadRoles } from '../features/roles/rolesSlice';
import * as rolesApi from '../features/roles/rolesApi';
import { Modal } from '../components/ui/Modal';

export const RolesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const roles = useAppSelector(selectAllRoles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadRoles());
  }, []);

  const handleAddRole = async (data: { name: string; description: string }) => {
    setLoading(true);
    try {
      await rolesApi.createRole({ name: data.name, description: data.description, permissions: [] } as any);
      dispatch(loadRoles());
    } catch (err: any) {
      setError(err.message || 'Failed to create role');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    setLoading(true);
    try {
      await rolesApi.deleteRole(roleId);
      dispatch(loadRoles());
    } catch (err: any) {
      setError(err.message || 'Failed to delete role');
    } finally {
      setLoading(false);
    }
  };

  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [showView, setShowView] = useState(false);

  const onSelectRole = (id: string) => {
    const found = roles.find((r: any) => r.id === id) || null;
    setSelectedRole(found);
    setShowView(true);
  };

  return (
    <>
      <RolesList
        roles={roles}
        loading={loading}
        error={error}
        onAddRole={handleAddRole}
        onDeleteRole={handleDeleteRole}
        onSelectRole={onSelectRole}
      />

      <Modal isOpen={showView} onClose={() => setShowView(false)} title="Role Details">
        {selectedRole ? (
          <div className="space-y-2">
            <div><strong>Name:</strong> {selectedRole.name}</div>
            <div><strong>Description:</strong> {selectedRole.description}</div>
            <div><strong>Permissions:</strong> {(selectedRole.permissions || []).join(', ')}</div>
            <div><strong>Status:</strong> {selectedRole.status}</div>
            <div><strong>Created At:</strong> {selectedRole.createdAt}</div>
          </div>
        ) : (
          <p>No role selected</p>
        )}
      </Modal>
    </>
  );
};

export default RolesPage;
