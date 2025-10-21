import React from "react";

export default function Card({ title, children }) {
  return (
    <div className="bg-[rgb(30,30,30)] p-5 rounded-xl shadow-md mb-5">
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
}
