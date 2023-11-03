import { NewRecipe } from "../types.ts";
import { useGetIngredientIds } from "./useGetIngredientsIds.tsx";

type Product = {
  id: string;
  preferred?: boolean | undefined;
  price: {
    amount: number;
    currency: string;
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

export const useGetRecipePrice = (recipe: NewRecipe) => {
  const ingredientData: IngredientData = useGetIngredientIds(recipe);
  let totalPrice = 0;
  const productIds: string[] = [];
  try {
    if (ingredientData != null && recipe) {
      recipe.ingredients.forEach((ingredientId: string) => {
        const ingredientProducts =
          ingredientData.productsByStoreId[ingredientId];

        if (ingredientProducts && ingredientProducts.length > 0) {
          const preferredProducts = ingredientProducts.filter(
            (product) => product.preferred,
          );
          const inStockProducts = ingredientProducts.filter(
            (product) => product.inStock,
          );

          let selectedProduct: Product | undefined;

          if (
            preferredProducts.length > 0 &&
            preferredProducts.some((product) => product.inStock)
          ) {
            selectedProduct = preferredProducts.find(
              (product) => product.inStock,
            );
          } else if (inStockProducts.length > 0) {
            selectedProduct = inStockProducts.reduce(
              (minPriceProduct, product) =>
                product.price.amount < minPriceProduct.price.amount
                  ? product
                  : minPriceProduct,
            );
          }

          if (!selectedProduct) {
            throw new Error("Všechny alternativy vyprodány.");
          }

          totalPrice += selectedProduct.price.amount;
          productIds.push(selectedProduct.id);
        }
      });
    }

    return { totalPrice, productIds, ingredientData };
  } catch (error) {
    return { totalPrice: 0, productIds: [] };
  }
};
