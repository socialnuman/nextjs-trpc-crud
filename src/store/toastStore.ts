import { create } from 'zustand';

interface ToastState {
    showToast: boolean;
    setShowToast: (showForm: boolean) => void;

    action: string;
    errorMessage: string | undefined;

    setToastData: (action: string, errorMessage: string | undefined) => void;
}

const useToastStore = create<ToastState>((set) => ({
    showToast: false,
    setShowToast: (showToast) => set({ showToast }),

    action: '',
    errorMessage: undefined,

    setToastData: (action: string, errorMessage?: string | undefined) => set({ action, errorMessage})
}));

export default useToastStore;
