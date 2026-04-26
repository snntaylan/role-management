/**
 * Permissions List Component
 * Display and manage permissions
 */

import React, { useState } from 'react';
import { Button, Table, Modal, Input, Alert } from '../ui';
import type { IPermission } from '../../features/roles/rolesTypes';

interface PermissionsListProps {
  permissions: IPermission[];
  loading: boolean;
  error: string | null;
  onAddPermission: (permissionData: { name: string; description: string; category: string }) => Promise<void>;
  onDeletePermission?: (permissionId: string) => Promise<void>;
  onSelectPermission?: (permissionId: string) => void;
}

export const PermissionsList: React.FC<PermissionsListProps> = ({
  permissions,
  loading,
  error,
  onAddPermission,
  onDeletePermission,
  onSelectPermission,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPermission, setNewPermission] = useState({
    name: '',
    description: '',
    category: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleAddPermission = async () => {
    if (!newPermission.name.trim()) {
      setLocalError('Permission name is required');
      return;
    }

    setIsAdding(true);
    try {
      await onAddPermission(newPermission);
      setNewPermission({ name: '', description: '', category: '' });
      setIsAddModalOpen(false);
      setLocalError(null);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to create permission');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Permissions</h1>
          <p className="text-gray-600 mt-1">Manage system permissions</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Permission
        </Button>
      </div>

      {/* Alerts */}
      {error && <Alert variant="error" title="Error">{error}</Alert>}
      {localError && <Alert variant="error" onClose={() => setLocalError(null)}>{localError}</Alert>}

      {/* Table */}
      <Table
        columns={[
          { key: 'name' as const, label: 'Name' },
          { key: 'description' as const, label: 'Description' },
          { key: 'category' as const, label: 'Category' },
          {
            key: 'id' as const,
            label: 'Actions',
            render: (id) => (
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => onSelectPermission?.(id as string)}>
                  View
                </Button>
                {onDeletePermission && (
                  <Button size="sm" variant="danger" onClick={() => onDeletePermission(id as string)}>
                    Delete
                  </Button>
                )}
              </div>
            ),
          },
        ]}
        data={permissions as unknown as Record<string, unknown>[]}
        rowKey="id"
        isLoading={loading}
        emptyMessage="No permissions found."
      />

      {/* Add Permission Modal */}
      <Modal
        isOpen={isAddModalOpen}
        title="Add New Permission"
        onClose={() => {
          setIsAddModalOpen(false);
          setNewPermission({ name: '', description: '', category: '' });
          setLocalError(null);
        }}
        footer={
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setNewPermission({ name: '', description: '', category: '' });
              }}
            >
              Cancel
            </Button>
            <Button isLoading={isAdding} onClick={handleAddPermission}>
              Create Permission
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Permission Name"
            placeholder="e.g., CREATE_USER"
            value={newPermission.name}
            onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
            error={localError && !newPermission.name ? 'Required' : undefined}
          />
          <Input
            label="Description"
            placeholder="What does this permission allow?"
            value={newPermission.description}
            onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
          />
          <Input
            label="Category"
            placeholder="e.g., User Management"
            value={newPermission.category}
            onChange={(e) => setNewPermission({ ...newPermission, category: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  );
};
