// Auth types
export interface AuthResponse {
  accessToken: string;
}

export interface UserSession {
  accessToken: string;
  expiresAt?: number; // optional for token expiry
}
