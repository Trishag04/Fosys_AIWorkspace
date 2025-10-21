import React from "react";
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import { tasks, prs, projects } from "../../utils/mockData";

export default function AdminDashboard() {
  const roles = ["Intern", "Employee", "Manager", "Admin"];
  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 p-8 bg-background min-h-screen">
        <h2 className="text-2xl mb-4">Admin Overview</h2>
        <div className="grid grid-cols-4 gap-5 mb-5">
          {roles.map(role => (
            <Card key={role} title={`Role: ${role}`}>
              {tasks.filter(t => t.assignedTo.toLowerCase() === role.toLowerCase()).length} Tasks
            </Card>
          ))}
        </div>

        <Card title="Projects">
          {projects.map(p => (
            <div key={p.id} className="flex justify-between mb-2">
              <span>{p.title}</span>
              <span>{p.status}</span>
            </div>
          ))}
        </Card>

        <Card title="Pull Requests">
          {prs.map(pr => (
            <div key={pr.id} className="flex justify-between mb-2">
              <span>{pr.task}</span>
              <span>{pr.status}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
