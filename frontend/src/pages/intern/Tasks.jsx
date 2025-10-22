import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Search } from 'lucide-react';

const InternTasks = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const tasksToday = [
    { id: 1, title: 'Fix login bug in authentication', status: 'In Progress', dueDate: '2025-01-15' },
    { id: 2, title: 'Review pull request #142', status: 'Pending', dueDate: '2025-01-15' },
  ];

  const pendingTasks = [
    { id: 3, title: 'Update documentation for API endpoints', status: 'Pending', assigned: '2025-01-13' },
    { id: 4, title: 'Refactor authentication module', status: 'Pending', assigned: '2025-01-12' },
  ];

  const completedTasks = [
    { id: 5, title: 'Implement user profile page', status: 'Completed', assigned: '2025-01-10', completed: '2025-01-14' },
    { id: 6, title: 'Fix CSS styling issues', status: 'Completed', assigned: '2025-01-08', completed: '2025-01-13' },
  ];

  const allTasks = [...tasksToday, ...pendingTasks, ...completedTasks];

  const filteredTasks = (tasks) => {
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Progress': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Pending': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <DashboardLayout role="intern">
      <div data-testid="intern-tasks" className="space-y-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Tasks</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            data-testid="task-search-input"
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
          />
        </div>

        {/* Tasks of the Day */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Tasks of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTasks(tasksToday).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex-1">
                    <p className="text-white font-medium">{task.title}</p>
                    <p className="text-sm text-slate-400">Due: {task.dueDate}</p>
                  </div>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTasks(pendingTasks).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex-1">
                    <p className="text-white font-medium">{task.title}</p>
                    <p className="text-sm text-slate-400">Assigned: {task.assigned}</p>
                  </div>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTasks(completedTasks).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex-1">
                    <p className="text-white font-medium">{task.title}</p>
                    <p className="text-sm text-slate-400">Assigned: {task.assigned} | Completed: {task.completed}</p>
                  </div>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InternTasks;
