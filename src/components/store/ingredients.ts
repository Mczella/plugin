import { StateCreator } from "zustand";
import { NewIngredient } from "../types.ts";

interface MyIngredientsActions {
  addIngredient: (ingredient: NewIngredient) => void;
  editIngredients: (ingredients: NewIngredient[]) => void;
  editIngredientsBoughtOften: (
    ingredients: {
      id: NewIngredient["id"];
      amount: number;
      frequency: number;
    }[]
  ) => void;
}

interface MyIngredientsState {
  ingredients: NewIngredient[];

  ingredientsBoughtOften: {
    id: NewIngredient["id"];
    amount: number;
    frequency: number;
  }[];
}

const initialIngredientsState: MyIngredientsState = {
  ingredients: [],
  ingredientsBoughtOften: [],
};

export const createIngredientsSlice: StateCreator<
  MyIngredientsState & MyIngredientsActions,
  [],
  [],
  MyIngredientsState & MyIngredientsActions
> = (set) => ({
  ...initialIngredientsState,
  addIngredient: (ingredient: NewIngredient) => {
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
    }));
  },
  editIngredients: (ingredients: NewIngredient[]) => {
    set({
      ingredients: ingredients,
    });
  },
  editIngredientsBoughtOften: (
    ingredients:
      | { id: NewIngredient["id"]; amount: number; frequency: number }[]
      | undefined
  ) => {
    set({
      ingredientsBoughtOften: ingredients,
    });
  },
});
