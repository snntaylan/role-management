/**
 * Dashboard Component
 * Overview of the system
 */

import React from 'react';

interface DashboardProps {
  totalRoles: number;
  totalPermissions: number;
  totalUsers: number;
  activeAssignments: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  totalRoles,
  totalPermissions,
  totalUsers,
  activeAssignments,
}) => {
  const stats = [
    { label: 'Total Roles', value: totalRoles, color: 'bg-blue-100 text-blue-600' },
    { label: 'Permissions', value: totalPermissions, color: 'bg-green-100 text-green-600' },
    { label: 'Users', value: totalUsers, color: 'bg-purple-100 text-purple-600' },
    { label: 'Active Assignments', value: activeAssignments, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your role management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/roles"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646M3 12H1m8-11v2m8 0v-2m8 11h2M4.172 19.172a4 4 0 015.656 0M15.172 19.172a4 4 0 015.656 0m-12-2.828a6 6 0 018.485 0" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Roles</p>
              <p className="text-sm text-gray-600">Create and edit roles</p>
            </div>
          </a>

          <a
            href="/permissions"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Permissions</p>
              <p className="text-sm text-gray-600">Define permissions</p>
            </div>
          </a>

          <a
            href="/assignments"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Assign Roles</p>
              <p className="text-sm text-gray-600">Assign roles to users</p>
            </div>
          </a>

          <a
            href="/audit-logs"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">View Audit Logs</p>
              <p className="text-sm text-gray-600">Track system activity</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
