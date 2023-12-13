import { StateCreator } from "zustand";
import { RohlikProduct } from "../types.ts";

interface MyInCartActions {
  addRecipeToCart: (recipe: { id: string; amount: number }) => void;
  deleteRecipeFromCart: (recipe: string) => void;
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
}

interface MyInCartState {
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
}

const initialInCartState: MyInCartState = {
  recipesInCart: [],
  ingredientsInCart: [],
};

export const createInCartSlice: StateCreator<
  MyInCartState & MyInCartActions,
  [],
  [],
  MyInCartState & MyInCartActions
> = (set) => ({
  ...initialInCartState,
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
