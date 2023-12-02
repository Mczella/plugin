import { useMyStore } from "../store/store.tsx";
import { NewIngredient } from "../types.ts";

export const useGetAmountOfIngredientUsedInRecipes = (
  ingredient: NewIngredient,
) => {
  const { recipesInCart, recipes } = useMyStore();
  const amountNeeded = recipesInCart.map((recipe) => {
    const recipeInCart = recipes.find(
      (originalRecipe) => recipe.id === originalRecipe.id,
    );

    if (recipeInCart) {
      const matchingIngredient = recipeInCart.ingredients.find(
        (ing) => ing.id === ingredient.id,
      );
      if (matchingIngredient) {
        return Math.ceil(matchingIngredient.amount * recipe.amount);
      }
    }

    return null;
  });

  return amountNeeded.reduce((acc: number, current) => {
    if (current !== null) {
      return acc + current;
    } else {
      return acc;
    }
  }, 0);
};
