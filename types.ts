export enum AssetStatus {
  DRAFT = 'Draft',
  REVIEW = 'In Review',
  APPROVED = 'Approved',
  PUBLISHED = 'Published'
}

export enum AssetType {
  IMAGE = 'Image',
  VIDEO = 'Video',
  ARTICLE = 'Article',
  WHITEPAPER = 'Whitepaper',
  SOCIAL_POST = 'Social Post',
  EMAIL = 'Email Campaign'
}

export interface BrandMetric {
  date: string;
  engagementRate: number;
  brandScore: number;
  publishedCount: number;
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  demographics: string;
  psychographics: string[];
  painPoints: string[];
  goals: string[];
  avatarUrl: string;
}

export interface SwotItem {
  id: string;
  text: string;
  category: 'Strengths' | 'Weaknesses' | 'Opportunities' | 'Threats';
}

export interface Competitor {
  name: string;
  overlap: string;
  strength: string;
  weakness: string;
}

export interface ContentPillar {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Asset {
  id: string;
  title: string;
  type: AssetType;
  status: AssetStatus;
  pillarId: string;
  folderPath: string;
  linkedAssets: string[]; // IDs of related assets
  lastModified: string;
  metrics?: {
    views: number;
    clicks: number;
    conversion: number;
  };
}

export interface CalendarEvent {
  id: string;
  date: string;
  assetId: string;
  channel: string;
}

export interface Folder {
  id: string;
  name: string;
  path: string;
  children: Folder[];
}

// Video Studio Types
export interface VideoScene {
  id: string;
  order: number;
  name: string;
  duration: number; // seconds
  description: string;
  visualPrompt: string;
  voiceScript: string;
  transition: 'Fade' | 'Slide' | 'Zoom' | 'Bounce' | 'None';
  status: 'empty' | 'generating' | 'ready';
  thumbnailUrl?: string;
  videoUrl?: string;
}

export interface VideoProject {
  id: string;
  title: string;
  brandId: string;
  pillarId: string;
  status: AssetStatus;
  resolution: '1080p' | '720p' | '4K';
  aspectRatio: '16:9' | '9:16';
  totalDuration: number;
  scenes: VideoScene[];
  lastModified: string;
}

// Settings Types
export interface AppSettings {
  profile: {
    name: string;
    email: string;
    role: string;
    company: string;
    avatar: string;
  };
  api: {
    geminiKey: string;
    veoKey: string;
    googleDriveToken: string;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    primaryColor: string;
    compactMode: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    approvalAlerts: boolean;
  };
  privacy: {
    analyticsTracking: boolean;
    dataRetentionDays: number;
  };
}

export interface BrandData {
  name: string;
  description: string;
  metrics: {
    totalAssets: number;
    publishedMonthly: number;
    avgEngagement: string;
    brandHealthScore: number;
  };
  positioning: string;
  swot: SwotItem[];
  personas: Persona[];
  competitors: Competitor[];
  pillars: ContentPillar[];
  assets: Asset[];
  calendar: CalendarEvent[];
  videoProjects?: VideoProject[]; // Added for VideoStudio
}