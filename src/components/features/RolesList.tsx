/**
 * Roles List Page Component
 * Display and manage all roles
 */

import React, { useState } from 'react';
import { Button, Table, Badge, Modal, Input, Alert } from '../ui';
import type { IRole } from '../../features/roles/rolesTypes';

interface RolesListProps {
  roles: IRole[];
  loading: boolean;
  error: string | null;
  onAddRole: (roleData: { name: string; description: string }) => Promise<void>;
  onDeleteRole?: (roleId: string) => Promise<void>;
  onSelectRole?: (roleId: string) => void;
}

export const RolesList: React.FC<RolesListProps> = ({
  roles,
  loading,
  error,
  onAddRole,
  onDeleteRole,
  onSelectRole,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleAddRole = async () => {
    if (!newRole.name.trim()) {
      setLocalError('Role name is required');
      return;
    }

    setIsAddingRole(true);
    try {
      await onAddRole(newRole);
      setNewRole({ name: '', description: '' });
      setIsAddModalOpen(false);
      setLocalError(null);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to create role');
    } finally {
      setIsAddingRole(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'warning';
    //   case 'ARCHIVED':
    //     return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Roles</h1>
          <p className="text-gray-600 mt-1">Manage system roles and permissions</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Role
        </Button>
      </div>

      {/* Alerts */}
      {error && <Alert variant="error" title="Error" onClose={() => {}}>{error}</Alert>}
      {localError && <Alert variant="error" onClose={() => setLocalError(null)}>{localError}</Alert>}

      {/* Table */}
      <Table
        columns={[
          { key: 'name' as const, label: 'Name' },
          { key: 'description' as const, label: 'Description' },
          {
            key: 'status' as const,
            label: 'Status',
            render: (status) => <Badge variant={getStatusColor(status as string)}>{String(status)}</Badge>,
          },
          {
            key: 'id' as const,
            label: 'Actions',
            render: (id) => (
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => onSelectRole?.(id as string)}>
                  View
                </Button>
                {onDeleteRole && (
                  <Button size="sm" variant="danger" onClick={() => onDeleteRole(id as string)}>
                    Delete
                  </Button>
                )}
              </div>
            ),
          },
        ]}
        data={roles as unknown as Record<string, unknown>[]}
        rowKey="id"
        isLoading={loading}
        emptyMessage="No roles found. Create one to get started."
      />

      {/* Add Role Modal */}
      <Modal
        isOpen={isAddModalOpen}
        title="Add New Role"
        onClose={() => {
          setIsAddModalOpen(false);
          setNewRole({ name: '', description: '' });
          setLocalError(null);
        }}
        footer={
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setNewRole({ name: '', description: '' });
              }}
            >
              Cancel
            </Button>
            <Button isLoading={isAddingRole} onClick={handleAddRole}>
              Create Role
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Role Name"
            placeholder="e.g., Administrator"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            error={localError && !newRole.name ? 'Required' : undefined}
          />
          <Input
            label="Description"
            placeholder="Describe the purpose of this role"
            value={newRole.description}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  );
};
