import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { User, Mail, Briefcase, Edit, Lock, HelpCircle, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [timezone, setTimezone] = useState('UTC-5');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setEditedUser(parsed);
    }
  }, []);

  const handleSaveChanges = () => {
    localStorage.setItem('user', JSON.stringify(editedUser));
    setUser(editedUser);
    setEditDialogOpen(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    toast.info('Logged out successfully');
  };

  if (!user) return null;

  return (
    <DashboardLayout role="admin">
      <div data-testid="admin-profile" className="space-y-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Profile</h1>

        {/* User Info Header */}
        <div className="flex items-center gap-6 p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{user.name?.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-slate-400 capitalize">{user.role}</p>
            <p className="text-slate-500 text-sm">ID: {user.email?.split('@')[0].toUpperCase()}</p>
          </div>
        </div>

        {/* Account Info */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Account Info</CardTitle>
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Information
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Account Information</DialogTitle>
                  <DialogDescription className="text-slate-400">Update your account details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name" className="text-slate-300">Name</Label>
                    <Input
                      id="edit-name"
                      value={editedUser.name || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-department" className="text-slate-300">Department/Project</Label>
                    <Input
                      id="edit-department"
                      value={editedUser.department || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, department: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <Button onClick={handleSaveChanges} className="w-full bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <p className="text-white">{user.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Username</p>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <p className="text-white">{user.email?.split('@')[0]}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Department/Project</p>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <p className="text-white">{user.department || 'Management'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login & Security */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Login & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-slate-400">Add an extra layer of security</p>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="timezone" className="text-slate-300">Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="UTC-5">EST (UTC-5)</SelectItem>
                  <SelectItem value="UTC-6">CST (UTC-6)</SelectItem>
                  <SelectItem value="UTC-7">MST (UTC-7)</SelectItem>
                  <SelectItem value="UTC-8">PST (UTC-8)</SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                  <SelectItem value="UTC+1">CET (UTC+1)</SelectItem>
                  <SelectItem value="UTC+5:30">IST (UTC+5:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Other Utilities */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>Other Utilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Support
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full border-red-700 text-red-400 hover:bg-red-900/20">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfile;
