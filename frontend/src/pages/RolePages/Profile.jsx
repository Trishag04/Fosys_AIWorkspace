import React from "react";
import Card from "../components/Card";

export default function Profile({ role, name="John Doe", email="user@example.com", id="U123", department="Engineering" }) {
  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
        <div>
          <h2 className="text-2xl">{name}</h2>
          <p>{role}</p>
          <p>{id}</p>
        </div>
      </div>

      <Card title="Account Info">
        <p>Email: {email}</p>
        <p>Department: {department}</p>
        <button className="mt-2 px-3 py-1 bg-blue-600 rounded">Edit Info</button>
      </Card>

      <Card title="Login & Security">
        <button className="px-3 py-1 bg-blue-600 rounded">Change Password</button>
        <div className="mt-2 flex items-center gap-2">
          <span>Two Factor Authentication</span>
          <input type="checkbox" />
        </div>
      </Card>

      <Card title="Appearance">
        <p>Timezone: UTC+0</p>
      </Card>

      <Card title="Other Utilities">
        <button className="px-3 py-1 bg-red-600 rounded">Log Out</button>
        <button className="mt-2 px-3 py-1 bg-gray-600 rounded">Help & Support</button>
      </Card>
    </div>
  );
}
