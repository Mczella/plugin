import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

interface State {
  products: number[];
  addProducts: (id: number) => void;
}

// Custom storage object
// const storage: StateStorage = {
//   getItem: async (name: string): Promise<string | null> => {
//     console.log(name, "has been retrieved");
//     return chrome.storage.local.get([`${name}`]);
//   },
//   setItem: async (name: string, value: string): Promise<void> => {
//     console.log(name, "with value", value, "has been saved");
//     return chrome.storage.local.set({
//       [name]: value,
//     });
//   },
//   removeItem: async (name: string): Promise<void> => {
//     console.log(name, "has been deleted");
//     return chrome.storage.local.remove(name);
//   },
// };

console.log("cus");

export const useStore = create<State>()(
  persist(
    (set) => ({
      products: [0, 1, 3, 5],
      recepty: [
        {
          name: "test",
          ingredience: [0, 1],
        },
      ],
      addProducts: (id: number) => {
        console.log(id);
        return set((state) => ({ products: [...state.products, id] }));
      },
    }),
    {
      name: "rohlik-storage",
      //       storage: createJSONStorage(() => storage),
    }
  )
);
