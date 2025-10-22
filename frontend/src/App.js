import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@/App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Intern Dashboard
import InternHome from './pages/intern/Home';
import InternTasks from './pages/intern/Tasks';
import InternPRs from './pages/intern/PRs';
import InternPlanner from './pages/intern/Planner';
import InternProfile from './pages/intern/Profile';

// Employee Dashboard
import EmployeeHome from './pages/employee/Home';
import EmployeeTasks from './pages/employee/Tasks';
import EmployeePRs from './pages/employee/PRs';
import EmployeePlanner from './pages/employee/Planner';
import EmployeeProfile from './pages/employee/Profile';

// Manager Dashboard
import ManagerHome from './pages/manager/Home';
import ManagerProjects from './pages/manager/Projects';
import ManagerProjectTasks from './pages/manager/ProjectTasks';
import ManagerPRs from './pages/manager/PRs';
import ManagerProjectPRs from './pages/manager/ProjectPRs';
import ManagerUserManagement from './pages/manager/UserManagement';
import ManagerProjectOverview from './pages/manager/ProjectOverview';
import ManagerPlanner from './pages/manager/Planner';
import ManagerProfile from './pages/manager/Profile';

// Admin Dashboard
import AdminHome from './pages/admin/Home';
import AdminUsers from './pages/admin/Users';
import AdminProjects from './pages/admin/Projects';
import AdminSettings from './pages/admin/Settings';
import AdminProfile from './pages/admin/Profile';

import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Intern Routes */}
          <Route path="/intern/home" element={<InternHome />} />
          <Route path="/intern/tasks" element={<InternTasks />} />
          <Route path="/intern/prs" element={<InternPRs />} />
          <Route path="/intern/planner" element={<InternPlanner />} />
          <Route path="/intern/profile" element={<InternProfile />} />

          {/* Employee Routes */}
          <Route path="/employee/home" element={<EmployeeHome />} />
          <Route path="/employee/tasks" element={<EmployeeTasks />} />
          <Route path="/employee/prs" element={<EmployeePRs />} />
          <Route path="/employee/planner" element={<EmployeePlanner />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />

          {/* Manager Routes */}
          <Route path="/manager/home" element={<ManagerHome />} />
          <Route path="/manager/projects" element={<ManagerProjects />} />
          <Route path="/manager/projects/:projectId/tasks" element={<ManagerProjectTasks />} />
          <Route path="/manager/prs" element={<ManagerPRs />} />
          <Route path="/manager/prs/:projectId" element={<ManagerProjectPRs />} />
          <Route path="/manager/user-management" element={<ManagerUserManagement />} />
          <Route path="/manager/user-management/:projectId" element={<ManagerProjectOverview />} />
          <Route path="/manager/planner" element={<ManagerPlanner />} />
          <Route path="/manager/profile" element={<ManagerProfile />} />

          {/* Admin Routes */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
