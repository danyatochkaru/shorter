import {create} from "zustand";
import {persist} from "zustand/middleware";

type HistoryItem = {
    originalUrl: string,
    shortedUrl: string,
    date: Date
}

interface HistoryStore {
    history: HistoryItem[];
    append: (payload: HistoryItem) => void;
}

export const useHistory = create<HistoryStore>()(persist((set) => ({
    history: [],
    append: (payload) => {
        set((state) => {
            state.history.push(payload)
            return state
        })
    }
}), {name: "history", skipHydration: true}))
