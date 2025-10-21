import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTasks, FaClipboardList, FaProjectDiagram, FaUser } from "react-icons/fa";

const Sidebar = ({ role }) => {
  const location = useLocation();
  const links = {
    intern: [
      { name: "Home", icon: <FaHome />, path: "/dashboard/intern" },
      { name: "Tasks", icon: <FaTasks />, path: "/dashboard/intern/tasks" },
      { name: "PRs", icon: <FaClipboardList />, path: "/dashboard/intern/prs" },
      { name: "Planner", icon: <FaProjectDiagram />, path: "/dashboard/intern/planner" },
      { name: "Profile", icon: <FaUser />, path: "/dashboard/intern/profile" },
    ],
    employee: [
      { name: "Home", icon: <FaHome />, path: "/dashboard/employee" },
      { name: "Tasks", icon: <FaTasks />, path: "/dashboard/employee/tasks" },
      { name: "PRs", icon: <FaClipboardList />, path: "/dashboard/employee/prs" },
      { name: "Planner", icon: <FaProjectDiagram />, path: "/dashboard/employee/planner" },
      { name: "Profile", icon: <FaUser />, path: "/dashboard/employee/profile" },
    ],
    manager: [
      { name: "Home", icon: <FaHome />, path: "/dashboard/manager" },
      { name: "Projects", icon: <FaProjectDiagram />, path: "/dashboard/manager/projects" },
      { name: "PRs", icon: <FaClipboardList />, path: "/dashboard/manager/prs" },
      { name: "User Management", icon: <FaUser />, path: "/dashboard/manager/users" },
      { name: "Planner", icon: <FaProjectDiagram />, path: "/dashboard/manager/planner" },
      { name: "Profile", icon: <FaUser />, path: "/dashboard/manager/profile" },
    ],
    admin: [
      { name: "Home", icon: <FaHome />, path: "/dashboard/admin" },
      { name: "Projects", icon: <FaProjectDiagram />, path: "/dashboard/admin/projects" },
      { name: "PRs", icon: <FaClipboardList />, path: "/dashboard/admin/prs" },
      { name: "User Management", icon: <FaUser />, path: "/dashboard/admin/users" },
      { name: "Planner", icon: <FaProjectDiagram />, path: "/dashboard/admin/planner" },
      { name: "Profile", icon: <FaUser />, path: "/dashboard/admin/profile" },
    ],
  };

  return (
    <div className="w-64 h-screen bg-[rgb(24,24,24)] text-gray-200 flex flex-col p-4">
      <div className="flex items-center gap-2 mb-10">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold">FOSYS</h1>
      </div>
      <nav className="flex flex-col gap-3">
        {links[role].map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 ${
              location.pathname === link.path ? "bg-blue-700" : ""
            }`}
          >
            {link.icon} <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
