
import React, { useState } from 'react';
import { Table, Badge, Input } from '../ui';

interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityName: string;
  performedBy: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILURE';
}

export const AuditLogsPage: React.FC = () => {
  const [logs] = useState<AuditLogEntry[]>([]);
  const [loading] = useState(false);

  const getStatusColor = (status: string) => {
    return status === 'SUCCESS' ? 'success' : 'danger';
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'success';
      case 'UPDATE':
        return 'info';
      case 'DELETE':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600 mt-1">Track all system activity and changes</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Input label="Search" placeholder="Search logs..." />
          <Input label="From Date" type="date" />
          <Input label="To Date" type="date" />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={[
          { key: 'action' as const, label: 'Action', render: (action) => <Badge variant={getActionColor(action as string)}>{String(action)}</Badge> },
          { key: 'entityType' as const, label: 'Entity Type' },
          { key: 'entityName' as const, label: 'Entity' },
          { key: 'performedBy' as const, label: 'Performed By' },
          { key: 'timestamp' as const, label: 'Timestamp' },
          { key: 'status' as const, label: 'Status', render: (status) => <Badge variant={getStatusColor(status as string)}>{String(status)}</Badge> },
        ]}
        data={logs as unknown as Record<string, unknown>[]}
        rowKey="id"
        isLoading={loading}
        emptyMessage="No audit logs found."
      />
    </div>
  );
};
