import { create } from 'zustand';

interface FormState {
    showForm: boolean;
    setShowForm: (showForm: boolean) => void;

    id: number | null;
    name: string;
    email: string;

    setFromData: (id: number | null, name: string, email: string) => void;
}

const useFormStore = create<FormState>((set) => ({
    showForm: false,
    setShowForm: (showForm) => set({ showForm }),
    id: null,
    name: '',
    email: '',
    setFromData: (id, name, email) => set({ id, name, email})
}));

export default useFormStore;
