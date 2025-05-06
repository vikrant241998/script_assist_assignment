import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  _setIsAuthenticated: (value: boolean) => void; // Internal use ke liye
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',

  // Internal function, directly called by login/logout
  _setIsAuthenticated: (value: boolean) => {

    if (value) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
    }
    set({ isAuthenticated: value });
  },

  login: () => {
    useAuthStore.getState()._setIsAuthenticated(true);
  },

  logout: () => {
    useAuthStore.getState()._setIsAuthenticated(false);
  },
}));