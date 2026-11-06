// Portfolio Data — Harsh Jangra
// All content is centralized here for easy updates

export const personalInfo = {
  name: 'Harsh Jangra',
  initials: 'HJ',
  title: 'Creative Technologist',
  roles: ['Creative Technologist', 'Developer', 'Community Builder', 'Visual Creator'],
  location: 'India',
  email: 'harshjangra047@gmail.com',
  brandStatement: "I turn ideas into digital experiences, creative stories and meaningful connections.",
  heroSubheading: "Building digital experiences, exploring emerging technologies and creating visual stories that connect ideas with impact.",
  aboutText: `Hey, I'm Harsh Jangra — a Computer Science and Engineering student, technology enthusiast, creative individual and community builder.\n\nI enjoy working at the intersection of technology and creativity. From developing digital products and exploring AI to contributing to community initiatives, managing creative projects and experimenting with video editing and visual effects, I enjoy turning ideas into meaningful experiences.\n\nMy journey is driven by curiosity, continuous learning, collaboration and the ambition to build things that matter.`,
  social: {
    linkedin: '#',
    github: '#',
    instagram: '#',
    twitter: '#',
  },
};

export const photos = {
  mountain: '/assets/profile/photo-mountain.jpg',
  illustrated: '/assets/profile/photo-illustrated.jpg',
  indoor: '/assets/profile/photo-indoor.jpg',
  river: '/assets/profile/photo-river.jpg',
};

export const experiences = [
  {
    id: 1,
    number: '01',
    role: 'Management Head',
    organization: 'Tulsa Wears',
    category: 'Fashion & E-Commerce',
    description: 'Contributing to the management and development of Tulsa Wears, a fashion-focused digital platform that combines creative product presentation with a premium e-commerce experience.',
    highlights: [
      'Management and coordination',
      'Creative brand development',
      'Product presentation',
      'E-commerce platform development',
      'Product and catalog management',
      'Customer shopping experience',
      'Administrative operations',
      'Platform customization',
    ],
  },
  {
    id: 2,
    number: '02',
    role: 'Developer Community',
    organization: 'GDG — Google Developer Groups',
    category: 'Technology & Community',
    description: 'Engaging with the developer ecosystem through Google Developer Groups, exploring emerging technologies, collaboration, learning initiatives and opportunities to connect with fellow developers.',
    highlights: [
      'Developer ecosystem engagement',
      'Emerging technologies',
      'Collaboration and learning',
      'Community connection',
    ],
  },
  {
    id: 3,
    number: '03',
    role: 'Google Student Ambassador',
    organization: 'Team Gemini Solutions',
    category: 'Innovation & Leadership',
    year: '2026',
    description: 'Selected as a Google Student Ambassador in 2026, representing student developer communities while promoting innovation, collaboration and emerging technologies.',
    subdescription: 'Engaging with fellow students, exploring AI and modern technologies, and contributing to a connected learning and developer ecosystem.',
    highlights: [
      'Google Student Ambassador 2026',
      'Technology awareness',
      'AI and innovation',
      'Student community engagement',
      'Collaboration',
    ],
  },
];

export const projects = [
  {
    id: 1,
    number: '01',
    title: 'Tulsa Wears',
    category: 'Fashion E-Commerce Platform',
    description: 'A premium fashion e-commerce platform combining an editorial-inspired customer shopping experience with a connected administrative system.',
    features: [
      'Premium cinematic and editorial-inspired UI',
      'Handmade fashion product catalog',
      'Product browsing and detail pages',
      'Shopping bag and checkout',
      'Real-time synchronization',
      'Vercel Blob image delivery',
      'Interactive Change Look experience',
      'Look-builder functionality',
      'Collection categories',
      'Dynamic pricing',
      'Separate Admin Portal',
      'Product management',
      'Orders and customer management',
      'Reviews and feedback',
      'Coupon management',
      'Website customization',
    ],
    tech: ['React', 'TypeScript', 'Next.js', 'Vercel', 'Tailwind CSS'],
    liveLink: '#',
    githubLink: '#',
    isFeatured: true,
  },
  {
    id: 2,
    number: '02',
    title: 'Notes App',
    category: 'Productivity Application',
    description: 'A productivity-oriented notes application featuring a clean interface, rich-text editing and cloud synchronization.',
    features: [
      'Notes organization',
      'Rich-text editing',
      'Cloud sync',
      'Simple user experience',
    ],
    tech: ['React', 'TypeScript', 'Cloud Storage'],
    liveLink: '#',
    githubLink: '#',
    isFeatured: false,
  },
  {
    id: 3,
    number: '03',
    title: 'Image Slideshow App',
    category: 'Desktop Application',
    description: 'An image slideshow application that displays resized images with time-based transitions.',
    features: [
      'Image slideshow display',
      'Auto-resize images',
      'Time-based transitions',
      'Desktop GUI interface',
    ],
    tech: ['Python', 'Tkinter', 'Pillow'],
    liveLink: '#',
    githubLink: '#',
    isFeatured: false,
  },
];

export const expertise = {
  technology: [
    'C', 'C++', 'Python', 'Software Development', 'AI and Agentic AI Learning',
  ],
  creative: [
    'Video Editing', 'VFX', 'UGC', 'Visual Storytelling', 'Creative Production',
  ],
  leadership: [
    'Management', 'Community Engagement', 'GDG Involvement',
    'Google Student Ambassador Activities', 'Communication', 'Collaboration',
  ],
};

export const education = {
  institution: 'Chandigarh College of Engineering and Technology, Chandigarh',
  degree: 'B.Tech / BE — Computer Science and Engineering',
  duration: '2025–2029',
  expectedGraduation: '2029',
};

export const achievements = [
  {
    title: 'Smart India Hackathon 2025',
    subtitle: 'Finalist',
    icon: 'trophy',
  },
  {
    title: 'Code Jam',
    subtitle: 'Third Position',
    icon: 'award',
  },
  {
    title: 'Google Student Ambassador',
    subtitle: '2026',
    icon: 'star',
  },
];

export const certifications = [
  {
    title: 'Oracle AI Agent Studio for Fusion Applications Foundations Associate',
    issuer: 'Oracle',
    verifyLink: '#',
  },
  {
    title: 'Agentic AI Certified Foundations Associate',
    issuer: 'Certification Body',
    verifyLink: '#',
  },
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    verifyLink: '#',
  },
];

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const roleIndicators = [
  { number: '01', label: 'TULSA WEARS / MANAGEMENT HEAD' },
  { number: '02', label: 'GDG / DEVELOPER COMMUNITY' },
  { number: '03', label: 'GOOGLE STUDENT AMBASSADOR / 2026' },
];

