import React from "react";
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import { tasks, prs } from "../../utils/mockData";

export default function InternDashboard() {
  return (
    <div className="flex">
      <Sidebar role="intern" />
      <div className="flex-1 p-8 bg-background min-h-screen">
        <h2 className="text-2xl mb-4">Let's crush it today!!</h2>
        <p className="mb-5">{new Date().toDateString()}</p>

        <Card title="Tasks">
          {tasks.filter(t => t.assignedTo==="intern").map(task => (
            <div key={task.id} className="flex justify-between mb-2">
              <span>{task.title}</span>
              <span className={`text-sm ${task.status==="Completed"?"text-green-400":task.status==="InProgress"?"text-yellow-400":"text-red-400"}`}>{task.status}</span>
            </div>
          ))}
        </Card>

        <Card title="Pull Requests">
          {prs.map(pr => (
            <div key={pr.id} className="flex justify-between mb-2">
              <span>{pr.task}</span>
              <span className="text-sm">{pr.status}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
