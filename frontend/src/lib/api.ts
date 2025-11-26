import axios from 'axios';
import {
  User,
  LoginRequest,
  SignupRequest,
  ProgressRequest,
  ProgressStatus,
  ArtifactRequest,
  RoadmapWeek,
  RoadmapDay,
  Activity,
  UserProgress,
  Artifact,
  DashboardData,
  ApiResponse,
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data.data;
  },

  signup: async (email: string, password: string, name: string) => {
    const response = await api.post('/api/auth/signup', { email, password, name });
    return response.data.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data.data;
  },

  logout: async () => {
    await api.post('/api/auth/logout');
  },
};

// Roadmap API
export const roadmapAPI = {
  getWeeks: async (): Promise<RoadmapWeek[]> => {
    const response = await api.get('/api/roadmap/weeks');
    return response.data.data;
  },

  getWeek: async (id: string): Promise<RoadmapWeek> => {
    const response = await api.get(`/api/roadmap/weeks/${id}`);
    return response.data.data;
  },

  getDay: async (id: string): Promise<any> => {
    const response = await api.get(`/api/roadmap/days/${id}`);
    return response.data.data;
  },

  getActivities: async (params?: { week?: number; day?: string }): Promise<Activity[]> => {
    const response = await api.get('/api/roadmap/activities', { params });
    return response.data.data;
  },

  getActivityProgress: async (activityId: string): Promise<UserProgress | null> => {
    try {
      const response = await api.get(`/api/roadmap/progress/${activityId}`);
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
};

// Progress API
export const progressAPI = {
  createProgress: async (data: ProgressRequest): Promise<UserProgress> => {
    const response = await api.post('/api/progress', data);
    return response.data.data;
  },

  getProgress: async (params?: { week?: string; day?: string; status?: ProgressStatus }): Promise<UserProgress[]> => {
    const response = await api.get('/api/progress', { params });
    return response.data.data;
  },

  deleteProgress: async (activityId: string): Promise<void> => {
    await api.delete(`/api/progress/${activityId}`);
  },

  exportProgress: async (): Promise<any> => {
    const response = await api.get('/api/progress/export');
    return response.data.data;
  },

  importProgress: async (progressData: any[]): Promise<any> => {
    const response = await api.post('/api/progress/import', { progress: progressData });
    return response.data.data;
  },
};

// Artifacts API
export const artifactsAPI = {
  createArtifact: async (data: ArtifactRequest): Promise<Artifact> => {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.link) formData.append('link', data.link);
    if (data.dayId) formData.append('dayId', data.dayId);
    if (data.file) formData.append('file', data.file);

    const response = await api.post('/api/artifacts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  getArtifacts: async (params?: { day?: string; visibility?: string }): Promise<Artifact[]> => {
    const response = await api.get('/api/artifacts', { params });
    return response.data.data;
  },

  getArtifact: async (id: string): Promise<Artifact> => {
    const response = await api.get(`/api/artifacts/${id}`);
    return response.data.data;
  },

  updateArtifact: async (id: string, data: Partial<ArtifactRequest>): Promise<Artifact> => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.link) formData.append('link', data.link);
    if (data.dayId) formData.append('dayId', data.dayId);
    if (data.file) formData.append('file', data.file);

    const response = await api.put(`/api/artifacts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  deleteArtifact: async (id: string): Promise<void> => {
    await api.delete(`/api/artifacts/${id}`);
  },

  toggleVisibility: async (id: string): Promise<Artifact> => {
    const response = await api.post(`/api/artifacts/${id}/toggle-visibility`);
    return response.data.data;
  },

  getPublicArtifacts: async (): Promise<Artifact[]> => {
    const response = await api.get('/api/artifacts/public');
    return response.data.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get('/api/dashboard');
    return response.data.data;
  },

  getStreak: async (): Promise<any> => {
    const response = await api.get('/api/dashboard/streak');
    return response.data.data;
  },
};

export default api;