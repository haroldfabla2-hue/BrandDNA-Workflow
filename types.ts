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
}
