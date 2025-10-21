import React, { useState } from "react";
import dayjs from "dayjs";
import { events } from "../utils/mockData";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();
  const dates = [];
  for (let i = 0; i < startOfMonth; i++) dates.push(null);
  for (let i = 1; i <= daysInMonth; i++) dates.push(i);

  const handleAddEvent = (date) => {
    alert("Mock popup: Add Event for " + date);
  };

  return (
    <div className="bg-[rgb(30,30,30)] p-5 rounded-xl text-gray-200">
      <div className="flex justify-between mb-5">
        <button onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}>Prev</button>
        <h3 className="font-semibold text-lg">{currentMonth.format("MMMM YYYY")}</h3>
        <button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>Next</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d} className="font-semibold">{d}</div>)}
        {dates.map((date, idx) => (
          <div
            key={idx}
            className={`h-16 p-1 border border-gray-700 rounded cursor-pointer relative`}
            onClick={() => date && handleAddEvent(date)}
          >
            {date && <span>{date}</span>}
            {date && events.filter(e => dayjs(e.date).date()===date).map((e,i)=>(
              <div key={i} className={`w-2 h-2 rounded-full absolute bottom-1 right-1 bg-${e.color}-500`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
