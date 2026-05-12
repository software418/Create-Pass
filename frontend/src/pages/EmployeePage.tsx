/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
// import { Button } from '@/shared/ui/atoms/Button';

interface Employee {
  _id: string;
  name: string;
  code: number;
  department: string;
  status: "active" | "blocked" | "deleted";
}

export const EmployeePage: React.FC = () => {
  // Define types for state to prevent "never[]" errors
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch Employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Employee[]>("/api/employees");
      setEmployees(res.data);
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 2. Toggle Block/Unblock
  const handleToggleStatus = async (emp: Employee) => {
    try {
      const newStatus = emp.status === "active" ? "blocked" : "active";
      await axios.patch(`/api/employees/${emp._id}`, { status: newStatus });
      fetchEmployees(); // Refresh list
    } catch (err: any) {
      alert("Could not update status");

      throw new Error("error", err);
    }
  };

  // 3. Delete (Soft Delete)
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/employees/${id}`);
      fetchEmployees();
    } catch (err: any) {
      alert("Delete failed");
      throw new Error("error", err);
    }
  };

  if (loading) return <div className="p-10">Loading Employees...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          + Add Employee
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Code</th>
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Department</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{emp.code}</td>
                <td className="p-4 font-medium">{emp.name}</td>
                <td className="p-4">{emp.department}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${
                      emp.status === "active"
                        ? "bg-green-100 text-green-700"
                        : emp.status === "blocked"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <button
                    onClick={() => handleToggleStatus(emp)}
                    className="text-sm font-semibold text-gray-600 hover:text-blue-600"
                  >
                    {emp.status === "active" ? "Block" : "Unblock"}
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="text-sm font-semibold text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
