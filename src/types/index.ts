
export interface RequestData {
  timestamp: Date;
  ip: string;
  endpoint: string;
  method: string;
  count: number;
  blocked?: boolean;
  status?: number;
  responseTime?: number;
}

export interface BlockedIP {
  ip: string;
  reason: string;
  duration: string;
  timestamp: Date;
  permanent?: boolean;
  storage?: "redis" | "mongodb"; // Indicates where the IP is blocked (temporary or permanent)
}

export interface AuthUser {
  id: string;
  username: string;
  token: string; // JWT token
  role: "admin" | "viewer";
}

// API Response types for when we connect to the real backend
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
