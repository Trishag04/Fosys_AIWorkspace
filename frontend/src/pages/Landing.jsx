import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Bot, Mic, GitPullRequest, Users, CheckCircle, Clock, Target, ArrowRight, Shield, Mail } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Smart Scrum Transcription',
      description: 'Automatically transcribe meetings and extract action items for instant task creation.'
    },
    {
      icon: <GitPullRequest className="w-6 h-6" />,
      title: 'Real-Time PR Validation',
      description: 'Live peer review tracking via WebSockets for faster, transparent development'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Role-Based Dashboards',
      description: 'Personalized dashboards for interns, employees, managers, and admins — with secure access.'
    }
  ];

  const steps = [
    { step: '01', title: 'Capture Meetings', desc: 'AI transcribes & identifies action items.' },
    { step: '02', title: 'Auto-Assign Tasks', desc: 'Tasks mapped to responsible employees.' },
    { step: '03', title: 'Validate PRs', desc: 'GitHub events update dashboard in real time.' },
    { step: '04', title: 'Track & Optimize', desc: 'Role-based dashboards show team-wide progress.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>FOSYS</span>
          </div>
          <Button 
            data-testid="signin-button"
            onClick={() => navigate('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
                AI-Powered Workspace<br />Management Platform
              </h1>
              <p className="text-lg text-slate-400 mb-8">
                Streamline your workflow with intelligent scrum transcription, automated task management, and seamless PR validation
              </p>
              <Button 
                data-testid="get-started-button"
                onClick={() => navigate('/signup')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg h-auto"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-slate-300">Meeting transcribed: Sprint Planning</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-slate-300">3 action items extracted</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                    <GitPullRequest className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-slate-300">PR #245 - Review in progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk' }}>What is FOSYS?</h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            AI Workspace — also known as FOSYS — is a next-generation AI-powered project management tool designed to simplify organizational workflows. It automates SCRUM transcription, extracts action items, validates PRs in real time, and updates dashboards instantly — reducing manual effort while improving accountability and collaboration.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16" style={{ fontFamily: 'Space Grotesk' }}>Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-indigo-500/50 transition-colors">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: 'Space Grotesk' }}>Why Choose FOSYS?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Automated Workflow</h3>
              <p className="text-slate-400">Eliminate manual task assignment with AI-driven meeting analysis.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Enhanced Collaboration</h3>
              <p className="text-slate-400">Real-time updates keep your entire team synchronized.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Complete Transparency</h3>
              <p className="text-slate-400">Track progress with comprehensive dashboards and live insights.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Seamless Integration</h3>
              <p className="text-slate-400">Direct GitHub integration for effortless code validation and reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16" style={{ fontFamily: 'Space Grotesk' }}>How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-indigo-500 mb-3" style={{ fontFamily: 'Space Grotesk' }}>{item.step}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: 'Space Grotesk' }}>Impact & Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/30 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-2" style={{ fontFamily: 'Space Grotesk' }}>40%</div>
              <p className="text-slate-300">Faster Delivery</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/30 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-2" style={{ fontFamily: 'Space Grotesk' }}>60%</div>
              <p className="text-slate-300">Reduction in Manual Effort</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/30 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-2" style={{ fontFamily: 'Space Grotesk' }}>100%</div>
              <p className="text-slate-300">Transparency Across Teams</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Privacy Policy</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                At FOSYS, we value your privacy. Our platform processes only the data necessary to enhance workflow efficiency — such as meeting transcripts, assigned tasks, and project-related PR information. We do not collect personal information unrelated to work tasks. Meeting data and PR events are used solely for internal project management. User roles and access levels are securely managed using Role-Based Access Control (RBAC). All communication between users and servers is encrypted to maintain data confidentiality.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>Contact Us</h3>
              <p className="text-sm text-slate-400 mb-4">
                We'd love to hear from you! For feedback, collaboration, or inquiries related to FOSYS, reach out to us below:
              </p>
              <div className="flex items-center gap-2 text-indigo-400">
                <Mail className="w-5 h-5" />
                <a href="mailto:fosys@gmail.com" className="hover:text-indigo-300">fosys@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="text-center text-slate-500 text-sm border-t border-slate-800 pt-8">
            <p className="mb-2">AI Workspace © 2025</p>
            <p className="text-xs">Inspired by the intelligence of AI and the precision of engineering.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
