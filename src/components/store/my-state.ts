import { StateCreator } from "zustand";
import {
  NewIngredient,
  NewRecipe,
  NewRecipeIngredient,
  RohlikProduct,
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
  step: 1 | 2;
  editStep: (step: 1 | 2) => void;
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
  selectedProducts: RohlikProduct[];
  selectedBoughtOften: NewIngredient[];
  selectIngredient: (ingredient: NewIngredient | null) => void;
  addToSelectedIngredients: (ingredient: NewRecipeIngredient) => void;
  editSelectedIngredients: (
    ingredients: NewRecipeIngredient[] | undefined,
  ) => void;
  addToSelectedProducts: (product: RohlikProduct) => void;
  editSelectedProducts: (products: RohlikProduct[] | undefined) => void;
  deleteSelectedProduct: (product: RohlikProduct) => void;
  addToSelectedBoughtOften: (ingredient: NewIngredient) => void;
  editSelectedBoughtOften: (ingredients: NewIngredient[]) => void;
  deleteSelectedBoughtOften: (ingredient: NewIngredient) => void;
  deleteSelectedIngredient: (ingredient: NewRecipeIngredient) => void;
}

export interface MyRecipesInCartState {
  recipesInCart: { id: string; amount: number }[];
  ingredientsInCart: {
    name: string;
    id: RohlikProduct["id"];
    amount: number;
    unit: string;
    packageAmount: number;
    optimize: boolean;
    storeId: string;
    amountInCart: number;
  }[];
  addIngredientToCart: (
    name: string,
    id: RohlikProduct["id"],
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
  step: 1,
  sortBy: "price",
  optimize: false,
  name: null,
  amount: 0,
  selectedIngredient: null,
  selectedIngredients: [],
  selectedProducts: [],
  selectedBoughtOften: [],
  editStep: (step: 1 | 2) => {
    set({
      step: step,
    });
  },
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
  addToSelectedProducts: (product: RohlikProduct) => {
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    }));
  },
  editSelectedProducts: (products: RohlikProduct[] | undefined) => {
    set({
      selectedProducts: products,
    });
  },
  addToSelectedBoughtOften: (ingredient: NewIngredient) => {
    set((state) => ({
      selectedBoughtOften: [...state.selectedBoughtOften, ingredient],
    }));
  },
  editSelectedBoughtOften: (ingredients: NewIngredient[] | undefined) => {
    set({
      selectedBoughtOften: ingredients,
    });
  },
  deleteSelectedBoughtOften: (ingredient: NewIngredient) => {
    set((state) => ({
      selectedBoughtOften: state.selectedBoughtOften.filter(
        (stateProduct) => stateProduct !== ingredient,
      ),
    }));
  },
  deleteSelectedIngredient: (ingredient: NewRecipeIngredient) => {
    set((state) => ({
      selectedIngredients: state.selectedIngredients.filter(
        (stateIngredient) => stateIngredient !== ingredient,
      ),
    }));
  },
  deleteSelectedProduct: (product: RohlikProduct) => {
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
    id: RohlikProduct["id"],
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
      const amountInCart = Math.ceil(amount / packageAmount);

      if (existingIngredient) {
        const newAmount = existingIngredient.amount + amount;
        const calculatedAmount = Math.ceil(newAmount / packageAmount);

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
              ? {
                  ...ingredient,
                  amount: newAmount,
                  amountInCart: calculatedAmount,
                }
              : ingredient,
          ),
        };
      } else {
        return {
          ingredientsInCart: [
            ...state.ingredientsInCart,
            {
              name,
              id,
              amount,
              unit,
              packageAmount,
              optimize,
              storeId,
              amountInCart,
            },
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
