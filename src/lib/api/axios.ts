import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Import token getters (dynamic import to avoid circular dependency)
let getAccessToken: () => string | null;
let getRefreshToken: () => string | null;

// Lazy load the auth store getters
const loadAuthGetters = async () => {
  if (!getAccessToken) {
    const authModule = await import('../stores/auth');
    getAccessToken = authModule.getAccessToken;
    getRefreshToken = authModule.getRefreshToken;
  }
};

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      await loadAuthGetters();
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from auth store:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await loadAuthGetters();
        const refreshToken = getRefreshToken();

        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
            expiresInMins: 30,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          // Update tokens in auth store and storage
          const { useAuthStore } = await import('../stores/auth');
          const { saveAccessToken, saveRefreshToken } = await import(
            '../storage'
          );

          // Update storage
          await saveAccessToken(accessToken);
          await saveRefreshToken(newRefreshToken);

          // Update auth store
          useAuthStore.setState({
            accessToken,
            refreshToken: newRefreshToken,
          });

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user via auth store
        try {
          const { useAuthStore } = await import('../stores/auth');
          await useAuthStore.getState().logout();
        } catch (logoutError) {
          console.error('Logout during token refresh failed:', logoutError);
        }
        console.error('Token refresh failed:', refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
