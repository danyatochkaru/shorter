import {create} from "zustand";

interface AppStore {
    url: string;
    timeAlive: string;
    clickCount: string;
    password: string;
    error: string | null;
    result: string | null;
    loading: boolean;

    setUrl(url: string): void;

    setTimeAlive(time: string): void;

    setClickCount(count: string): void;

    setPassword(password: string): void;

    setError(error: string | null): void;

    setResult(result: string | null): void;

    setLoading(loading: boolean): void;
}

export const useStore = create<AppStore>((set) => ({
    url: "",
    setUrl: (url) => set({url}),
    timeAlive: "",
    setTimeAlive: (time) => set({timeAlive: time}),
    clickCount: "",
    setClickCount: (count) => set({clickCount: count}),
    password: "",
    setPassword: (password) => set({password}),
    error: null,
    setError: (error) => set({error}),
    result: null,
    setResult: (result: string) => set({result}),
    loading: false,
    setLoading: (loading) => set({loading})
}))
