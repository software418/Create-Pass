
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../shared/layouts/DashboardLayout';
import { AuthLayout } from '../shared/layouts/AuthLayout';
import CreatePassPage from '../pages/CreatePassPage';
import { EmployeePage } from '@/pages/EmployeePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<div className="text-2xl font-bold">Welcome to Dashboard</div>} />
        <Route path="/create-pass" element={<CreatePassPage />} />
        <Route path="/employee-config" element={<EmployeePage />} />
      </Route>
    </Routes>
  );
};
