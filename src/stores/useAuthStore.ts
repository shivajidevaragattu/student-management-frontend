import { create } from 'zustand';
import Cookies from 'js-cookie';
import { LoginSchema } from '../schemas/AuthSchemas';
import { z } from 'zod';
import axios from 'axios';

interface AuthState {
  isAuthenticated: boolean;
  login: (values: z.infer<typeof LoginSchema>) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Cookies.get('token') ? true : false,
  login: async (values: z.infer<typeof LoginSchema>) => {
    await axios.post('http://localhost:3000/api/v1/auth/login', values, {
      withCredentials: true,
    });

    set({ isAuthenticated: Cookies.get('token') ? true : false });
  },
  logout: async () => {
    await axios.get('http://localhost:3000/api/v1/auth/logout', {
      withCredentials: true,
    });

    set({
      isAuthenticated: Cookies.get('token') ? true : false,
    });
  },
}));
