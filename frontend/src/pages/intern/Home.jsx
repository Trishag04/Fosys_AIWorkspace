import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Sparkles, Plus, GitPullRequest } from 'lucide-react';
import { toast } from 'sonner';

const InternHome = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix login bug in authentication', status: 'In Progress', dueDate: '2025-01-15' },
    { id: 2, title: 'Update documentation for API endpoints', status: 'Pending', dueDate: '2025-01-16' },
    { id: 3, title: 'Implement user profile page', status: 'Completed', dueDate: '2025-01-14' },
  ]);

  const [prs, setPrs] = useState([
    { id: 1, title: 'PR #145: Fix authentication flow', status: 'Open', updated: '2 hours ago' },
    { id: 2, title: 'PR #142: Update API docs', status: 'In Review', updated: '5 hours ago' },
    { id: 3, title: 'PR #138: Profile page implementation', status: 'Merged', updated: '1 day ago' },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '' });

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask.title, status: 'Pending', dueDate: newTask.dueDate }]);
      setNewTask({ title: '', dueDate: '' });
      setDialogOpen(false);
      toast.success('Task added successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': case 'Merged': case 'Approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Progress': case 'In Review': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Pending': case 'Open': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <DashboardLayout role="intern">
      <div data-testid="intern-dashboard" className="space-y-6">
        {/* Welcome Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-indigo-500" />
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Let's crush it today!!</h1>
          </div>
          <p className="text-slate-400">{currentDate}</p>
        </div>

        {/* Tasks Card */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} data-testid={`task-${task.id}`} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
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

        {/* Pull Requests Card */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Pull Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {prs.map((pr) => (
                <div key={pr.id} data-testid={`pr-${pr.id}`} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3 flex-1">
                    <GitPullRequest className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="text-white font-medium">{pr.title}</p>
                      <p className="text-sm text-slate-400">{pr.updated}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(pr.status)}>{pr.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Panel */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Quick Action Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="add-task-button" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-800">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add New Task</DialogTitle>
                    <DialogDescription className="text-slate-400">Create a new task for your workflow</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="task-title" className="text-slate-300">Task Title</Label>
                      <Input
                        id="task-title"
                        data-testid="task-title-input"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Enter task description"
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-due-date" className="text-slate-300">Due Date</Label>
                      <Input
                        id="task-due-date"
                        data-testid="task-due-date-input"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <Button data-testid="save-task-button" onClick={handleAddTask} className="w-full bg-indigo-600 hover:bg-indigo-700">Save Task</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                data-testid="raise-pr-button"
                onClick={() => {
                  window.open('https://github.com', '_blank');
                  toast.info('Opening GitHub...');
                }}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <GitPullRequest className="w-4 h-4 mr-2" />
                Raise PR
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InternHome;
