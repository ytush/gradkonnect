import type { User, Post, Comment, ProjectLeaderboardItem, MentorLeaderboardItem, BranchLeaderboardItem, TopCreatorLeaderboardItem, PostFormData, PostInteractionType } from './data';


export interface InitialData {
    users: { [key: string]: User };
    posts: Post[];
    projectsLeaderboardData: ProjectLeaderboardItem[];
    mentorsLeaderboardData: MentorLeaderboardItem[];
    branchesLeaderboardData: BranchLeaderboardItem[];
    topCreatorsLeaderboardData: TopCreatorLeaderboardItem[];
}

const staticData: InitialData = {
  users: {
    'pixel_pioneer': {
      handle: 'pixel_pioneer', name: 'Priya Sharma',
      avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2',
      bio: 'UI/UX enthusiast and frontend developer. Turning coffee into clean code and beautiful interfaces. 🎨',
      year: '3rd Year', department: 'CSE', role: 'student', stats: { posts: 2 },
      email: 'priya.sharma@example.com', password: 'password123'
    },
    'data_dynamo': {
      handle: 'data_dynamo', name: 'Ben Carter',
      avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2',
      bio: 'Deep learning aficionado and data scientist in the making. Exploring the world, one dataset at a time.',
      year: '4th Year', department: 'AIDS', role: 'student', stats: { posts: 1 },
      email: 'ben.carter@example.com', password: 'password123'
    },
    'logic_lord': {
      handle: 'logic_lord', name: 'Kenji Tanaka',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2',
      bio: 'Competitive programmer and backend developer. I speak fluent Python, Java, and sarcasm.',
      year: '3rd Year', department: 'IT', role: 'student', stats: { posts: 1 },
      email: 'kenji.tanaka@example.com', password: 'password123'
    },
    'cyber_sleuth': {
      handle: 'cyber_sleuth', name: 'Aisha Khan',
      avatarUrl: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2',
      bio: 'Cybersecurity student passionate about ethical hacking and network security. Securing the digital world.',
      year: '2nd Year', department: 'ACSE', role: 'student', stats: { posts: 1 },
      email: 'aisha.khan@example.com', password: 'password123'
    },
    'quantum_quark': {
      handle: 'quantum_quark', name: 'Sam Rodriguez',
      avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2',
      bio: 'Exploring the intersection of quantum computing and machine learning. Future is now.',
      year: '1st Year', department: 'CSE', role: 'student', stats: { posts: 1 },
      email: 'sam.rodriguez@example.com', password: 'password123'
    },
    'prof_davinci': {
      handle: 'prof_davinci', name: 'Dr. Alistair Finch',
      avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2',
      bio: 'Professor in Computer Science with a focus on Human-Computer Interaction. Guiding the next generation of innovators.',
      department: 'CSE', role: 'mentor', stats: { mentees: 8, rating: '99.1' },
      email: 'a.finch@example.com', password: 'password123'
    },
    'madam_curie': {
      handle: 'madam_curie', name: 'Dr. Lena Petrova',
      avatarUrl: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2',
      bio: 'AI & ML Research Scientist. Passionate about pushing the boundaries of artificial intelligence.',
      department: 'AIDS', role: 'mentor', stats: { mentees: 6, rating: '98.5' },
      email: 'l.petrova@example.com', password: 'password123'
    },
    'sir_turing': {
      handle: 'sir_turing', name: 'Dr. Omar Bakshi',
      avatarUrl: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2',
      bio: 'Lead Software Architect with 15 years of industry experience. Building scalable systems.',
      department: 'IT', role: 'mentor', stats: { mentees: 12, rating: '97.8' },
      email: 'o.bakshi@example.com', password: 'password123'
    },
    'ada_lovelace': {
      handle: 'ada_lovelace', name: 'Dr. Isabella Rossi',
      avatarUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&dpr=2',
      bio: 'Cybersecurity expert and author. Mentoring students on defensive and offensive security strategies.',
      department: 'ACSE', role: 'mentor', stats: { mentees: 9, rating: '99.5' },
      email: 'i.rossi@example.com', password: 'password123'
    },
  },
  posts: [
    {
      id: 1, userHandle: 'pixel_pioneer', time: '2d ago', title: 'Project Vision: A Real-time Object Detection App', content: "Just deployed the v1 of my object detection app! It uses YOLOv8 and React Native to provide real-time object identification through your phone's camera. The goal is to assist visually impaired users. It was a challenge to optimize for mobile, but the results are promising. Any feedback on the UI/UX would be amazing!", imageUrl: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=800', hashtags: ['#ReactNative', '#AI', '#ComputerVision', '#YOLO'], likes: 125, comments: 2, shares: 18, isLiked: false, livePreviewUrl: '#', githubUrl: '#',
      commentData: [
        { id: 101, userHandle: 'logic_lord', text: 'This is sick! The performance on mobile must have been tough. Great job!', time: '1d ago' },
        { id: 102, userHandle: 'prof_davinci', text: "Excellent work, Priya. The application of computer vision for accessibility is a fantastic initiative. Let's connect to discuss how we can refine the user flow for a better experience. I have a few ideas.", time: '1d ago' },
      ], status: 'approved',
    },
    {
      id: 2, userHandle: 'data_dynamo', time: '5d ago', title: 'Stock Price Prediction with LSTMs', content: "Spent the last month building an LSTM model to predict stock prices. The model is trained on a decade of historical data and considers various market indicators. While it's not a crystal ball, the accuracy on the test set is over 85%. The biggest hurdle was feature engineering. Check out the GitHub repo for the code and a detailed report.", imageUrl: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800', hashtags: ['#MachineLearning', '#DataScience', '#LSTM', '#Finance'], likes: 240, comments: 2, shares: 45, isLiked: true, githubUrl: '#',
      commentData: [
        { id: 201, userHandle: 'madam_curie', text: 'Impressive accuracy, Ben. Have you considered incorporating sentiment analysis from news articles as a feature? It could capture market volatility more effectively. Happy to share some resources if you\'re interested.', time: '4d ago' },
        { id: 202, userHandle: 'pixel_pioneer', text: 'Wow, this is next level! The visualizations in your report are top-notch.', time: '3d ago' }
      ], status: 'approved',
    },
    { id: 3, userHandle: 'logic_lord', time: '8h ago', title: 'My Personal Portfolio Website', content: 'Finally launched my new portfolio! Built with Next.js, Framer Motion for the animations, and Tailwind CSS for styling. It features a custom blog, project showcase, and a slick terminal-style "about me" section. Let me know what you think!', imageUrl: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=800', hashtags: ['#Nextjs', '#WebDev', '#Portfolio', '#FramerMotion'], likes: 58, comments: 0, shares: 7, isLiked: false, livePreviewUrl: '#', githubUrl: '#', commentData: [], status: 'pending', },
    { id: 4, userHandle: 'quantum_quark', time: '1d ago', title: 'Exploring Quantum Gates with Qiskit', content: 'As a first-year, I wanted to dive into something challenging. I\'ve started learning quantum computing with IBM\'s Qiskit. This is a simple simulation of Bell\'s state and quantum entanglement. It\'s mind-bending stuff, but super exciting! Any other quantum enthusiasts here?', imageUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800', hashtags: ['#QuantumComputing', '#Qiskit', '#Physics', '#Beginner'], likes: 95, comments: 1, shares: 12, isLiked: false, livePreviewUrl: '#', githubUrl: '#',
      commentData: [{ id: 401, userHandle: 'prof_davinci', text: 'Fantastic initiative for a first-year student, Sam! Keep up the curiosity. This is a solid start.', time: '10h ago' }], status: 'approved',
    },
    { id: 5, userHandle: 'cyber_sleuth', time: '3d ago', title: 'Building a Simple Keylogger for Educational Purposes', content: "To better understand keyboard event handling and potential security vulnerabilities, I created a simple keylogger in Python. **Disclaimer: This is for educational purposes only.** It logs keystrokes to a local file. The project helped me understand how malware can operate. The code is available on GitHub.", imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800', hashtags: ['#Cybersecurity', '#Python', '#EthicalHacking', '#Security'], likes: 150, comments: 1, shares: 30, isLiked: false, githubUrl: '#',
      commentData: [{ id: 501, userHandle: 'ada_lovelace', text: 'A great way to learn, Aisha. Understanding the attacker\'s tools is the first step to building strong defenses. Ensure your repository has a clear disclaimer about its educational nature.', time: '2d ago' }], status: 'approved',
    },
    { id: 6, userHandle: 'pixel_pioneer', time: '1h ago', title: '3D Portfolio with Three.js', content: "WIP! Trying my hand at 3D web experiences with Three.js and React Three Fiber. Building an interactive portfolio where users can navigate a 3D space to view my projects. It's a steep learning curve but so rewarding when you see it come to life.", imageUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800', hashtags: ['#Threejs', '#ReactThreeFiber', '#3D', '#Webgl'], likes: 32, comments: 0, shares: 4, isLiked: false, livePreviewUrl: '#', githubUrl: '#', commentData: [], status: 'pending', },
    { id: 7, userHandle: 'logic_lord', time: '3d ago', title: 'Minimalist Weather App', content: 'I built a simple weather app using a public API. It shows the current weather, but I feel like the design is too plain. Looking for feedback on how to make it more engaging visually.', imageUrl: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800', hashtags: ['#API', '#WebDev', '#UIUX', '#FeedbackNeeded'], likes: 15, comments: 0, shares: 2, isLiked: false, livePreviewUrl: '#', githubUrl: '#', commentData: [], status: 'rejected', rejectionReason: "The project is a good start, but the UI feels a bit generic. Consider adding more unique visual elements or animations. Also, the code lacks comments, making it hard to review. Please add documentation and resubmit.", },
    { id: 8, userHandle: 'pixel_pioneer', time: '5d ago', title: 'Concept for a Social Music App', content: 'Drafting out a concept for a social music discovery app. The idea is to create collaborative playlists in real-time. I\'ve only done some mockups in Figma, no code yet. Is this an idea worth pursuing?', imageUrl: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800', hashtags: ['#Concept', '#UIUX', '#Figma', '#Social'], likes: 5, comments: 0, shares: 1, isLiked: false, livePreviewUrl: '', githubUrl: '', commentData: [], status: 'rejected', rejectionReason: "Great idea, Priya! However, this submission is for a concept/mockup and not a coded project. GRAD KONNECT is focused on showcasing implemented projects. Please build out a prototype and resubmit. Looking forward to seeing it!", }
  ],
  projectsLeaderboardData: [
    { rank: 1, title: 'Stock Price Prediction with LSTMs', handle: 'data_dynamo', score: '28.5k' },
    { rank: 2, title: 'Keylogger for Education', handle: 'cyber_sleuth', score: '18.0k' },
    { rank: 3, title: 'Project Vision', handle: 'pixel_pioneer', score: '14.5k' },
    { rank: 4, title: 'Quantum Gates with Qiskit', handle: 'quantum_quark', score: '10.7k' },
    { rank: 5, title: 'Personal Portfolio Website', handle: 'logic_lord', score: '6.5k' },
  ],
  mentorsLeaderboardData: [
    { rank: 1, handle: 'ada_lovelace', score: '99.5' }, { rank: 2, handle: 'prof_davinci', score: '99.1' },
    { rank: 3, handle: 'madam_curie', score: '98.5' }, { rank: 4, handle: 'sir_turing', score: '97.8' },
  ],
  branchesLeaderboardData: [
    { rank: 1, name: 'CSE', score: '55.2k' }, { rank: 2, name: 'AIDS', score: '32.1k' },
    { rank: 3, name: 'ACSE', score: '28.9k' }, { rank: 4, name: 'IT', score: '25.6k' },
  ],
  topCreatorsLeaderboardData: [
    { rank: 1, handle: 'data_dynamo', score: '28.5k' }, { rank: 2, handle: 'cyber_sleuth', score: '18.0k' },
    { rank: 3, handle: 'pixel_pioneer', score: '14.5k' },
  ],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function loginStudent(email: string, password: string): Promise<{ user?: User; error?: string }> {
    await delay(300);
    const user = Object.values(staticData.users).find(
        u => u.role === 'student' && u.email === email
    );
    if (!user) {
        return { error: "No student account found with that email." };
    }
    if (user.password !== password) {
        return { error: "Invalid password." };
    }
    return { user: JSON.parse(JSON.stringify(user)) };
}

export async function loginMentor(email: string, password: string): Promise<{ user?: User; error?: string }> {
    await delay(300);
    const user = Object.values(staticData.users).find(
        u => u.role === 'mentor' && u.email === email && u.password === password
    );
    if (user) {
        return { user: JSON.parse(JSON.stringify(user)) };
    }
    const emailExists = Object.values(staticData.users).find(u => u.role === 'mentor' && u.email === email);
    if (!emailExists) {
        return { error: "No mentor account found with that email." };
    }
    return { error: "Invalid password." };
}

export async function registerStudent(formData: any): Promise<{ user?: User; error?: string }> {
    await delay(500);
    if (Object.values(staticData.users).some(u => u.email === formData.email)) {
        return { error: 'An account with this email already exists.' };
    }
    const handle = formData.name.toLowerCase().replace(/\s+/g, '_') + Math.floor(Math.random() * 100);
    if (staticData.users[handle]) {
        return { error: 'A user with a similar name already exists, try a different name.' };
    }
    const newUser: User = {
        handle, name: formData.name, email: formData.email, password: formData.password,
        department: formData.department, year: formData.year,
        avatarUrl: `https://i.pravatar.cc/150?u=${handle}`,
        bio: 'A new innovator on GRAD KONNECT!', role: 'student', stats: { posts: 0 },
    };
    staticData.users[handle] = newUser;
    return { user: JSON.parse(JSON.stringify(newUser)) };
}

export async function generateInitialData(): Promise<InitialData> {
    await delay(500);
    return Promise.resolve(JSON.parse(JSON.stringify(staticData)));
}

export async function createPost(data: PostFormData, userHandle: string): Promise<Post> {
    await delay(400);
    const user = staticData.users[userHandle];
    if (!user) throw new Error("User not found");
    const newPost: Post = {
        id: Date.now(), userHandle, time: 'Just now', title: data.title, content: data.content,
        imageUrl: data.imageUrl, hashtags: data.hashtags.split(',').map(h => h.trim()).filter(Boolean),
        livePreviewUrl: data.livePreviewUrl, githubUrl: data.githubUrl,
        likes: 0, comments: 0, shares: 0, isLiked: false,
        commentData: [], status: 'pending',
    };
    staticData.posts.unshift(newPost);
    return JSON.parse(JSON.stringify(newPost));
}

export async function handlePostInteraction(postId: number, interaction: PostInteractionType, loggedInUserHandle: string): Promise<Post> {
    await delay(200);
    const postIndex = staticData.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) throw new Error("Post not found");
    const post = staticData.posts[postIndex];

    switch (interaction.type) {
        case 'like':
            post.likes += post.isLiked ? -1 : 1;
            post.isLiked = !post.isLiked;
            break;
        case 'addComment':
            const newComment: Comment = {
                id: Date.now(), userHandle: loggedInUserHandle,
                text: interaction.text, time: 'Just now',
            };
            post.commentData.push(newComment);
            post.comments = post.commentData.length;
            break;
        case 'share':
            post.shares++;
            break;
    }
    staticData.posts[postIndex] = post;
    return JSON.parse(JSON.stringify(post));
}

export async function reviewPost(postId: number, status: 'approved' | 'rejected', reason?: string): Promise<Post> {
    await delay(300);
    const postIndex = staticData.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) throw new Error("Post not found");
    const post = staticData.posts[postIndex];
    post.status = status;
    if (status === 'rejected' && reason) {
        post.rejectionReason = reason;
    }
    staticData.posts[postIndex] = post;
    return JSON.parse(JSON.stringify(post));
}

export async function updateProfile(handle: string, name: string, bio: string, avatarUrl: string): Promise<User> {
    await delay(300);
    const user = staticData.users[handle];
    if (!user) throw new Error("User not found");
    user.name = name;
    user.bio = bio;
    user.avatarUrl = avatarUrl;
    staticData.users[handle] = user;
    return JSON.parse(JSON.stringify(user));
}