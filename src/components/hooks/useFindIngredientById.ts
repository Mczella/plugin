import { useMyStore } from "../store/store.tsx";

export const useFindIngredientById = (ingredient: { id: string }) => {
  const { ingredients } = useMyStore();

  return ingredients.find(
    (oneIngredient) => oneIngredient.id === ingredient.id,
  );
};
