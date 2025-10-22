import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Search, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const ManagerProjectTasks = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock project data
  const projectNames = {
    '1': 'Authentication System',
    '2': 'Dashboard Redesign',
    '3': 'API Documentation',
    '4': 'Mobile App',
    '5': 'Legacy System Migration'
  };

  const tasksToday = [
    { id: 1, title: 'Implement OAuth flow', assignee: 'Sarah Williams', dueDate: '2025-01-15', status: 'In Progress' },
    { id: 2, title: 'JWT token validation', assignee: 'Alex Johnson', dueDate: '2025-01-15', status: 'Pending' },
  ];

  const allTasks = [
    ...tasksToday,
    { id: 3, title: 'Password reset functionality', assignee: 'Michael Chen', dueDate: '2025-01-16', status: 'Pending' },
    { id: 4, title: 'Social login integration', assignee: 'Emma Davis', dueDate: '2025-01-17', status: 'Completed' },
    { id: 5, title: 'Session management', assignee: 'Sarah Williams', dueDate: '2025-01-18', status: 'In Progress' },
  ];

  const filteredTasks = allTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.status === 'Completed').length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Progress': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Pending': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            data-testid="back-to-projects-button"
            onClick={() => navigate('/manager/projects')}
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
            {projectNames[projectId] || 'Project'} - Tasks
          </h1>
        </div>

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
              {tasksToday.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex-1">
                    <p className="text-white font-medium">{task.title}</p>
                    <p className="text-sm text-slate-400">{task.assignee} • Due: {task.dueDate}</p>
                  </div>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Section */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-400">Overall Task Completion</p>
                <p className="text-white font-semibold">{completionPercentage}%</p>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <p className="text-sm text-slate-400">{completedTasks} of {totalTasks} tasks completed</p>
            </div>
          </CardContent>
        </Card>

        {/* All Tasks */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Task</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Assignee</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Due Date</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-800">
                      <td className="py-3 px-4 text-white">{task.title}</td>
                      <td className="py-3 px-4 text-slate-300">{task.assignee}</td>
                      <td className="py-3 px-4 text-slate-400">{task.dueDate}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerProjectTasks;
