import { StateCreator } from "zustand";
import { NewIngredient, NewRecipe, Product } from "../types.ts";

export interface MyIngredientsState {
  ingredients: NewIngredient[];
  addIngredient: (ingredient: NewIngredient) => void;
  editIngredients: (ingredients: NewIngredient[]) => void;
}

export interface MyRecipesState {
  recipes: NewRecipe[];
  addRecipe: (newRecipe: NewRecipe) => void;
}

export interface MyTemporaryUIState {
  amount: number;
  editAmount: (amount: number) => void;
  name: string | null;
  editName: (name: string | null) => void;
  selectedIngredient: NewIngredient | null;
  selectedIngredients: NewIngredient[];
  selectedProducts: Product[];
  selectIngredient: (ingredient: NewIngredient | null) => void;
  addToSelectedIngredients: (ingredient: NewIngredient) => void;
  editSelectedIngredients: (ingredients: NewIngredient[] | undefined) => void;
  addToSelectedProducts: (product: Product) => void;
  editSelectedProducts: (products: Product[] | undefined) => void;
  deleteSelectedIngredient: (ingredient: NewIngredient) => void;
  deleteSelectedProduct: (product: Product) => void;
}

export interface MyRecipesInCartState {
  recipesInCart: string[];
  addRecipeToCart: (recipe: string) => void;
  deleteRecipeFromCart: (recipe: string) => void;
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
  editIngredients: (ingredients: NewIngredient[]) => {
    set({
      ingredients: ingredients,
    });
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

export const createTemporaryUISlice: StateCreator<
  MyTemporaryUIState,
  [],
  [],
  MyTemporaryUIState
> = (set) => ({
  name: null,
  amount: 0,
  selectedIngredient: null,
  selectedIngredients: [],
  selectedProducts: [],
  editName: (name: string | null) => {
    set({
      name: name,
    });
  },
  editAmount: (amount: number) => {
    set({
      amount: amount,
    });
  },
  selectIngredient: (ingredient: NewIngredient | null) => {
    set({
      selectedIngredient: ingredient,
    });
  },
  addToSelectedIngredients: (ingredient: NewIngredient) => {
    set((state) => ({
      selectedIngredients: [...state.selectedIngredients, ingredient],
    }));
  },
  editSelectedIngredients: (ingredients: NewIngredient[] | undefined) => {
    set({
      selectedIngredients: ingredients,
    });
  },
  addToSelectedProducts: (product: Product) => {
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    }));
  },
  editSelectedProducts: (products: Product[] | undefined) => {
    set({
      selectedProducts: products,
    });
  },
  deleteSelectedIngredient: (ingredient: NewIngredient) => {
    set((state) => ({
      selectedIngredients: state.selectedIngredients.filter(
        (stateIngredient) => stateIngredient !== ingredient,
      ),
    }));
  },
  deleteSelectedProduct: (product: Product) => {
    set((state) => ({
      selectedProducts: state.selectedProducts.filter(
        (stateProduct) => stateProduct !== product,
      ),
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
  deleteRecipeFromCart: (recipe: string) => {
    set((state) => ({
      recipesInCart: state.recipesInCart.filter(
        (stateRecipe) => stateRecipe !== recipe,
      ),
    }));
  },
});
