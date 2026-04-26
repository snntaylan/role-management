import React, { useState, useEffect } from 'react';
import { RolesList } from '../components/features/RolesList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAllRoles } from '../features/roles/rolesSelectors';
import { loadRoles } from '../features/roles/rolesSlice';
import * as rolesApi from '../features/roles/rolesApi';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui';

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
  const [allPermissions, setAllPermissions] = useState<any[]>([]);
  const [rolePerms, setRolePerms] = useState<string[]>([]);
  const [savingRolePerms, setSavingRolePerms] = useState(false);

  const onSelectRole = (id: string) => {
    const found = roles.find((r: any) => r.id === id) || null;
    setSelectedRole(found);
    // populate perms from role and load permissions list
    setRolePerms(found?.permissions || []);
    (async () => {
      try {
        const perms = await rolesApi.fetchPermissions();
        setAllPermissions(perms || []);
      } catch (e) {
        setAllPermissions([]);
      }
    })();
    setShowView(true);
  };

  const togglePermission = (permId: string) => {
    setRolePerms((prev) => (prev.includes(permId) ? prev.filter(p => p !== permId) : [...prev, permId]));
  };

  const saveRolePermissions = async () => {
    if (!selectedRole) return;
    setSavingRolePerms(true);
    try {
      await rolesApi.updateRole(selectedRole.id, { permissions: rolePerms as any });
      // refresh
      dispatch(loadRoles());
      setSelectedRole({ ...selectedRole, permissions: rolePerms });
    } catch (err: any) {
      setError(err.message || 'Failed to update role permissions');
    } finally {
      setSavingRolePerms(false);
      setShowView(false);
    }
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

      <Modal isOpen={showView} onClose={() => setShowView(false)} title="Role Details" footer={
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setShowView(false)}>Close</Button>
          <Button isLoading={savingRolePerms} onClick={saveRolePermissions}>Save Permissions</Button>
        </div>
      }>
        {selectedRole ? (
          <div className="space-y-4">
            <div><strong>Name:</strong> {selectedRole.name}</div>
            <div><strong>Description:</strong> {selectedRole.description}</div>
            <div><strong>Status:</strong> {selectedRole.status}</div>
            <div><strong>Created At:</strong> {selectedRole.createdAt}</div>

            <div>
              <h3 className="font-medium">Permissions</h3>
              <p className="text-sm text-gray-500">Toggle permissions for this role. Permissions are system-wide and dynamic.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {allPermissions.length === 0 ? (
                  <div className="text-gray-500">No permissions defined.</div>
                ) : (
                  allPermissions.map((p: any) => (
                    <label key={p.id} className="flex items-center gap-2">
                      <input type="checkbox" checked={rolePerms.includes(p.id)} onChange={() => togglePermission(p.id)} />
                      <span className="text-sm">{p.name} <span className="text-xs text-gray-400">- {p.category}</span></span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No role selected</p>
        )}
      </Modal>
    </>
  );
};

export default RolesPage;
