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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/roles"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 -960 960 960">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M484.23-247.69Zm18.31 60H180v-88.93q0-29.38 15.96-54.42 15.96-25.04 42.66-38.5 59.3-29.07 119.65-43.61 60.35-14.54 121.73-14.54v60q-54.7 0-108.43 13.11-53.72 13.12-105.42 38.58-12.07 6.54-19.11 16.88-7.04 10.35-7.04 22.5v28.93h244.23q2.82 15.75 7.39 30.75 4.58 15 10.92 29.25ZM713.85-100q-66.85-16.46-106.5-73.57-39.66-57.12-39.66-127.12v-93.6l146.16-73.4L860-394.25v93.64q0 69.76-39.66 126.96-39.65 57.19-106.49 73.65Zm0-62.08q41.07-16.46 63.8-55.19 22.73-38.73 22.73-83.42v-56.62l-86.53-43.08-86.54 43.08v56.62q0 44.69 22.73 83.42 22.73 38.73 63.81 55.19ZM381.04-533.35Q340-574.38 340-632.31q0-57.92 41.04-98.96 41.04-41.04 98.96-41.04 57.92 0 98.96 41.04Q620-690.23 620-632.31q0 57.93-41.04 98.96-41.04 41.04-98.96 41.04-57.92 0-98.96-41.04Zm155.46-42.46q23.5-23.5 23.5-56.5t-23.5-56.5q-23.5-23.5-56.5-23.5t-56.5 23.5q-23.5 23.5-23.5 56.5t23.5 56.5q23.5 23.5 56.5 23.5t56.5-23.5Zm-56.5-56.5Zm233.85 351.08Z" />
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
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 -960 960 960">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M408.04-520.38h143.77q29.65 0 50.84-21.1 21.19-21.11 21.19-50.74 0-29.63-21.11-50.82-21.12-21.19-50.77-21.19H408.19q-29.65 0-50.84 21.1-21.19 21.1-21.19 50.73 0 29.63 21.11 50.82 21.12 21.2 50.77 21.2Zm121.15-47.26q-9.96-9.95-9.96-24.65 0-14.71 9.95-24.67t24.65-9.96q14.71 0 24.67 9.95 9.96 9.94 9.96 24.65 0 14.71-9.95 24.67t-24.65 9.96q-14.71 0-24.67-9.95ZM408.04-335.77h143.77q29.65 0 50.84-21.1 21.19-21.1 21.19-50.73 0-29.63-21.11-50.82-21.12-21.2-50.77-21.2H408.19q-29.65 0-50.84 21.1-21.19 21.11-21.19 50.74 0 29.63 21.11 50.82 21.12 21.19 50.77 21.19Zm-26.54-47.26q-9.96-9.94-9.96-24.65 0-14.71 9.95-24.67t24.65-9.96q14.71 0 24.67 9.95t9.96 24.65q0 14.71-9.95 24.67t-24.65 9.96q-14.71 0-24.67-9.95ZM480-100.77q-129.77-35.39-214.88-152.77Q180-370.92 180-516v-230.15l300-112.31 300 112.31V-516q0 145.08-85.12 262.46Q609.77-136.16 480-100.77Zm0-63.23q104-33 172-132t68-220v-189l-240-89.62L240-705v189q0 121 68 220t172 132Zm0-315.62Z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Permissions</p>
              <p className="text-sm text-gray-600">Define permissions</p>
            </div>
          </a>
          
          <a
            href="/users"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 -960 960 960">
                <path d="M381.04-533.35Q340-574.38 340-632.31q0-57.92 41.04-98.96 41.04-41.04 98.96-41.04 57.92 0 98.96 41.04Q620-690.23 620-632.31q0 57.93-41.04 98.96-41.04 41.04-98.96 41.04-57.92 0-98.96-41.04ZM180-187.69v-88.93q0-29.38 15.96-54.42 15.96-25.04 42.66-38.5 59.3-29.07 119.65-43.61 60.35-14.54 121.73-14.54t121.73 14.54q60.35 14.54 119.65 43.61 26.7 13.46 42.66 38.5Q780-306 780-276.62v88.93H180Zm60-60h480v-28.93q0-12.15-7.04-22.5-7.04-10.34-19.11-16.88-51.7-25.46-105.42-38.58Q534.7-367.69 480-367.69q-54.7 0-108.43 13.11-53.72 13.12-105.42 38.58-12.07 6.54-19.11 16.88-7.04 10.35-7.04 22.5v28.93Zm296.5-328.12q23.5-23.5 23.5-56.5t-23.5-56.5q-23.5-23.5-56.5-23.5t-56.5 23.5q-23.5 23.5-23.5 56.5t23.5 56.5q23.5 23.5 56.5 23.5t56.5-23.5Zm-56.5-56.5Zm0 384.62Z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-600">Define user roles and permissions</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
