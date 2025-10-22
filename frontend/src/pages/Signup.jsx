import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Bot, User, Mail, Lock, CheckCircle, XCircle, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const handlePasswordChange = (password) => {
    setFormData({ ...formData, password });
    
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const isPasswordValid = Object.values(passwordValidation).every(v => v);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }
    
    if (!isPasswordValid) {
      toast.error('Password does not meet security requirements');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Store user data
    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success(`Welcome to FOSYS, ${formData.name}!`);
    navigate(`/${formData.role}/home`);
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
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Space Grotesk' }}>Welcome</CardTitle>
            <CardDescription className="text-slate-400">Create your FOSYS account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="name"
                    data-testid="signup-name-input"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="email"
                    data-testid="signup-email-input"
                    type="email"
                    placeholder="you@fosys.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-slate-300">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger data-testid="signup-role-select" className="bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="intern" className="text-white">Intern</SelectItem>
                      <SelectItem value="employee" className="text-white">Employee</SelectItem>
                      <SelectItem value="manager" className="text-white">Manager</SelectItem>
                      <SelectItem value="admin" className="text-white">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-slate-300">Department</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      id="department"
                      data-testid="signup-department-input"
                      type="text"
                      placeholder="Engineering"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      required
                      className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="password"
                    data-testid="signup-password-input"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                {formData.password && (
                  <div className="space-y-1 text-xs mt-2">
                    <ValidationItem isValid={passwordValidation.length} text="At least 8 characters" />
                    <ValidationItem isValid={passwordValidation.uppercase} text="One uppercase letter" />
                    <ValidationItem isValid={passwordValidation.lowercase} text="One lowercase letter" />
                    <ValidationItem isValid={passwordValidation.number} text="One number" />
                    <ValidationItem isValid={passwordValidation.special} text="One special character" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    data-testid="signup-confirm-password-input"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <Button 
                data-testid="signup-submit-button"
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={!isPasswordValid}
              >
                Create Account
              </Button>

              <div className="text-center text-sm text-slate-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Sign in
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ValidationItem = ({ isValid, text }) => (
  <div className="flex items-center gap-2">
    {isValid ? (
      <CheckCircle className="w-3 h-3 text-green-500" />
    ) : (
      <XCircle className="w-3 h-3 text-slate-600" />
    )}
    <span className={isValid ? 'text-green-500' : 'text-slate-500'}>{text}</span>
  </div>
);

export default Signup;
