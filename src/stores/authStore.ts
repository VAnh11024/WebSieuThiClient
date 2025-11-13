import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/api/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => {
        const oldUser = get().user
        
        // Chỉ xoá cart khi chuyển sang user khác hoàn toàn
        const isDifferentUser = oldUser?.id && oldUser.id !== user?.id
        if (isDifferentUser && typeof window !== "undefined") {
          localStorage.removeItem(`cart_${oldUser.id}`)
        }
        
        set({
          user,
          isAuthenticated: !!user,
        })
      },
      logout: () => {
        // Clear cart của user hiện tại khi logout
        const currentUser = get().user
        if (currentUser?.id && typeof window !== "undefined") {
          localStorage.removeItem(`cart_${currentUser.id}`)
        }
        // Clear guest cart
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart_guest")
        }
        
        set({
          user: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage', // key trong localStorage
    }
  )
);

