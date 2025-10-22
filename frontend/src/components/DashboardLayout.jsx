import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ListTodo, GitPullRequest, Calendar, User, Menu, X, FolderKanban, Users as UsersIcon, LogOut, Bot } from 'lucide-react';
import { Button } from './ui/button';

const DashboardLayout = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const getMenuItems = () => {
    const baseItems = [
      { path: `/${role}/home`, icon: Home, label: 'HOME' },
    ];

    if (role === 'manager') {
      return [
        ...baseItems,
        { path: `/${role}/projects`, icon: FolderKanban, label: 'PROJECTS' },
        { path: `/${role}/prs`, icon: GitPullRequest, label: 'PRs' },
        { path: `/${role}/user-management`, icon: UsersIcon, label: 'USER MANAGEMENT' },
        { path: `/${role}/planner`, icon: Calendar, label: 'PLANNER' },
        { path: `/${role}/profile`, icon: User, label: 'PROFILE' },
      ];
    } else if (role === 'admin') {
      return [
        ...baseItems,
        { path: `/${role}/users`, icon: UsersIcon, label: 'USERS' },
        { path: `/${role}/projects`, icon: FolderKanban, label: 'PROJECTS' },
        { path: `/${role}/settings`, icon: ListTodo, label: 'SETTINGS' },
        { path: `/${role}/profile`, icon: User, label: 'PROFILE' },
      ];
    } else {
      return [
        ...baseItems,
        { path: `/${role}/tasks`, icon: ListTodo, label: 'TASKS' },
        { path: `/${role}/prs`, icon: GitPullRequest, label: 'PRs' },
        { path: `/${role}/planner`, icon: Calendar, label: 'PLANNER' },
        { path: `/${role}/profile`, icon: User, label: 'PROFILE' },
      ];
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>FOSYS</span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          {user && (
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-3 mb-3 px-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{user.name?.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                </div>
              </div>
              <Button
                data-testid="logout-button"
                onClick={handleLogout}
                variant="outline"
                className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-400">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>FOSYS</span>
          </div>
          <div className="w-6" />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
