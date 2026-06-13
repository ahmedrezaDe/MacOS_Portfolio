import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#/constants/index.js";

const DEFAULT_LOCATION = locations.work;

// By adding standard JS structure and fixing the guard clause, the types clear up
const useLocationStore = create()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location) =>
      set((state) => {
        // Guard Clause: Stop execution immediately if location is missing, null, or undefined
        if (!location) return;

        // Safely mutate state only when we know the location is valid
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  })),
);

export default useLocationStore;
