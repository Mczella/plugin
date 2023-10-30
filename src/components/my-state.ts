import { StateCreator } from "zustand";
import { NewIngredient, NewRecipe } from "./types.ts";

export interface MyIngredientsState {
  ingredients: NewIngredient[];
  addIngredient: (ingredient: NewIngredient) => void;
}

export interface MyRecipesState {
  recipes: NewRecipe[];
  addRecipe: (newRecipe: NewRecipe) => void;
}

export interface MyRecipesInCartState {
  recipesInCart: string[];
  addRecipeToCart: (recipe: string) => void;
}

export const createIngredientsSlice: StateCreator<
  MyIngredientsState,
  [],
  [],
  MyIngredientsState
> = (set) => ({
  ingredients: [],
  addIngredient: (ingredient: NewIngredient) => {
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
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

export const createRecipesInCartSlice: StateCreator<
  MyRecipesInCartState,
  [],
  [],
  MyRecipesInCartState
> = (set) => ({
  recipesInCart: [],
  addRecipeToCart: (recipe: string) => {
    set((state) => ({
      recipesInCart: [...state.recipesInCart, recipe],
    }));
  },
});