import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Search, Plus, FolderKanban } from 'lucide-react';
import { toast } from 'sonner';

const ManagerProjects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projects, setProjects] = useState([
    { id: 1, title: 'Authentication System', description: 'Implement OAuth and JWT authentication', status: 'Ongoing' },
    { id: 2, title: 'Dashboard Redesign', description: 'Modern UI/UX improvements', status: 'Ongoing' },
    { id: 3, title: 'API Documentation', description: 'Comprehensive API docs with examples', status: 'Ongoing' },
    { id: 4, title: 'Mobile App', description: 'React Native mobile application', status: 'Upcoming' },
    { id: 5, title: 'Legacy System Migration', description: 'Migrate old codebase to new stack', status: 'Completed' },
  ]);
  const [newProject, setNewProject] = useState({ title: '', description: '', status: 'Ongoing' });

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, { id: projects.length + 1, ...newProject }]);
      setNewProject({ title: '', description: '', status: 'Ongoing' });
      setDialogOpen(false);
      toast.success('Project added successfully!');
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div data-testid="manager-projects" className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Projects</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="add-project-button" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Project</DialogTitle>
                <DialogDescription className="text-slate-400">Create a new project to manage</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project-title" className="text-slate-300">Project Title</Label>
                  <Input
                    id="project-title"
                    data-testid="project-title-input"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Enter project title"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="project-description" className="text-slate-300">Short Description</Label>
                  <Textarea
                    id="project-description"
                    data-testid="project-description-input"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Brief project description"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="project-status" className="text-slate-300">Status</Label>
                  <Select value={newProject.status} onValueChange={(value) => setNewProject({ ...newProject, status: value })}>
                    <SelectTrigger data-testid="project-status-select" className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button data-testid="save-project-button" onClick={handleAddProject} className="w-full bg-indigo-600 hover:bg-indigo-700">Save Project</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            data-testid="project-search-input"
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
          />
        </div>

        <p className="text-slate-400 text-sm">Select Project</p>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              data-testid={`project-card-${project.id}`}
              onClick={() => navigate(`/manager/projects/${project.id}/tasks`)}
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

export default ManagerProjects;
