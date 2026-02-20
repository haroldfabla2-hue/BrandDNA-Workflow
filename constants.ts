import { AssetStatus, AssetType, BrandData, Folder, VideoProject, AppSettings } from './types';

export const TECHFLOW_DATA: BrandData = {
  name: "TechFlow Solutions",
  description: "Enterprise workflow automation for hybrid engineering teams.",
  metrics: {
    totalAssets: 47,
    publishedMonthly: 12,
    avgEngagement: "8.3%",
    brandHealthScore: 94
  },
  positioning: "TechFlow Solutions empowers enterprise engineering teams to automate complex CI/CD workflows, reducing deployment friction by 40% while maintaining SOC2 compliance. We act as the central nervous system for hybrid DevOps environments.",
  swot: [
    // Strengths
    { id: 's1', category: 'Strengths', text: 'Proprietary AI conflict resolution engine for git merges.' },
    { id: 's2', category: 'Strengths', text: 'Enterprise-grade security (SOC2 Type II, ISO 27001).' },
    { id: 's3', category: 'Strengths', text: '99.99% historical uptime SLA.' },
    { id: 's4', category: 'Strengths', text: 'Native integrations with Jira, GitHub, and GitLab.' },
    { id: 's5', category: 'Strengths', text: '24/7 Dedicated engineering support for enterprise tiers.' },
    // Weaknesses
    { id: 'w1', category: 'Weaknesses', text: 'High entry price point ($50k/yr floor).' },
    { id: 'w2', category: 'Weaknesses', text: 'Steep learning curve for non-technical PMs.' },
    { id: 'w3', category: 'Weaknesses', text: 'Limited mobile application functionality.' },
    { id: 'w4', category: 'Weaknesses', text: 'Documentation only available in English and Spanish.' },
    { id: 'w5', category: 'Weaknesses', text: 'Long sales cycle (6-9 months).' },
    // Opportunities
    { id: 'o1', category: 'Opportunities', text: 'Expansion into SME market with "TechFlow Lite".' },
    { id: 'o2', category: 'Opportunities', text: 'Launch of third-party API plugin marketplace.' },
    { id: 'o3', category: 'Opportunities', text: 'Growing demand for DevSecOps automation.' },
    { id: 'o4', category: 'Opportunities', text: 'APAC market expansion (Singapore/Japan).' },
    { id: 'o5', category: 'Opportunities', text: 'Vertical-specific modules for Fintech and Healthcare.' },
    // Threats
    { id: 't1', category: 'Threats', text: 'Legacy competitors (Jenkins, CircleCI) modernizing UX.' },
    { id: 't2', category: 'Threats', text: 'Open-source alternatives gaining enterprise support.' },
    { id: 't3', category: 'Threats', text: 'Data sovereignty regulations in EU (GDPR updates).' },
    { id: 't4', category: 'Threats', text: 'Economic downturn reducing R&D budgets.' },
    { id: 't5', category: 'Threats', text: 'AI code generation reducing need for complex manual pipelines.' },
  ],
  personas: [
    {
      id: 'p1',
      name: 'CTO Chris',
      role: 'Chief Technology Officer',
      demographics: '45-55, MBA/CS Degree, San Francisco/Austin',
      avatarUrl: 'https://picsum.photos/100/100?random=1',
      psychographics: ['Values stability', 'Risk-averse', 'Innovation-driven', 'Data-centric'],
      painPoints: ['Technical debt accumulation', 'Developer churn due to burnout', 'Compliance audits'],
      goals: ['Reduce time-to-market', 'Ensure 100% security compliance', 'Scale engineering team efficiently']
    },
    {
      id: 'p2',
      name: 'DevLead David',
      role: 'Senior DevOps Engineer',
      demographics: '30-40, Senior Engineer, Remote',
      avatarUrl: 'https://picsum.photos/100/100?random=2',
      psychographics: ['Efficiency maximizer', 'Open-source advocate', 'Skeptical of marketing'],
      painPoints: ['Merge conflicts', 'Flaky pipelines', 'Context switching'],
      goals: ['Automate everything', 'Zero-touch deployments', 'Fast feedback loops']
    },
    {
      id: 'p3',
      name: 'PM Patricia',
      role: 'Product Manager',
      demographics: '28-38, Product background, NY/London',
      avatarUrl: 'https://picsum.photos/100/100?random=3',
      psychographics: ['Collaborative', 'User-focused', 'Deadline-oriented'],
      painPoints: ['Lack of visibility into build status', 'Delayed releases', 'Miscommunication with devs'],
      goals: ['Predictable release cadence', 'Clear roadmap visibility', 'Happy stakeholders']
    },
    {
      id: 'p4',
      name: 'Security Sarah',
      role: 'CISO / Security Architect',
      demographics: '40-50, Cybersecurity certs, DC/Boston',
      avatarUrl: 'https://picsum.photos/100/100?random=4',
      psychographics: ['Paranoid (professionally)', 'Process-oriented', 'Detail-obsessed'],
      painPoints: ['Shadow IT', 'Vulnerable dependencies', 'Audit preparation stress'],
      goals: ['Zero-trust architecture', 'Automated compliance reporting', 'Secure software supply chain']
    },
    {
      id: 'p5',
      name: 'Ops Manager Oliver',
      role: 'VP of Operations',
      demographics: '35-45, Business ops, Chicago',
      avatarUrl: 'https://picsum.photos/100/100?random=5',
      psychographics: ['Budget-conscious', 'Efficiency-driven', 'Metrics-focused'],
      painPoints: ['Cloud bill spikes', 'Tool redundancy', 'Onboarding inefficiency'],
      goals: ['Optimize tool spend', 'Streamline onboarding', 'Maximize ROI on SaaS']
    }
  ],
  competitors: [
    { name: 'Jenkins Enterprise', overlap: 'High', strength: 'Massive plugin ecosystem', weakness: 'Maintenance nightmare, old UI' },
    { name: 'GitLab Ultimate', overlap: 'Medium', strength: 'All-in-one platform', weakness: 'Expensive per-seat pricing' },
    { name: 'CircleCI', overlap: 'Medium', strength: 'Cloud-native ease of use', weakness: 'Less customizable for complex on-prem needs' }
  ],
  pillars: [
    { id: 'pil1', name: 'Thought Leadership', description: 'Future of DevOps, AI in Engineering', color: '#4F46E5' },
    { id: 'pil2', name: 'Product Tutorials', description: 'How-to guides, feature deep dives', color: '#0EA5E9' },
    { id: 'pil3', name: 'Customer Stories', description: 'Case studies, ROI analysis', color: '#10B981' },
    { id: 'pil4', name: 'Industry Trends', description: 'DORA metrics, State of DevOps', color: '#F59E0B' },
    { id: 'pil5', name: 'Dev Culture', description: 'Remote work, burnout prevention', color: '#EC4899' },
    { id: 'pil6', name: 'Security First', description: 'DevSecOps, Compliance', color: '#EF4444' },
    { id: 'pil7', name: 'Future of Work', description: 'Hybrid teams, async collaboration', color: '#8B5CF6' }
  ],
  assets: [
    { id: 'a1', title: 'State of DevOps 2025 Report', type: AssetType.WHITEPAPER, status: AssetStatus.PUBLISHED, pillarId: 'pil1', folderPath: '05-Assets/Thought-Leadership', linkedAssets: ['a2', 'a3'], lastModified: '2024-05-15', metrics: { views: 12500, clicks: 450, conversion: 2.1 } },
    { id: 'a2', title: '5 Ways AI Reduces Technical Debt', type: AssetType.ARTICLE, status: AssetStatus.PUBLISHED, pillarId: 'pil1', folderPath: '05-Assets/Thought-Leadership', linkedAssets: ['a1'], lastModified: '2024-05-20', metrics: { views: 3400, clicks: 120, conversion: 1.5 } },
    { id: 'a3', title: 'Launch Video: TechFlow v4.0', type: AssetType.VIDEO, status: AssetStatus.APPROVED, pillarId: 'pil2', folderPath: '05-Assets/Product-Tutorials', linkedAssets: [], lastModified: '2024-06-01', metrics: { views: 800, clicks: 50, conversion: 5.0 } },
    { id: 'a4', title: 'Case Study: FinTechCorp Scales to 500 Devs', type: AssetType.ARTICLE, status: AssetStatus.REVIEW, pillarId: 'pil3', folderPath: '05-Assets/Customer-Stories', linkedAssets: [], lastModified: '2024-06-10' },
    { id: 'a5', title: 'Security Best Practices Checklist', type: AssetType.WHITEPAPER, status: AssetStatus.DRAFT, pillarId: 'pil6', folderPath: '05-Assets/Security-First', linkedAssets: [], lastModified: '2024-06-12' },
    { id: 'a6', title: 'Async Work for Sync Minds', type: AssetType.SOCIAL_POST, status: AssetStatus.PUBLISHED, pillarId: 'pil7', folderPath: '05-Assets/Future-of-Work', linkedAssets: [], lastModified: '2024-05-28', metrics: { views: 5000, clicks: 800, conversion: 0.5 } },
    { id: 'a7', title: 'Implementing DORA Metrics', type: AssetType.VIDEO, status: AssetStatus.PUBLISHED, pillarId: 'pil4', folderPath: '05-Assets/Industry-Trends', linkedAssets: [], lastModified: '2024-05-10', metrics: { views: 2200, clicks: 300, conversion: 3.2 } },
    { id: 'a8', title: 'Newsletter: June Edition', type: AssetType.EMAIL, status: AssetStatus.DRAFT, pillarId: 'pil5', folderPath: '05-Assets/Dev-Culture', linkedAssets: ['a2', 'a6'], lastModified: '2024-06-14' }
  ],
  calendar: [
    { id: 'c1', date: '2024-06-01', assetId: 'a3', channel: 'YouTube' },
    { id: 'c2', date: '2024-06-03', assetId: 'a2', channel: 'LinkedIn' },
    { id: 'c3', date: '2024-06-05', assetId: 'a6', channel: 'Twitter/X' },
    { id: 'c4', date: '2024-06-10', assetId: 'a7', channel: 'Blog' },
    { id: 'c5', date: '2024-06-15', assetId: 'a1', channel: 'Email' },
    { id: 'c6', date: '2024-06-20', assetId: 'a4', channel: 'Website' },
    { id: 'c7', date: '2024-06-25', assetId: 'a5', channel: 'LinkedIn' }
  ],
  videoProjects: [
    {
      id: 'vp1',
      title: 'Product Demo - DevOps Platform',
      brandId: 'b1',
      pillarId: 'pil2',
      status: AssetStatus.DRAFT,
      resolution: '1080p',
      aspectRatio: '16:9',
      totalDuration: 150, // 2:30 min
      lastModified: '2024-06-16',
      scenes: [
        { 
          id: 'sc1', order: 1, name: 'Intro: CI/CD Chaos', duration: 15, status: 'ready', transition: 'Fade',
          description: 'Split screen showing frustrated developers dealing with merge conflicts vs happy TechFlow users.',
          visualPrompt: 'Cinematic split screen, left side dark and chaotic server room with red lights, right side clean bright modern office with blue hologram data flow.',
          voiceScript: 'Is your engineering team drowning in merge conflicts and deployment failures? You are not alone.'
        },
        { 
          id: 'sc2', order: 2, name: 'The TechFlow Solution', duration: 30, status: 'generating', transition: 'Zoom',
          description: 'Animated visualization of the TechFlow engine resolving git conflicts automatically.',
          visualPrompt: '3D animation of code blocks merging seamlessly, glowing blue nodes connecting in a network, high tech UI overlay.',
          voiceScript: 'Meet TechFlow. The world\'s first AI-driven central nervous system for hybrid DevOps environments.'
        },
        { 
          id: 'sc3', order: 3, name: 'Security Compliance', duration: 45, status: 'empty', transition: 'Slide',
          description: 'Shield interface showing SOC2 and ISO compliance checks passing.',
          visualPrompt: 'Digital shield forming around a server rack, green checkmarks appearing for SOC2 and ISO 27001, futuristic HUD.',
          voiceScript: 'With automated SOC2 compliance checks built-in, you can deploy with confidence, not compromise.'
        },
        { 
          id: 'sc4', order: 4, name: 'Hybrid Cloud', duration: 30, status: 'empty', transition: 'Fade',
          description: 'Data flowing between on-prem servers and AWS/Azure clouds.',
          visualPrompt: 'Data streams flowing rapidly between a physical server rack and a stylized cloud icon, representing seamless hybrid integration.',
          voiceScript: 'Whether you are on-prem, in the cloud, or somewhere in between, TechFlow bridges the gap.'
        },
        { 
          id: 'sc5', order: 5, name: 'Call to Action', duration: 30, status: 'empty', transition: 'None',
          description: 'Logo reveal and website URL.',
          visualPrompt: 'Clean white background, TechFlow logo animates in center, "Schedule Demo" button appears in TechFlow blue.',
          voiceScript: 'Stop fixing pipelines. Start shipping code. Schedule your demo at techflow.io today.'
        }
      ]
    }
  ]
};

