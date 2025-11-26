// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Progress types
export enum ProgressStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface UserProgress {
  id: string;
  userId: string;
  activityId: string;
  status: ProgressStatus;
  notes?: string;
  evidenceUrl?: string;
  fileRef?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  activity: Activity;
}

// Roadmap types
export interface RoadmapWeek {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
  days: RoadmapDay[];
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapDay {
  id: string;
  weekId: string;
  dayNumber: number;
  title: string;
  focusArea: string;
  detailedActivities: string;
  expectedOutput: string;
  week?: RoadmapWeek;
  activities?: Activity[];
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  dayId: string;
  title: string;
  description: string;
  toolTags: string;
  orderIndex: number;
  progress?: UserProgress[];
  createdAt: string;
  updatedAt: string;
}

// Artifact types
export interface Artifact {
  id: string;
  userId: string;
  dayId?: string;
  title: string;
  description?: string;
  link?: string;
  fileRef?: string;
  visibility: 'private' | 'public';
  day?: RoadmapDay;
  createdAt: string;
  updatedAt: string;
}

// Dashboard types
export interface DashboardOverview {
  totalActivities: number;
  completedActivities: number;
  inProgressActivities: number;
  overallCompletionPercent: number;
  currentStreak: number;
}

export interface WeeklyProgress {
  weekNumber: number;
  title: string;
  totalActivities: number;
  completedActivities: number;
  completionPercent: number;
}

export interface DailyProgress {
  date: string;
  completions: number;
}

export interface ToolStat {
  tool: string;
  count: number;
}

export interface RecentProgress {
  id: string;
  status: ProgressStatus;
  notes?: string;
  evidenceUrl?: string;
  completedAt?: string;
  updatedAt: string;
  activity: {
    id: string;
    title: string;
    toolTags: string;
    day: {
      dayNumber: number;
      focusArea: string;
      week: {
        weekNumber: number;
        title: string;
      };
    };
  };
}

export interface DashboardData {
  overview: DashboardOverview;
  weeklyProgress: WeeklyProgress[];
  dailyProgress: DailyProgress[];
  toolStats: ToolStat[];
  recentProgress: RecentProgress[];
}

// API types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface ProgressRequest {
  activityId: string;
  status: ProgressStatus;
  notes?: string;
  evidenceUrl?: string;
}

export interface ArtifactRequest {
  title: string;
  description?: string;
  link?: string;
  dayId?: string;
  file?: File;
}