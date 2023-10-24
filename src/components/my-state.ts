import { StateCreator } from "zustand";

export interface MyState {
  products: number[];
  addProducts: (id: number) => void;
}

// Vice zde https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md#slicing-the-store-into-smaller-stores
// TLDR; muzem si vytvorit "slice" pro Producty, Ingredience, etc. zvlast at se v tom dobre orientuje a pak to teprve spojit v store.tsx
export const createMySlice: StateCreator<MyState, [], [], MyState> = (set) => ({
  products: [1, 1, 3, 4, 5],
  addProducts: (id: number) => {
    return set((state) => ({ products: [...state.products, id] }));
  },
});
