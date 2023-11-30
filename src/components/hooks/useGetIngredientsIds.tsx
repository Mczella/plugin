import { NewRecipe, NewIngredient, IngredientData } from "../types.ts";
import { useMyStore } from "../store/store.tsx";
import { fetchPriceAndStock } from "../api/api.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetIngredientIds = (product: NewRecipe | NewIngredient) => {
  const { ingredients } = useMyStore();

  const isNewRecipeType = (
    product: NewRecipe | NewIngredient,
  ): product is NewRecipe => {
    return (product as NewRecipe).ingredients !== undefined;
  };

  const ingredientIds = isNewRecipeType(product)
    ? getRecipeIngredientIds(product, ingredients)
    : getIngredientIds(product);

  const { data } = useQuery(["data", product.id], () =>
    fetchPriceAndStock(ingredientIds),
  );
  if (!data) {
    return null;
  }

  const updatedIngredientData: IngredientData = { ...data };
  console.log({ updatedIngredientData });

  let selectedProductPreferences: {
    [key: string]: { [key: string]: boolean | undefined };
  } = {};

  ingredients.forEach((ingredientItem) => {
    let productPreferences: { [key: string]: boolean | undefined } = {};

    ingredientItem.selectedProducts.forEach((product) => {
      productPreferences[product.id] = product.preferred;
    });

    selectedProductPreferences[ingredientItem.id] = productPreferences;

    Object.keys(data.productsByStoreId).forEach((storeId) => {
      if (storeId === ingredientItem.id) {
        data.productsByStoreId[storeId] = data.productsByStoreId[storeId].map(
          (product: { id: string }) => ({
            ...product,
            preferred: selectedProductPreferences[storeId][product.id] || false,
          }),
        );
      }
    });
  });

  console.log({ updatedIngredientData });
  return updatedIngredientData;
};

const getRecipeIngredientIds = (
  recipe: NewRecipe,
  storeIngredients: NewIngredient[],
) => {
  const ingredientIds: { [key: string]: string[] } = {};

  recipe.ingredients.forEach((ingredient) => {
    const productIds: string[] = [];

    storeIngredients.forEach((storeIngredient) => {
      if (storeIngredient.id === ingredient.id) {
        storeIngredient.selectedProducts.forEach((product) => {
          productIds.push(product.id);
        });
      }
    });

    ingredientIds[ingredient.id] = productIds;
  });

  return ingredientIds;
};

const getIngredientIds = (ingredient: NewIngredient) => {
  const ingredientIds: { [key: string]: string[] } = {};

  ingredientIds[ingredient.id] = ingredient.selectedProducts.map(
    (product) => product.id,
  );

  return ingredientIds;
};
