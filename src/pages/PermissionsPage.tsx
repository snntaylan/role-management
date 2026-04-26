import React, { useEffect, useState } from 'react';
import { PermissionsList } from '../components/features/PermissionsList';
import * as rolesApi from '../features/roles/rolesApi';
import { Modal } from '../components/ui/Modal';

export const PermissionsPage: React.FC = () => {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await rolesApi.fetchPermissions();
      setPermissions(res);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load permissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddPermission = async (data: { name: string; description: string; category: string }) => {
    setLoading(true);
    try {
      await rolesApi.createPermission({ name: data.name, description: data.description, category: data.category });
      await load();
    } catch (err: any) {
      setError(err.message || 'Failed to add permission');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePermission = async (id: string) => {
    setLoading(true);
    try {
      await rolesApi.deletePermission(id);
      await load();
    } catch (err: any) {
      setError(err.message || 'Failed to delete permission');
    } finally {
      setLoading(false);
    }
  };

  const onSelect = (id: string) => {
    const p = permissions.find((x) => x.id === id) || null;
    setSelected(p);
    setShowViewModal(true);
  };

  return (
    <>
      <PermissionsList
        permissions={permissions}
        loading={loading}
        error={error}
        onAddPermission={handleAddPermission}
        onDeletePermission={handleDeletePermission}
        onSelectPermission={onSelect}
      />

      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Permission Details">
        {selected ? (
          <div className="space-y-2">
            <div><strong>Name:</strong> {selected.name}</div>
            <div><strong>Category:</strong> {selected.category}</div>
            <div><strong>Description:</strong> {selected.description}</div>
            <div><strong>Created At:</strong> {selected.createdAt}</div>
            <div><strong>Updated At:</strong> {selected.updatedAt}</div>
          </div>
        ) : (
          <p>No permission selected</p>
        )}
      </Modal>
    </>
  );
};

export default PermissionsPage;
