// src/store/useUserStore.ts

import create from 'zustand';

interface UserState {
  user: any;
  setUser: (user: any) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;