import { createContext, useContext } from "react";
import { StateCreator, StoreApi, createStore, useStore } from "zustand";
import { StateStorage, persist, createJSONStorage } from "zustand/middleware";
import {
  createRecipesInCartSlice,
  createRecipesSlice,
  createTemporaryUISlice,
  MyRecipesInCartState,
  MyRecipesState,
  MyTemporaryUIState,
} from "./my-state.ts";
import { createIngredientsSlice } from "./ingredients.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractSliceState<T> = T extends StateCreator<any, [], [], infer R>
  ? R
  : never;

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const item = await chrome.storage.local.get(name);
    return item[name];
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    await chrome.storage.local.set({
      [name]: value,
    });
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    await chrome.storage.local.remove(name);
  },
};

export const createMyStore = () =>
  createStore<
    ExtractSliceState<typeof createIngredientsSlice> &
      MyRecipesState &
      MyRecipesInCartState &
      MyTemporaryUIState
  >()(
    persist(
      (...a) => ({
        ...createIngredientsSlice(...a),
        ...createRecipesSlice(...a),
        ...createRecipesInCartSlice(...a),
        ...createTemporaryUISlice(...a),
      }),
      {
        name: "rohlik-storage",
        storage: createJSONStorage(() => storage),
        skipHydration: false,
        onRehydrateStorage: () => {
          console.log("hydration starts");

          // optional
          return (_, error) => {
            if (error) {
              console.log("an error happened during hydration", error);
            } else {
              console.log("hydration finished", _);
            }
          };
        },
      }
    )
  );

type Store = ReturnType<typeof createMyStore>;
export type State = ExtractState<Store>;

export const StoreContext = createContext<Store | null>(null);

// Types inspired by https://github.com/arvinxx/zustand-utils/tree/master
// If I recall correctly the main reason for this jugglery is to trying to please Vite
// to avoid errors where changes in store weren't propagated correctly
// it might be interesting to revisit this if future because using plain `create` vs `createStore` might be enough
export type UseContextStore<S extends StoreApi<unknown>> = {
  (): ExtractState<S>;
  <U>(selector: (state: ExtractState<S>) => U): U;
};

type ExtractState<S> = S extends { getState: () => infer T } ? T : never;

export const useMyStore: UseContextStore<Store> = (
  selector?: (state: State) => State
) => {
  const store = useContext(StoreContext);

  if (!store) throw new Error("useMyStore must be used within a StoreProvider");

  return useStore(store, selector as (state: State) => State);
};
