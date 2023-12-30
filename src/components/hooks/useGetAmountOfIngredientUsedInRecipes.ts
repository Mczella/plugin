import { useMyStore } from "../store/store.tsx";
import { NewIngredient } from "../types.ts";
import { useGetIngredientPrice } from "./useGetIngredientPrice.ts";

export const useGetAmountOfIngredientUsedInRecipes = (
  ingredient: NewIngredient,
) => {
  const { recipesInCart, recipes } = useMyStore();
  const { productInfo } = useGetIngredientPrice(ingredient);

  if (productInfo.length === 0) {
    return;
  }

  return Math.ceil(
    recipesInCart.reduce((acc, recipeInCart) => {
      const matchingRecipe = recipes.find(
        (originalRecipe) => recipeInCart.id === originalRecipe.id,
      );

      if (matchingRecipe) {
        const matchingIngredient = matchingRecipe.ingredients.find(
          (ing) => ing.id === ingredient.id,
        );

        if (matchingIngredient) {
          return (
            acc +
            (matchingIngredient.amount * recipeInCart.amount) /
              productInfo[0].packageInfo.amount
          );
        }
      }

      return acc;
    }, 0),
  );
};
