import { NewRecipe, NewIngredient } from "./types.ts";
import { useMyStore } from "./store.tsx";
import { fetchPriceAndStock } from "./Api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  preferred?: boolean | undefined;
  price: {
    amount: number;
  };
  inStock: boolean;
};

type IngredientData = null | {
  productsByStoreId: {
    [storeId: string]: Product[];
  };
  ingredientIds: {
    [storeId: string]: string[];
  };
};

export const useGetIngredientIds = (recipe: NewRecipe) => {
  const { ingredients } = useMyStore();
  const ingredientIds = getIngredientIds(recipe, ingredients);
  const [ingredientData, setIngredientData] = useState<IngredientData | null>(
    null,
  );

  const { data } = useQuery(["data", recipe.id], () =>
    fetchPriceAndStock(ingredientIds),
  );

  useEffect(() => {
    if (data !== undefined) {
      const updatedIngredientData = { ...data };
      console.log(updatedIngredientData);

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
            data.productsByStoreId[storeId] = data.productsByStoreId[
              storeId
            ].map((product: { id: string }) => ({
              ...product,
              preferred:
                selectedProductPreferences[storeId][product.id] || false,
            }));
          }
        });
      });

      setIngredientData(updatedIngredientData);
    }
  }, [data]);

  return ingredientData;
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
