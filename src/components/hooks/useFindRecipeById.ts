import { useMyStore } from "../store/store.tsx";

export const useFindRecipeById = (recipe: { id: string; amount: number }) => {
  const { recipes } = useMyStore();

  return recipes.find((oneRecipe) => oneRecipe.id === recipe.id);
};
