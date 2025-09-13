import React, { useState, ChangeEvent, FormEvent, useEffect, ReactNode } from 'react';
import {
  Ripple,
  AuthTabs,
  TechOrbitDisplay,
} from './ui/modern-animated-sign-in';
import { MenuBarDemo } from './MenuBarDemo';
import { StarsBackground } from './ui/stars-background';
import ExplorePage from './pages/ExplorePage';
import LeaderboardPage from './pages/LeaderboardPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import ReviewPage from './pages/ReviewPage';
import { User, Post, Comment, ProjectLeaderboardItem, MentorLeaderboardItem, BranchLeaderboardItem, TopCreatorLeaderboardItem, PostFormData, PostInteractionType } from '../lib/data';
import * as api from '../lib/api';
import Loader from './ui/loader';
import ResponsiveCountdown from './ui/responsive-countdown';
import { cn } from '../lib/utils';
import ConnectFooter from './ui/connect-footer';

interface OrbitIcon {
  component: () => ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
}

const iconsArray: OrbitIcon[] = [
  { component: () => (<img width={30} height={30} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' alt='HTML5'/>), className: 'size-[30px] border-none bg-transparent', duration: 20, delay: 20, radius: 100, path: false, reverse: false, },
  { component: () => (<img width={30} height={30} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' alt='CSS3'/>), className: 'size-[30px] border-none bg-transparent', duration: 20, delay: 10, radius: 100, path: false, reverse: false, },
  { component: () => (<img width={50} height={50} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' alt='TypeScript'/>), className: 'size-[50px] border-none bg-transparent', radius: 210, duration: 20, path: false, reverse: false, },
  { component: () => (<img width={50} height={50} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' alt='JavaScript'/>), className: 'size-[50px] border-none bg-transparent', radius: 210, duration: 20, delay: 20, path: false, reverse: false, },
  { component: () => (<img width={30} height={30} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' alt='TailwindCSS'/>), className: 'size-[30px] border-none bg-transparent', duration: 20, delay: 20, radius: 150, path: false, reverse: true, },
  { component: () => (<img width={30} height={30} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' alt='Nextjs'/>), className: 'size-[30px] border-none bg-transparent', duration: 20, delay: 10, radius: 150, path: false, reverse: true, },
  { component: () => (<img width={50} height={50} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' alt='React'/>), className: 'size-[50px] border-none bg-transparent', radius: 270, duration: 20, path: false, reverse: true, },
  { component: () => (<img width={50} height={50} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' alt='Figma'/>), className: 'size-[50px] border-none bg-transparent', radius: 270, duration: 20, delay: 60, path: false, reverse: true, },
  { component: () => (<img width={50} height={50} src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' alt='Git'/>), className: 'size-[50px] border-none bg-transparent', radius: 320, duration: 20, delay: 20, path: false, reverse: false, },
];

type LoginFormData = { email: string; password: string; };
type RegisterFormData = { name: string; email: string; password: string; department: string; year: string; };

export function DemoSignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [authView, setAuthView] = useState<'student' | 'mentor'>('student');
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [projectsLeaderboardData, setProjectsLeaderboardData] = useState<ProjectLeaderboardItem[]>([]);
  const [mentorsLeaderboardData, setMentorsLeaderboardData] = useState<MentorLeaderboardItem[]>([]);
  const [branchesLeaderboardData, setBranchesLeaderboardData] = useState<BranchLeaderboardItem[]>([]);
  const [topCreatorsLeaderboardData, setTopCreatorsLeaderboardData] = useState<TopCreatorLeaderboardItem[]>([]);

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({ name: '', email: '', password: '', department: '', year: '' });

  const [route, setRoute] = useState(window.location.hash || '#explore');

  const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
          const data = await api.generateInitialData();
          setUsers(data.users);
          setPosts(data.posts);
          setProjectsLeaderboardData(data.projectsLeaderboardData);
          setMentorsLeaderboardData(data.mentorsLeaderboardData);
          setBranchesLeaderboardData(data.branchesLeaderboardData);
          setTopCreatorsLeaderboardData(data.topCreatorsLeaderboardData);
      } catch (e) {
          console.error("Failed to fetch initial data", e);
          setError("Could not connect to the backend. Please try again later.");
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchInitialData();
    const handleHashChange = () => { setRoute(window.location.hash || '#explore'); };
    window.addEventListener('hashchange', handleHashChange);
    if (!window.location.hash) { window.location.hash = '#explore'; }
    return () => { window.removeEventListener('hashchange', handleHashChange); };
  }, []);

  const handlePostInteraction = async (postId: number, interaction: PostInteractionType) => {
    if (!loggedInUser) return;
    try {
        const updatedPost = await api.handlePostInteraction(postId, interaction, loggedInUser.handle);
        setPosts(currentPosts => currentPosts.map(p => p.id === postId ? updatedPost : p));
    } catch (e) {
        console.error("Failed to interact with post", e);
        setError("Interaction failed. Please try again later.");
    }
  };

  const goToSwitchAuthMode = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.preventDefault();
    setError(null);
    setAuthMode(prev => prev === 'login' ? 'register' : 'login');
  };
  
  const handleAuthViewChange = (view: 'student' | 'mentor') => {
    setAuthView(view);
    setError(null);
    setLoginFormData({ email: '', password: ''});
    setAuthMode('login');
  }

  const handleLoginInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setLoginFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleRegisterInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setRegisterFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleProfileUpdate = async (handle: string, name: string, bio: string, avatarUrl: string) => {
      try {
          const updatedUser = await api.updateProfile(handle, name, bio, avatarUrl);
          setUsers(prevUsers => ({ ...prevUsers, [handle]: updatedUser }));
          if (loggedInUser?.handle === handle) {
              setLoggedInUser(updatedUser);
          }
      } catch (e) {
          console.error("Failed to update profile", e);
          alert("Error: Could not update profile.");
      }
  };

  const handlePostSubmit = async (data: PostFormData) => {
    if (!loggedInUser) return;
    setIsLoading(true);
    try {
        const newPost = await api.createPost(data, loggedInUser.handle);
        setPosts(currentPosts => [newPost, ...currentPosts]);
        window.location.hash = '#explore';
    } catch (e) {
        console.error("Failed to submit post", e);
        alert("Error: Could not submit post.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleApprovePost = async (postId: number) => {
    try {
        const updatedPost = await api.reviewPost(postId, 'approved');
        setPosts(currentPosts => currentPosts.map(p => (p.id === postId ? updatedPost : p)));
        alert(`The post "${updatedPost.title}" from @${updatedPost.userHandle} has been approved and is now live.`);
    } catch (e) {
        console.error("Failed to approve post", e);
        alert("Error: Could not approve post.");
    }
  };

  const handleRejectPost = async (postId: number, reason: string) => {
    try {
        const updatedPost = await api.reviewPost(postId, 'rejected', reason);
        setPosts(currentPosts => currentPosts.map(p => (p.id === postId ? updatedPost : p)));
        alert(`The post "${updatedPost.title}" from @${updatedPost.userHandle} has been rejected.`);
    } catch (e) {
        console.error("Failed to reject post", e);
        alert("Error: Could not reject post.");
    }
  };

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
        let result;
        if (authView === 'student') {
            result = await api.loginStudent(loginFormData.email, loginFormData.password);
        } else {
            result = await api.loginMentor(loginFormData.email, loginFormData.password);
        }
        if (result.user) {
            setLoggedInUser(result.user);
            setIsSignedIn(true);
        } else {
            setError(result.error || "Invalid credentials.");
        }
    } catch(e) {
      console.error(e);
      setError("An unexpected error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
        const result = await api.registerStudent(registerFormData);
        if (result.user) {
            alert("Registration successful! Please log in.");
            setAuthMode('login');
        } else {
            setError(result.error || "Registration failed.");
        }
    } catch (e) {
        console.error(e);
        setError("An unexpected error occurred during registration.");
    } finally {
        setIsLoading(false);
    }
  };

  const studentLoginFormFields = {
    header: 'Welcome back', subHeader: 'Sign in to your account',
    fields: [
      { name: 'email', label: 'Email', required: true, type: 'email' as const, placeholder: 'Enter your email address', onChange: handleLoginInputChange },
      { name: 'password', label: 'Password', required: true, type: 'password' as const, placeholder: 'Enter your password', onChange: handleLoginInputChange },
    ],
    submitButton: 'Sign in', textVariantButton: "Don't have an account? Register", errorField: error,
  };
  
  const studentRegisterFormFields = {
    header: 'Create an Account', subHeader: 'Join the network of innovators.',
    fields: [
      { name: 'name', label: 'Full Name', required: true, type: 'text' as const, placeholder: 'Enter your full name', onChange: handleRegisterInputChange },
      { name: 'email', label: 'Email', required: true, type: 'email'as const, placeholder: 'Enter your email address', onChange: handleRegisterInputChange },
      { name: 'password', label: 'Password', required: true, type: 'password' as const, placeholder: 'Create a strong password', onChange: handleRegisterInputChange },
      { name: 'department', label: 'Department', required: true, type: 'select' as const, placeholder: 'Select your department', options: ['CSE', 'ACSE', 'IT', 'AIDS'], onChange: handleRegisterInputChange },
      { name: 'year', label: 'Year', required: true, type: 'select' as const, placeholder: 'Select your year', options: ['1st Year', '2nd Year', '3rd Year', '4th Year'], onChange: handleRegisterInputChange },
    ],
    submitButton: 'Register', textVariantButton: 'Already have an account? Sign in', errorField: error,
  };

  const mentorLoginFormFields = {
    header: 'Mentor Sign In', subHeader: 'Access the mentor dashboard.',
    fields: [
      { name: 'email', label: 'Email', required: true, type: 'email' as const, placeholder: 'Enter your mentor email', onChange: handleLoginInputChange },
      { name: 'password', label: 'Password', required: true, type: 'password' as const, placeholder: 'Enter your password', onChange: handleLoginInputChange },
    ],
    submitButton: 'Sign in', errorField: error,
  };

  const renderContent = () => {
    const routeParts = route.split('/');
    const baseRoute = routeParts[0];
    if (!loggedInUser) return null;

    const explorePage = <ExplorePage users={users} posts={posts.filter(p => p.status === 'approved')} loggedInUser={loggedInUser} onPostInteraction={handlePostInteraction} topCreatorsLeaderboardData={topCreatorsLeaderboardData} projectsLeaderboardData={projectsLeaderboardData} />;
    
    switch (baseRoute) {
        case '#leaderboard': return <LeaderboardPage users={users} projectsLeaderboardData={projectsLeaderboardData} mentorsLeaderboardData={mentorsLeaderboardData} branchesLeaderboardData={branchesLeaderboardData} />;
        case '#post': if (loggedInUser.role === 'mentor') return explorePage; return <PostPage onPostSubmit={handlePostSubmit} />;
        case '#review': if (loggedInUser.role === 'student') return explorePage; return <ReviewPage posts={posts.filter(p => p.status === 'pending')} users={users} onApprove={handleApprovePost} onReject={handleRejectPost} loggedInUser={loggedInUser} projectsLeaderboardData={projectsLeaderboardData} />;
        case '#profile': const handle = routeParts[1] || loggedInUser.handle; return <ProfilePage handle={handle} loggedInUserHandle={loggedInUser.handle} users={users} posts={posts} onPostInteraction={handlePostInteraction} onProfileUpdate={handleProfileUpdate} projectsLeaderboardData={projectsLeaderboardData} mentorsLeaderboardData={mentorsLeaderboardData} />;
        case '#explore': default: return explorePage;
    }
  };

  if (isLoading && !isSignedIn) { return <Loader text="Initializing Backend..." />; }

  if (isSignedIn && loggedInUser) {
    const pendingReviewCount = loggedInUser.role === 'mentor' ? posts.filter(p => p.status === 'pending').length : 0;
    return (
      <div className="relative w-full min-h-screen overflow-y-auto bg-black">
        <StarsBackground starDensity={0.0002} />
        <header className="w-full flex justify-center pt-4 sm:pt-8 z-20 relative">
          <MenuBarDemo activeRoute={route} loggedInUserHandle={loggedInUser.handle} role={loggedInUser.role} pendingReviewCount={pendingReviewCount} />
        </header>
        <ResponsiveCountdown />
        <main className="relative z-10 container mx-auto px-2 sm:px-4 py-8 pb-32">
          {isLoading ? <Loader text="Loading Content..."/> : renderContent()}
        </main>
        <ConnectFooter />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none" />
      </div>
    );
  }

  let formFields; let handleSubmit; let goTo;
  if (authView === 'student') {
      formFields = authMode === 'register' ? studentRegisterFormFields : studentLoginFormFields;
      handleSubmit = authMode === 'register' ? handleRegisterSubmit : handleLoginSubmit;
      goTo = goToSwitchAuthMode;
  } else {
      formFields = mentorLoginFormFields;
      handleSubmit = handleLoginSubmit;
      goTo = undefined;
  }

  return (
    <section className='flex max-lg:justify-center w-full h-screen'>
      <span className='flex flex-col justify-center w-1/2 max-lg:hidden'><Ripple mainCircleSize={100} /><TechOrbitDisplay iconsArray={iconsArray} /></span>
      <span className='w-1/2 h-full flex flex-col justify-center items-center max-lg:w-full max-lg:px-6 py-8 overflow-y-auto'>
        <div className='flex items-center justify-center p-1 mb-8 rounded-full bg-zinc-800 border border-zinc-700'>
          <button onClick={() => handleAuthViewChange('student')} className={cn('px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300', authView === 'student' ? 'bg-zinc-200 text-black shadow-md' : 'text-zinc-400 hover:text-white')}>Student</button>
          <button onClick={() => handleAuthViewChange('mentor')} className={cn('px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300', authView === 'mentor' ? 'bg-zinc-200 text-black shadow-md' : 'text-zinc-400 hover:text-white')}>Mentor</button>
        </div>
        {isLoading ? <Loader text="Please wait..." /> : <AuthTabs formFields={formFields} goTo={goTo} handleSubmit={handleSubmit} />}
        
        {authView === 'student' && authMode === 'login' && (
            <div className="mt-8 w-96 max-w-full mx-auto p-4 border border-zinc-700 rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
                <h3 className="text-center font-semibold text-zinc-300 mb-4 border-b border-zinc-700 pb-3">Student Demo Credentials</h3>
                {Object.values(users).filter(u => u.role === 'student').length > 0 ? (
                  <ul className="space-y-4 text-sm text-zinc-400">
                      {Object.values(users).filter(u => u.role === 'student').slice(0, 1).map(student => (
                          <li key={student.handle}>
                              <p className="font-semibold text-zinc-200">{student.name}</p>
                              <p>Email: <span className="font-mono text-zinc-300 bg-zinc-700/50 px-1 py-0.5 rounded break-all">{student.email}</span></p>
                              <p>Password: <span className="font-mono text-zinc-300 bg-zinc-700/50 px-1 py-0.5 rounded">{student.password}</span></p>
                          </li>
                      ))}
                  </ul>
                ) : <p className="text-center text-zinc-400 text-sm">Loading student credentials...</p>}
            </div>
        )}

        {authView === 'mentor' && (
            <div className="mt-8 w-96 max-w-full mx-auto p-4 border border-zinc-700 rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
                <h3 className="text-center font-semibold text-zinc-300 mb-4 border-b border-zinc-700 pb-3">Mentor Demo Credentials</h3>
                {Object.values(users).filter(u => u.role === 'mentor').length > 0 ? (
                  <ul className="space-y-4 text-sm text-zinc-400">
                      {Object.values(users).filter(u => u.role === 'mentor').map(mentor => (
                          <li key={mentor.handle}>
                              <p className="font-semibold text-zinc-200">{mentor.name}</p>
                              <p>Email: <span className="font-mono text-zinc-300 bg-zinc-700/50 px-1 py-0.5 rounded break-all">{mentor.email}</span></p>
                              <p>Password: <span className="font-mono text-zinc-300 bg-zinc-700/50 px-1 py-0.5 rounded">{mentor.password}</span></p>
                          </li>
                      ))}
                  </ul>
                ) : <p className="text-center text-zinc-400 text-sm">Loading mentor credentials...</p>}
            </div>
        )}
      </span>
    </section>
  );
}