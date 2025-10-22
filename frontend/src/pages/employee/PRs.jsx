import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { GitPullRequest, Info, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const EmployeePRs = () => {
  const prList = [
    { id: 1, task: 'Fix login bug', prId: '#145', status: 'Open', updated: '2 hours ago' },
    { id: 2, task: 'API docs update', prId: '#142', status: 'In Review', updated: '5 hours ago' },
    { id: 3, task: 'Profile page', prId: '#138', status: 'Approved', updated: '1 day ago' },
    { id: 4, task: 'CSS fixes', prId: '#135', status: 'Merged', updated: '2 days ago' },
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
    <DashboardLayout role="employee">
      <div data-testid="employee-prs" className="space-y-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Pull Requests</h1>

        {/* Info Alert */}
        <Alert className="bg-indigo-500/10 border-indigo-500/30">
          <Info className="h-4 w-4 text-indigo-400" />
          <AlertDescription className="text-indigo-300">
            PR status is fetched from Github
          </AlertDescription>
        </Alert>

        {/* Raise PR Button */}
        <Button
          data-testid="raise-pr-button"
          onClick={() => {
            window.open('https://github.com', '_blank');
            toast.info('Opening GitHub...');
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Raise PR
        </Button>

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
                    <div key={pr.id} className="grid grid-cols-4 gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="col-span-1">
                        <p className="text-xs text-slate-500 mb-1">Task</p>
                        <p className="text-white text-sm font-medium">{pr.task}</p>
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

export default EmployeePRs;
