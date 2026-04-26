import React from 'react';

export const Dashboard: React.FC = () => {
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your role management system</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
        </div>
      </div>
    </div>
  );
};
