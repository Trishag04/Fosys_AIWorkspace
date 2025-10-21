import React from "react";
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import { tasks, prs, projects } from "../../utils/mockData";

export default function ManagerDashboard() {
  return (
    <div className="flex">
      <Sidebar role="manager" />
      <div className="flex-1 p-8 bg-background min-h-screen">
        <h2 className="text-2xl mb-4">Let's crush it today!!</h2>
        <p className="mb-5">{new Date().toDateString()}</p>

        <div className="grid grid-cols-4 gap-5 mb-5">
          <Card title="Total Projects">{projects.length}</Card>
          <Card title="Total Tasks">{tasks.length}</Card>
          <Card title="Pull Requests">{prs.length}</Card>
          <Card title="Transcripts">3</Card>
        </div>

        <Card title="Upcoming Deadlines">
          {tasks.filter(t => new Date(t.dueDate) <= new Date()).map(t => (
            <div key={t.id} className="flex justify-between mb-2">
              <span>{t.title}</span>
              <span>{t.dueDate}</span>
            </div>
          ))}
        </Card>

        <Card title="Project Performance">
          {projects.map(p => (
            <div key={p.id} className="mb-2">
              <p>{p.title}</p>
              <div className="bg-gray-700 h-2 rounded">
                <div className="bg-blue-600 h-2 rounded" style={{width: `${Math.floor(Math.random()*100)}%`}}></div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
