import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Sparkles, Users, FolderKanban, Shield, Activity } from 'lucide-react';

const AdminHome = () => {
  const metrics = [
    { icon: Users, label: 'Total Users', value: '24', subtext: '4 new this week', color: 'indigo' },
    { icon: FolderKanban, label: 'Active Projects', value: '12', subtext: '3 completed this month', color: 'blue' },
    { icon: Shield, label: 'System Health', value: '98%', subtext: 'All systems operational', color: 'green' },
    { icon: Activity, label: 'Active Sessions', value: '18', subtext: 'Peak time: 2-4 PM', color: 'purple' },
  ];

  const rolesAvailable = [
    { role: 'Intern', count: 6, color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
    { role: 'Employee', count: 12, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { role: 'Manager', count: 5, color: 'bg-green-500/10 text-green-500 border-green-500/20' },
    { role: 'Admin', count: 1, color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  ];

  const recentActivity = [
    { user: 'Sarah Williams', action: 'Completed authentication module', time: '2 hours ago' },
    { user: 'Michael Chen', action: 'Created new project: Mobile App', time: '4 hours ago' },
    { user: 'Alex Johnson', action: 'Merged PR #245', time: '5 hours ago' },
    { user: 'Emma Davis', action: 'Updated user permissions', time: '1 day ago' },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <DashboardLayout role="admin">
      <div data-testid="admin-dashboard" className="space-y-6">
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

        {/* Roles Available */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Roles Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rolesAvailable.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-center">
                  <p className="text-3xl font-bold text-white mb-2">{item.count}</p>
                  <Badge className={item.color}>{item.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-500 font-semibold">{activity.user.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">{activity.user}</p>
                    <p className="text-sm text-slate-400">{activity.action}</p>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminHome;
