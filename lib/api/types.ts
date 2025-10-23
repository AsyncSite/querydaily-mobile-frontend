/**
 * API Response Types
 * Core-platform common module의 ApiResponse와 일치
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorDetail;
  timestamp: string;
}

export interface ErrorDetail {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Domain Models (백엔드 연동 시 사용)
 */

export interface Question {
  id: string;
  content: string;
  techStack: string;
  careerLevel: string;
  difficulty: string;
  isPremium: boolean;
  createdAt: string;
}

export interface Answer {
  id: string;
  userId: string;
  questionId: string;
  content: string;
  isPublic: boolean;
  createdAt: string;
}

export interface Insight {
  id: string;
  userId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
}

export interface Member {
  userId: string;
  email: string;
  nickname?: string;
  company?: string;
  careerLevel?: string;
  techStack?: string[];
}
