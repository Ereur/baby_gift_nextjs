// src/store/useUserStore.ts

import {create} from 'zustand';

export interface User {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: {} as User,
  setUser: (user) => set({ user }),
}));

export default useUserStore;