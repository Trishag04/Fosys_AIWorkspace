import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Sparkles, FolderKanban, ListTodo, GitPullRequest, FileText } from 'lucide-react';

const ManagerHome = () => {
  const metrics = [
    { icon: FolderKanban, label: 'Total Projects', value: '8', subtext: '5 ongoing, 3 completed', color: 'indigo' },
    { icon: ListTodo, label: 'Total Tasks', value: '42', subtext: '18 completed, 24 active', color: 'blue' },
    { icon: GitPullRequest, label: 'Pull Requests', value: '15', subtext: '8 open, 5 in review, 2 merged', color: 'purple' },
    { icon: FileText, label: 'Transcripts', value: '12', subtext: 'Last meeting: 2 hours ago', color: 'green' },
  ];

  const upcomingDeadlines = [
    { project: 'Authentication System', task: 'OAuth integration', dueDate: 'Tomorrow', assignee: 'Sarah Williams' },
    { project: 'Dashboard Redesign', task: 'Mobile responsiveness', dueDate: 'Jan 17', assignee: 'Alex Johnson' },
    { project: 'API Documentation', task: 'Endpoint testing', dueDate: 'Jan 18', assignee: 'Michael Chen' },
  ];

  const projectPerformance = [
    { name: 'Authentication System', progress: 85 },
    { name: 'Dashboard Redesign', progress: 60 },
    { name: 'API Documentation', progress: 45 },
    { name: 'Mobile App', progress: 30 },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <DashboardLayout role="manager">
      <div data-testid="manager-dashboard" className="space-y-6">
        {/* Welcome Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-indigo-500" />
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Let's crush it today!!</h1>
          </div>
          <p className="text-slate-400">{currentDate}</p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <Card key={idx} className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 text-${metric.color}-500`} />
                    <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{metric.value}</span>
                  </div>
                  <p className="text-white font-medium mb-1">{metric.label}</p>
                  <p className="text-sm text-slate-400">{metric.subtext}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Upcoming Deadlines */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.task}</p>
                    <p className="text-sm text-slate-400">{item.project} • {item.assignee}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-yellow-500">{item.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Project Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projectPerformance.map((project, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{project.name}</p>
                    <p className="text-slate-400 text-sm">{project.progress}%</p>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerHome;
