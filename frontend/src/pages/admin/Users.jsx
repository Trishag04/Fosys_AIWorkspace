import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Search } from 'lucide-react';

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 1, name: 'Sarah Williams', email: 'sarah.w@fosys.com', role: 'Employee', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Alex Johnson', email: 'alex.j@fosys.com', role: 'Intern', department: 'Engineering', status: 'Active' },
    { id: 3, name: 'Michael Chen', email: 'michael.c@fosys.com', role: 'Manager', department: 'Engineering', status: 'Active' },
    { id: 4, name: 'Emma Davis', email: 'emma.d@fosys.com', role: 'Admin', department: 'Management', status: 'Active' },
    { id: 5, name: 'John Smith', email: 'john.s@fosys.com', role: 'Employee', department: 'Design', status: 'Active' },
    { id: 6, name: 'Lisa Brown', email: 'lisa.b@fosys.com', role: 'Intern', department: 'Marketing', status: 'Inactive' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Manager': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Employee': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Intern': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-500/10 text-green-500 border-green-500/20'
      : 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  };

  return (
    <DashboardLayout role="admin">
      <div data-testid="admin-users" className="space-y-6">
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>User Management</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            data-testid="user-search-input"
            type="text"
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
          />
        </div>

        {/* Users Table */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: 'Space Grotesk' }}>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Department</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-4 px-4 text-white font-medium">{user.name}</td>
                      <td className="py-4 px-4 text-slate-300">{user.email}</td>
                      <td className="py-4 px-4">
                        <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                      </td>
                      <td className="py-4 px-4 text-slate-300">{user.department}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
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

export default AdminUsers;
