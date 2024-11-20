import { create } from 'zustand';
import { User } from '@/types';

interface UserState {
    users: User[];
    setUsers: (users: User[]) => void;

    page: number;
    setPage: (page: number) => void;

    totalUsers: number;
    setTotalUsers: (totalUsers: number) => void;
}

const useUserStore = create<UserState>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),

    page: 1,
    setPage: (page: number) => set({ page }),

    totalUsers: 0,
    setTotalUsers: (totalUsers: number) => set({ totalUsers })
}));

export default useUserStore;
