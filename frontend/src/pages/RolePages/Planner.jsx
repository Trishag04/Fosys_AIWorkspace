import React from "react";
import Calendar from "../components/Calendar";

export default function Planner() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <h2 className="text-2xl mb-5">Planner</h2>
      <Calendar />
    </div>
  );
}
