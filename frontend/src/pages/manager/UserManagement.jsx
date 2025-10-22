import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Search, FolderKanban } from 'lucide-react';

const ManagerUserManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    { id: 1, title: 'Authentication System', description: 'Implement OAuth and JWT authentication', status: 'Ongoing' },
    { id: 2, title: 'Dashboard Redesign', description: 'Modern UI/UX improvements', status: 'Ongoing' },
    { id: 3, title: 'API Documentation', description: 'Comprehensive API docs with examples', status: 'Ongoing' },
    { id: 4, title: 'Mobile App', description: 'React Native mobile application', status: 'Upcoming' },
    { id: 5, title: 'Legacy System Migration', description: 'Migrate old codebase to new stack', status: 'Completed' },
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Ongoing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Upcoming': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <DashboardLayout role="manager">
      <div data-testid="manager-user-management" className="space-y-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Overview</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            data-testid="user-management-search-input"
            type="text"
            placeholder="Search by roles & names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              data-testid={`user-mgmt-project-card-${project.id}`}
              onClick={() => navigate(`/manager/user-management/${project.id}`)}
              className="bg-slate-900/50 border-slate-800 cursor-pointer hover:border-indigo-500/50 transition-all card-hover"
            >
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
                <p className="text-sm text-slate-400">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerUserManagement;
