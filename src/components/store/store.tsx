import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import { createStore, useStore } from "zustand";
import { StateStorage, persist, createJSONStorage } from "zustand/middleware";
import {
  // MyState,
  createIngredientsSlice,
  createRecipesInCartSlice,
  createRecipesSlice,
  createTemporaryUISlice,
  MyIngredientsState,
  MyRecipesInCartState,
  MyRecipesState,
  MyTemporaryUIState,
} from "./my-state.ts";

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

// type State = MyState;

export const store = createStore<
  MyIngredientsState &
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
    },
  ),
);

export const StoreContext = createContext(store);

export function useBytesInUse() {
  const [bytesInUse, setBytesInUse] = useState<number>(0);

  useEffect(() => {
    chrome.storage.local.onChanged.addListener(getBytesInUse);

    function getBytesInUse() {
      chrome.storage.local.getBytesInUse((bytes) => {
        setBytesInUse(bytes);
      });
    }

    return () => {
      chrome.storage.local.onChanged.removeListener(getBytesInUse);
    };
  }, []);

  return bytesInUse;
}
export function usePurgeStorage() {
  return useCallback(() => {
    store.persist.clearStorage();
    store.setState({
      ingredients: [],
      recipes: [],
      recipesInCart: [],
      name: null,
      amount: 0,
      selectedIngredients: [],
      selectedProducts: [],
      selectedIngredient: null,
      ingredientsInCart: [],
    });
  }, []);
}

export function useMyStore() {
  const store = useContext(StoreContext);
  return useStore(store);
}
