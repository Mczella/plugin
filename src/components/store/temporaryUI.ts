import { NewIngredient, NewRecipeIngredient, RohlikProduct } from "../types.ts";
import { StateCreator } from "zustand";

interface MyTemporaryUIActions {
  editStep: (step: 1 | 2) => void;
  editSortBy: (sortBy: "price" | "pricePerUnit") => void;
  editOptimize: (optimize: boolean) => void;
  editAmount: (amount: number) => void;
  editName: (name: string | null) => void;
  selectIngredient: (ingredient: NewIngredient | null) => void;
  addToSelectedIngredients: (ingredient: NewRecipeIngredient) => void;
  editSelectedIngredients: (
    ingredients: NewRecipeIngredient[] | undefined,
  ) => void;
  addToSelectedProducts: (product: RohlikProduct) => void;
  editSelectedProducts: (products: RohlikProduct[] | undefined) => void;
  deleteSelectedProduct: (product: RohlikProduct) => void;
  addToSelectedBoughtOften: (ingredient: {
    id: NewIngredient["id"];
    amount: number;
    frequency: number;
  }) => void;
  editSelectedBoughtOften: (
    ingredients: {
      id: NewIngredient["id"];
      amount: number;
      frequency: number;
    }[],
  ) => void;
  deleteSelectedIngredient: (ingredient: NewRecipeIngredient) => void;
}
interface MyTemporaryUIState {
  step: 1 | 2;
  sortBy: "price" | "pricePerUnit";

  optimize: boolean;
  amount: number;

  name: string | null;
  selectedIngredient: NewIngredient | null;
  selectedIngredients: NewRecipeIngredient[];
  selectedProducts: RohlikProduct[];
  selectedBoughtOften: {
    id: NewIngredient["id"];
    amount: number;
    frequency: number;
  }[];
}

const initialTemporaryUIState: MyTemporaryUIState = {
  step: 1,
  sortBy: "price",
  optimize: false,
  name: null,
  amount: 0,
  selectedIngredient: null,
  selectedIngredients: [],
  selectedProducts: [],
  selectedBoughtOften: [],
};

export const createTemporaryUISlice: StateCreator<
  MyTemporaryUIState & MyTemporaryUIActions,
  [],
  [],
  MyTemporaryUIState & MyTemporaryUIActions
> = (set) => ({
  ...initialTemporaryUIState,
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
  addToSelectedBoughtOften: (ingredient: {
    id: NewIngredient["id"];
    amount: number;
    frequency: number;
  }) => {
    set((state) => ({
      selectedBoughtOften: [...state.selectedBoughtOften, ingredient],
    }));
  },
  editSelectedBoughtOften: (
    ingredients:
      | { id: NewIngredient["id"]; amount: number; frequency: number }[]
      | undefined,
  ) => {
    set({
      selectedBoughtOften: ingredients,
    });
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
