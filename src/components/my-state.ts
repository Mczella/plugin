import { StateCreator } from "zustand";
import { NewIngredient, NewRecipe } from "./types.ts";

export interface MyIngredientsState {
  ingredients: NewIngredient[];
  addIngredient: (newIngredient: NewIngredient) => void;
}

export interface MyRecipesState {
  recipes: NewRecipe[];
  addRecipe: (newRecipe: NewRecipe) => void;
}

export const createIngredientsSlice: StateCreator<
  MyIngredientsState,
  [],
  [],
  MyIngredientsState
> = (set) => ({
  ingredients: [],
  addIngredient: (newIngredient: NewIngredient) => {
    set((state) => ({
      ingredients: [...state.ingredients, newIngredient],
    }));
  },
});

export const createRecipesSlice: StateCreator<
  MyRecipesState,
  [],
  [],
  MyRecipesState
> = (set) => ({
  recipes: [],
  addRecipe: (newRecipe: NewRecipe) => {
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    }));
  },
});
