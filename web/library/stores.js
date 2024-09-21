import { create } from "zustand";

export const useSearchStore = create((set, get) => ({
    query: {},
    setQuery: (key, value) =>
        set((state) => ({
            query: { ...state.query, [key]: value },
        })),

    getQuery: () => {
        const { query } = get();
        return Object.keys(query)
            .filter((key) => query[key] !== undefined && query[key] !== "")
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
            .join("&");
    },
}));

export const useMetadataStore = create((set) => ({
    metadata: {
        title: "Jobgram - Your Ultimate Job Search Engine",
        description: "Explore thousands of job opportunities!",
    },
    setMetadata: (newMetadata) => set({ metadata: newMetadata }),
}));
