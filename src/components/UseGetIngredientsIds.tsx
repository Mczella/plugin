import { NewRecipe, NewIngredient } from "./types.ts";
import { useMyStore } from "./store.tsx";
import { fetchPriceAndStock } from "./Api";
import { useQuery } from "@tanstack/react-query";

export const useGetIngredientIds = (recipe: NewRecipe) => {
  const { ingredients } = useMyStore();
  const ingredientIds = getIngredientIds(recipe, ingredients);

  const { data } = useQuery(["data", recipe.id], () =>
    fetchPriceAndStock(ingredientIds),
  );

  return data;
};

const getIngredientIds = (
  recipe: NewRecipe,
  storeIngredients: NewIngredient[],
) => {
  const ingredientIds: { [key: string]: string[] } = {};

  recipe.ingredients.forEach((ingredientId) => {
    const productIds: string[] = [];

    storeIngredients.forEach((storeIngredient: NewIngredient) => {
      if (storeIngredient.id === ingredientId) {
        storeIngredient.selectedProducts.forEach((product) => {
          productIds.push(product.id);
        });
      }
    });

    ingredientIds[ingredientId] = productIds;
  });

  return ingredientIds;
};
