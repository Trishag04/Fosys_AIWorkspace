import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { toast } from 'sonner';

const AdminSettings = () => {
  return (
    <DashboardLayout role="admin">
      <div data-testid="admin-settings" className="space-y-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>System Settings</h1>

        {/* General Settings */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="org-name" className="text-slate-300">Organization Name</Label>
              <Input
                id="org-name"
                defaultValue="FOSYS"
                className="bg-slate-800 border-slate-700 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="admin-email" className="text-slate-300">Admin Email</Label>
              <Input
                id="admin-email"
                type="email"
                defaultValue="admin@fosys.com"
                className="bg-slate-800 border-slate-700 text-white mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-medium">Require 2FA for All Users</p>
                <p className="text-sm text-slate-400">Enforce two-factor authentication</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-medium">Session Timeout</p>
                <p className="text-sm text-slate-400">Auto-logout after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-sm text-slate-400">Send system alerts via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-medium">Slack Integration</p>
                <p className="text-sm text-slate-400">Post updates to Slack channel</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          data-testid="save-settings-button"
          onClick={() => toast.success('Settings saved successfully!')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Save Settings
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
