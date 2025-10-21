export const tasks = [
  { id: 1, title: "Implement Login", assignedTo: "intern", status: "Pending", dueDate: "2025-10-22" },
  { id: 2, title: "Setup PR webhook", assignedTo: "employee", status: "InProgress", dueDate: "2025-10-23" },
  { id: 3, title: "Draft Project Plan", assignedTo: "manager", status: "Completed", dueDate: "2025-10-21" },
];

export const prs = [
  { id: 101, task: "Login Feature", status: "Open", lastUpdated: "2025-10-20" },
  { id: 102, task: "PR Webhook", status: "InReview", lastUpdated: "2025-10-20" },
];

export const projects = [
  { id: 201, title: "FOSYS Frontend", description: "Build professional UI", status: "Ongoing" },
  { id: 202, title: "FOSYS Backend", description: "API and DB integration", status: "Upcoming" },
];

export const events = [
  { date: "2025-10-21", title: "SCRUM", color: "green" },
  { date: "2025-10-22", title: "Meeting", color: "blue" },
  { date: "2025-10-23", title: "Holiday", color: "red" },
];
