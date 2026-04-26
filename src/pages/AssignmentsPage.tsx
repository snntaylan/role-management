/**
 * User Role Assignments Page Component
 */

import React, { useState } from 'react';
import { Button, Table, Badge, Modal, Select, Input, Alert } from '../ui';

interface UserAssignment {
  id: string;
  userId: string;
  userName: string;
  roleId: string;
  roleName: string;
  assignedAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export const AssignmentsPage: React.FC = () => {
  const [assignments] = useState<UserAssignment[]>([]);
  const [loading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    userId: '',
    roleId: '',
    expiresAt: '',
  });

  const userOptions = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' },
  ];

  const roleOptions = [
    { value: '1', label: 'Administrator' },
    { value: '2', label: 'Editor' },
    { value: '3', label: 'Viewer' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Role Assignments</h1>
          <p className="text-gray-600 mt-1">Assign roles to users</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Assign Role
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={[
          { key: 'userName' as const, label: 'User' },
          { key: 'roleName' as const, label: 'Role' },
          { key: 'assignedAt' as const, label: 'Assigned At' },
          { key: 'expiresAt' as const, label: 'Expires At', render: (exp) => exp ? String(exp) : 'Never' },
          { key: 'isActive' as const, label: 'Status', render: (active) => <Badge variant={active ? 'success' : 'danger'}>{active ? 'Active' : 'Inactive'}</Badge> },
        ]}
        data={assignments as unknown as Record<string, unknown>[]}
        rowKey="id"
        isLoading={loading}
        emptyMessage="No assignments found."
      />

      {/* Assignment Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Assign Role to User"
        onClose={() => setIsModalOpen(false)}
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button>Assign</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Select
            label="User"
            options={userOptions}
            value={newAssignment.userId}
            onChange={(e) => setNewAssignment({ ...newAssignment, userId: e.target.value })}
          />
          <Select
            label="Role"
            options={roleOptions}
            value={newAssignment.roleId}
            onChange={(e) => setNewAssignment({ ...newAssignment, roleId: e.target.value })}
          />
          <Input
            label="Expiration Date (Optional)"
            type="date"
            value={newAssignment.expiresAt}
            onChange={(e) => setNewAssignment({ ...newAssignment, expiresAt: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  );
};
