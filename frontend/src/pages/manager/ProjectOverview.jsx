import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { ArrowLeft } from 'lucide-react';

const ManagerProjectOverview = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const projectNames = {
    '1': 'Authentication System',
    '2': 'Dashboard Redesign',
    '3': 'API Documentation',
    '4': 'Mobile App',
    '5': 'Legacy System Migration'
  };

  const users = [
    { id: 1, name: 'Sarah Williams', userId: 'SW001', role: 'Employee', tasksAssigned: 5, progress: 80 },
    { id: 2, name: 'Alex Johnson', userId: 'AJ002', role: 'Intern', tasksAssigned: 3, progress: 60 },
    { id: 3, name: 'Michael Chen', userId: 'MC003', role: 'Employee', tasksAssigned: 4, progress: 75 },
    { id: 4, name: 'Emma Davis', userId: 'ED004', role: 'Intern', tasksAssigned: 2, progress: 100 },
  ];

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            data-testid="back-to-user-management-button"
            onClick={() => navigate('/manager/user-management')}
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
            {projectNames[projectId] || 'Project'}
          </h1>
        </div>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Team Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">User ID</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Tasks Assigned</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-slate-800">
                      <td className="py-4 px-4 text-white font-medium">{user.name}</td>
                      <td className="py-4 px-4 text-slate-300">{user.userId}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          user.role === 'Employee' 
                            ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' 
                            : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-300">{user.tasksAssigned}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Progress value={user.progress} className="h-2 flex-1" />
                          <span className="text-white font-medium w-12">{user.progress}%</span>
                        </div>
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

export default ManagerProjectOverview;
