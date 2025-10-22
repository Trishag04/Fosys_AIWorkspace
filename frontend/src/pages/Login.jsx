import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Bot, Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Mock credentials
  const mockCredentials = [
    { email: 'intern@fosys.com', password: 'intern123', role: 'intern', name: 'Alex Johnson' },
    { email: 'employee@fosys.com', password: 'employee123', role: 'employee', name: 'Sarah Williams' },
    { email: 'manager@fosys.com', password: 'manager123', role: 'manager', name: 'Michael Chen' },
    { email: 'admin@fosys.com', password: 'admin123', role: 'admin', name: 'Emma Davis' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    
    const user = mockCredentials.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
      navigate(`/${user.role}/home`);
    } else {
      toast.error('Invalid credentials. Please check your email and password.');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast.success('Password reset link sent to your email!');
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>FOSYS</span>
        </div>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Space Grotesk' }}>
              {showForgotPassword ? 'Reset Password' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {showForgotPassword 
                ? 'Enter your email to receive a reset link' 
                : 'Enter your credentials to access your workspace'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showForgotPassword ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="email"
                      data-testid="login-email-input"
                      type="email"
                      placeholder="you@fosys.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="password"
                      data-testid="login-password-input"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button 
                  data-testid="login-submit-button"
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Sign In
                </Button>

                <div className="text-center text-sm text-slate-400">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-slate-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="you@fosys.com"
                      required
                      className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Send Reset Link
                </Button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-sm text-slate-400 hover:text-slate-300"
                >
                  Back to Sign In
                </button>
              </form>
            )}

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-indigo-400 mt-0.5" />
                <p className="text-xs font-semibold text-slate-300">Demo Credentials</p>
              </div>
              <div className="space-y-1 text-xs text-slate-400">
                <p><strong>Intern:</strong> intern@fosys.com / intern123</p>
                <p><strong>Employee:</strong> employee@fosys.com / employee123</p>
                <p><strong>Manager:</strong> manager@fosys.com / manager123</p>
                <p><strong>Admin:</strong> admin@fosys.com / admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