export const DEFAULT_SETTINGS: AppSettings = {
  profile: {
    name: 'Admin User',
    email: 'admin@techflow.io',
    role: 'Marketing Director',
    company: 'TechFlow Solutions',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=4F46E5&color=fff'
  },
  api: {
    geminiKey: process.env.GEMINI_API_KEY || '',
    veoKey: process.env.VEO_API_KEY || '',
    googleDriveToken: process.env.GOOGLE_DRIVE_TOKEN || ''
  },
  appearance: {
    theme: 'light',
    primaryColor: '#4F46E5',
    compactMode: false
  },
  notifications: {
    email: true,
    push: false,
    approvalAlerts: true
  },
  privacy: {
    analyticsTracking: true,
    dataRetentionDays: 365
  }
};

export const FOLDER_STRUCTURE: Folder[] = [
  {
    id: 'f1', name: '01-Brand-Research', path: '01-Brand-Research', children: [
      { id: 'f1-1', name: 'Market-Analysis.pdf', path: '01-Brand-Research/Market-Analysis.pdf', children: [] },
      { id: 'f1-2', name: 'Competitor-Deep-Dive.docx', path: '01-Brand-Research/Competitor-Deep-Dive.docx', children: [] }
    ]
  },
  {
    id: 'f2', name: '02-Audience', path: '02-Audience', children: [
      { id: 'f2-1', name: 'Personas_v3.json', path: '02-Audience/Personas_v3.json', children: [] },
      { id: 'f2-2', name: 'Customer-Interviews', path: '02-Audience/Customer-Interviews', children: [] }
    ]
  },
  {
    id: 'f3', name: '03-Strategy', path: '03-Strategy', children: [
      { id: 'f3-1', name: 'Brand-Guidelines.pdf', path: '03-Strategy/Brand-Guidelines.pdf', children: [] },
      { id: 'f3-2', name: 'Q3-OKRs.xlsx', path: '03-Strategy/Q3-OKRs.xlsx', children: [] }
    ]
  },
  {
    id: 'f4', name: '04-Calendar', path: '04-Calendar', children: [
      { id: 'f4-1', name: 'Q3-Content-Calendar.csv', path: '04-Calendar/Q3-Content-Calendar.csv', children: [] }
    ]
  },
  {
    id: 'f5', name: '05-Assets', path: '05-Assets', children: [
      { id: 'f5-1', name: 'Thought-Leadership', path: '05-Assets/Thought-Leadership', children: [] },
      { id: 'f5-2', name: 'Product-Tutorials', path: '05-Assets/Product-Tutorials', children: [] },
      { id: 'f5-3', name: 'Customer-Stories', path: '05-Assets/Customer-Stories', children: [] },
      { id: 'f5-4', name: 'Security-First', path: '05-Assets/Security-First', children: [] },
      { id: 'f5-5', name: 'Dev-Culture', path: '05-Assets/Dev-Culture', children: [] },
      { id: 'f5-6', name: 'Industry-Trends', path: '05-Assets/Industry-Trends', children: [] },
      { id: 'f5-7', name: 'Future-of-Work', path: '05-Assets/Future-of-Work', children: [] },
      { id: 'f5-8', name: 'Videos', path: '05-Assets/Videos', children: [] }, // Synced Video Folder
    ]
  },
  {
    id: 'f6', name: '06-Analytics', path: '06-Analytics', children: [
      { id: 'f6-1', name: 'Monthly-Reports', path: '06-Analytics/Monthly-Reports', children: [] }
    ]
  }
];