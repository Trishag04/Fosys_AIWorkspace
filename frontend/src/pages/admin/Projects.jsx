import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { FolderKanban } from 'lucide-react';

const AdminProjects = () => {
  const projects = [
    { id: 1, title: 'Authentication System', manager: 'Michael Chen', team: 8, progress: 85, status: 'Ongoing' },
    { id: 2, title: 'Dashboard Redesign', manager: 'Michael Chen', team: 6, progress: 60, status: 'Ongoing' },
    { id: 3, title: 'API Documentation', manager: 'Michael Chen', team: 4, progress: 45, status: 'Ongoing' },
    { id: 4, title: 'Mobile App', manager: 'Michael Chen', team: 5, progress: 30, status: 'Upcoming' },
    { id: 5, title: 'Legacy System Migration', manager: 'Michael Chen', team: 7, progress: 100, status: 'Completed' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Ongoing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Upcoming': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <DashboardLayout role="admin">
      <div data-testid="admin-projects" className="space-y-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Projects Overview</h1>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-400">Progress</p>
                      <p className="text-sm text-white font-medium">{project.progress}%</p>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-slate-400">Manager</p>
                    <p className="text-white">{project.manager}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-slate-400">Team Size</p>
                    <p className="text-white">{project.team} members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProjects;
