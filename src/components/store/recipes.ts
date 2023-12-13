import { StateCreator } from "zustand";
import { NewRecipe } from "../types.ts";

interface MyRecipesActions {
  addRecipe: (newRecipe: NewRecipe) => void;
}

export interface MyRecipesState {
  recipes: NewRecipe[];
}

const initialRecipesState: MyRecipesState = {
  recipes: [],
};

export const createRecipesSlice: StateCreator<
  MyRecipesState & MyRecipesActions,
  [],
  [],
  MyRecipesState & MyRecipesActions
> = (set) => ({
  ...initialRecipesState,
  addRecipe: (newRecipe: NewRecipe) => {
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    }));
  },
});
