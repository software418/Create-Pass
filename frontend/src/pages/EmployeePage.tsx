import React, { useState } from 'react';
import { useEmployees } from '@/master/useEmployee';
import type { EmployeeStatus } from '@/master/types';

export const EmployeePage: React.FC = () => {
  const { employees, isLoading, error, onCreate, onDelete } = useEmployees();
  const [filterDepartment, setFilterDepartment] = useState<string>('');

  // Local helper state to determine color coding for enums
  const getStatusBadgeClass = (status: EmployeeStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'blocked': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'deleted': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter computation loop executing dynamically on rendering
  const filteredEmployees = employees.filter((emp) => 
    filterDepartment === '' || emp.department.toLowerCase().includes(filterDepartment.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Employee Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage corporate profiles, roles, and authorization vectors.</p>
        </div>
        <button 
          onClick={() => {
            // Placeholder trigger for your Modal implementation
            const name = prompt("Enter Employee Name:");
            const empId = prompt("Enter Unique Employee ID:");
            const dept = prompt("Enter Department Name:");
            if (name && empId && dept) {
              onCreate({ name, employeeId: empId, department: dept, status: 'active' });
            }
          }}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          Add Employee
        </button>
      </div>

      {/* Internal Messaging Alerts */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      {/* Filter and Utility Controllers */}
      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <input
          type="text"
          placeholder="Filter table by department..."
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="bg-white border border-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full max-w-xs p-2.5 outline-none transition-all"
        />
      </div>

      {/* High Performance Table Matrix */}
      <div className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">ID / Code</th>
                <th className="px-6 py-4 font-semibold">Full Name</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Designation</th>
                <th className="px-6 py-4 font-semibold">Contact Info</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 font-medium text-gray-400">
                    Loading corporate directory registers...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 font-medium text-gray-400">
                    No matching employee entries matched the current context options.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-700">
                      {emp.employeeId}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {emp.department}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {emp.designation || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col max-w-50 overflow-hidden text-xs space-y-0.5">
                        <span className="text-gray-700 truncate font-medium">{emp.email || 'No Email'}</span>
                        <span className="text-gray-400 truncate">{emp.phone || 'No Phone'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs border font-medium rounded-full ${getStatusBadgeClass(emp.status)}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    
                      <button 
                        onClick={() => {
                          if (confirm(`Revoke completely all access rights for ${emp.name}?`)) {
                            onDelete(emp._id);
                          }
                        }}
                        className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
