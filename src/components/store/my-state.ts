import { StateCreator } from "zustand";
import {
  NewIngredient,
  NewRecipe,
  NewRecipeIngredient,
  Preferred,
  Price,
  Product,
  Stock,
} from "../types.ts";

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
  sortBy: "price" | "pricePerUnit";
  editSortBy: (sortBy: "price" | "pricePerUnit") => void;
  optimize: boolean;
  editOptimize: (optimize: boolean) => void;
  amount: number;
  editAmount: (amount: number) => void;
  name: string | null;
  editName: (name: string | null) => void;
  selectedIngredient: NewIngredient | null;
  selectedIngredients: NewRecipeIngredient[];
  selectedProducts: (Product & Stock & Price & Preferred)[];
  selectIngredient: (ingredient: NewIngredient | null) => void;
  addToSelectedIngredients: (ingredient: NewRecipeIngredient) => void;
  editSelectedIngredients: (
    ingredients: NewRecipeIngredient[] | undefined,
  ) => void;
  addToSelectedProducts: (product: Product & Stock & Price & Preferred) => void;
  editSelectedProducts: (
    products: (Product & Stock & Price & Preferred)[] | undefined,
  ) => void;
  deleteSelectedIngredient: (ingredient: NewRecipeIngredient) => void;
  deleteSelectedProduct: (product: Product & Stock & Price & Preferred) => void;
}

export interface MyRecipesInCartState {
  recipesInCart: { id: string; amount: number }[];
  ingredientsInCart: {
    name: string;
    id: string;
    amount: number;
    unit: string;
    packageAmount: number;
    optimize: boolean;
    storeId: string;
  }[];
  addIngredientToCart: (
    name: string,
    id: string,
    amount: number,
    unit: string,
    packageAmount: number,
    optimize: boolean,
    storeId: string,
  ) => void;
  deleteIngredientFromCart: (ingredient: string) => void;
  addRecipeToCart: (recipe: { id: string; amount: number }) => void;
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
  sortBy: "price",
  optimize: false,
  name: null,
  amount: 0,
  selectedIngredient: null,
  selectedIngredients: [],
  selectedProducts: [],
  editSortBy: (sortBy: "price" | "pricePerUnit") => {
    set({
      sortBy: sortBy,
    });
  },
  editOptimize: (optimize: boolean) => {
    set({
      optimize: optimize,
    });
  },
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
  addToSelectedIngredients: (ingredient: NewRecipeIngredient) => {
    set((state) => ({
      selectedIngredients: [...state.selectedIngredients, ingredient],
    }));
  },
  editSelectedIngredients: (ingredients: NewRecipeIngredient[] | undefined) => {
    set({
      selectedIngredients: ingredients,
    });
  },
  addToSelectedProducts: (product: Product & Stock & Price & Preferred) => {
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    }));
  },
  editSelectedProducts: (
    products: (Product & Stock & Price & Preferred)[] | undefined,
  ) => {
    set({
      selectedProducts: products,
    });
  },
  deleteSelectedIngredient: (ingredient: NewRecipeIngredient) => {
    set((state) => ({
      selectedIngredients: state.selectedIngredients.filter(
        (stateIngredient) => stateIngredient !== ingredient,
      ),
    }));
  },
  deleteSelectedProduct: (product: Product & Stock & Price & Preferred) => {
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
  ingredientsInCart: [],
  addIngredientToCart: (
    name: string,
    id: string,
    amount: number,
    unit: string,
    packageAmount: number,
    optimize: boolean,
    storeId: string,
  ) => {
    set((state) => {
      const existingIngredient = state.ingredientsInCart.find(
        (ingredient) => ingredient.id === id,
      );

      if (existingIngredient) {
        const newAmount = existingIngredient.amount + amount;

        if (newAmount <= 0) {
          return {
            ingredientsInCart: state.ingredientsInCart.filter(
              (ingredient) => ingredient.id !== id,
            ),
          };
        }

        return {
          ingredientsInCart: state.ingredientsInCart.map((ingredient) =>
            ingredient.id === id
              ? { ...ingredient, amount: newAmount }
              : ingredient,
          ),
        };
      } else {
        return {
          ingredientsInCart: [
            ...state.ingredientsInCart,
            { name, id, amount, unit, packageAmount, optimize, storeId },
          ],
        };
      }
    });
  },
  deleteIngredientFromCart: (ingredient: string) => {
    set((state) => ({
      ingredientsInCart: state.ingredientsInCart.filter(
        (item) => item.id !== ingredient,
      ),
    }));
  },
  addRecipeToCart: (newRecipe: { id: string; amount: number }) => {
    set((state) => {
      const existingRecipe = state.recipesInCart.some(
        (recipe) => recipe.id === newRecipe.id,
      );
      if (existingRecipe) {
        return {
          recipesInCart: state.recipesInCart.map((recipe) =>
            recipe.id === newRecipe.id
              ? { ...recipe, amount: recipe.amount + newRecipe.amount }
              : recipe,
          ),
        };
      } else {
        return {
          recipesInCart: [...state.recipesInCart, newRecipe],
        };
      }
    });
  },
  deleteRecipeFromCart: (recipe: string) => {
    set((state) => ({
      recipesInCart: state.recipesInCart.filter((item) => item.id !== recipe),
    }));
  },
});
