import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Clock, GitPullRequest } from 'lucide-react';

const ManagerProjectPRs = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const projectNames = {
    '1': 'Authentication System',
    '2': 'Dashboard Redesign',
    '3': 'API Documentation',
    '4': 'Mobile App',
    '5': 'Legacy System Migration'
  };

  const prList = [
    { id: 1, task: 'OAuth implementation', assignee: 'Sarah Williams', prId: '#245', status: 'Open', updated: '2 hours ago' },
    { id: 2, task: 'JWT validation', assignee: 'Alex Johnson', prId: '#242', status: 'In Review', updated: '5 hours ago' },
    { id: 3, task: 'Password reset', assignee: 'Michael Chen', prId: '#238', status: 'Approved', updated: '1 day ago' },
    { id: 4, task: 'Social login', assignee: 'Emma Davis', prId: '#235', status: 'Merged', updated: '2 days ago' },
  ];

  const insights = {
    waitingReview: 2,
    mergedThisWeek: 1,
    failed: 0
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Merged': case 'Approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Review': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Open': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Closed': case 'Failed': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Merged': case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'In Review': return <Clock className="w-4 h-4" />;
      case 'Open': return <GitPullRequest className="w-4 h-4" />;
      case 'Closed': case 'Failed': return <XCircle className="w-4 h-4" />;
      default: return <GitPullRequest className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            data-testid="back-to-prs-button"
            onClick={() => navigate('/manager/prs')}
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
            {projectNames[projectId] || 'Project'} - PRs
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* PR Status */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>PR Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prList.map((pr) => (
                    <div key={pr.id} className="grid grid-cols-5 gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="col-span-1">
                        <p className="text-xs text-slate-500 mb-1">Task</p>
                        <p className="text-white text-sm font-medium">{pr.task}</p>
                      </div>
                      <div className="col-span-1">
                        <p className="text-xs text-slate-500 mb-1">Assignee</p>
                        <p className="text-slate-300 text-sm">{pr.assignee}</p>
                      </div>
                      <div className="col-span-1">
                        <p className="text-xs text-slate-500 mb-1">PR ID</p>
                        <p className="text-white text-sm font-medium">{pr.prId}</p>
                      </div>
                      <div className="col-span-1">
                        <p className="text-xs text-slate-500 mb-1">Status</p>
                        <Badge className={`${getStatusColor(pr.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(pr.status)}
                          {pr.status}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        <p className="text-xs text-slate-500 mb-1">Last Updated</p>
                        <p className="text-slate-400 text-sm">{pr.updated}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          <div>
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-500 mb-1">{insights.waitingReview}</p>
                  <p className="text-sm text-slate-300">PRs waiting review</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-2xl font-bold text-green-500 mb-1">{insights.mergedThisWeek}</p>
                  <p className="text-sm text-slate-300">PR merged this week</p>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-2xl font-bold text-red-500 mb-1">{insights.failed}</p>
                  <p className="text-sm text-slate-300">PRs failed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerProjectPRs;
