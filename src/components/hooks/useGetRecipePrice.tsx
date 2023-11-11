import { IngredientData, NewRecipe, Product } from "../types.ts";
import { useGetIngredientIds } from "./useGetIngredientsIds.tsx";

export const useGetRecipePrice = (recipe: NewRecipe) => {
  const ingredientData: IngredientData = useGetIngredientIds(recipe);
  console.log({ ingredientData });
  let totalPrice = 0;
  const productIds: string[] = [];
  let overallCheapestProduct: Product | undefined;
  let selectedProduct: Product | undefined;
  try {
    if (ingredientData != null && recipe) {
      recipe.ingredients.forEach(
        (ingredient: { id: string; amount: number }) => {
          console.log({ ingredient });
          const ingredientId = ingredient.id;
          const ingredientAmount = ingredient.amount;
          const ingredientProducts =
            ingredientData.productsByStoreId[ingredientId];

          console.log({ ingredientProducts });

          if (ingredientProducts && ingredientProducts.length > 0) {
            const preferredProduct = ingredientProducts.filter(
              (product) => product.preferred,
            );

            console.log({ preferredProduct });
            const inStockProducts = ingredientProducts.filter((product) =>
              product.tooltips.length === 0
                ? product.inStock &&
                  ingredientAmount / product.packageInfo!.amount <
                    product.maxBasketAmount
                : product.tooltips[0].triggerAmount
                ? product.inStock &&
                  ingredientAmount / product.packageInfo!.amount <
                    product.tooltips[0].triggerAmount &&
                  ingredientAmount / product.packageInfo!.amount <
                    product.maxBasketAmount
                : product.inStock &&
                  ingredientAmount / product.packageInfo!.amount <
                    product.maxBasketAmount,
            );
            console.log({ inStockProducts });

            if (
              preferredProduct.length > 0 &&
              preferredProduct.some((product) => product.inStock)
            ) {
              selectedProduct = preferredProduct.find(
                (product) => product.inStock,
              );
            } else if (inStockProducts.length > 0) {
              const productsWithSales = inStockProducts.filter(
                (product) => product.sales?.length > 0,
              );
              console.log({ productsWithSales });

              const productsWithoutSales = inStockProducts.filter(
                (product) => product.sales.length === 0,
              );
              console.log({ productsWithoutSales });

              let cheapestProductWithSales;
              let cheapestProductWithoutSales;

              if (productsWithSales.length > 0) {
                cheapestProductWithSales = productsWithSales.reduce(
                  (minPriceProduct, product) =>
                    product.sales[0].price.amount <
                    minPriceProduct.sales[0].price.amount
                      ? product
                      : minPriceProduct,
                );
              }
              console.log({ cheapestProductWithSales });

              if (productsWithoutSales.length > 0) {
                cheapestProductWithoutSales = productsWithoutSales.reduce(
                  (minPriceProduct, product) =>
                    product.price.amount < minPriceProduct.price.amount
                      ? product
                      : minPriceProduct,
                );
              }
              console.log({ cheapestProductWithoutSales });
              if (cheapestProductWithSales && cheapestProductWithoutSales) {
                if (
                  cheapestProductWithSales.sales[0].price.amount <
                  cheapestProductWithoutSales.price.amount
                ) {
                  overallCheapestProduct = cheapestProductWithSales;
                } else {
                  overallCheapestProduct = cheapestProductWithoutSales;
                }
              } else if (cheapestProductWithSales) {
                overallCheapestProduct = cheapestProductWithSales;
              } else if (cheapestProductWithoutSales) {
                overallCheapestProduct = cheapestProductWithoutSales;
              } else {
                throw new Error("Všechny alternativy vyprodány.");
              }
            }
            console.log({ overallCheapestProduct });
          }
          if (selectedProduct) {
            const neededAmountOfProducts =
              ingredientAmount / selectedProduct.packageInfo!.amount;
            console.log(neededAmountOfProducts);
            const amountOfProductsToBuy = Math.ceil(neededAmountOfProducts);
            console.log(amountOfProductsToBuy);
            totalPrice += selectedProduct.price.amount * amountOfProductsToBuy;
            productIds.push(selectedProduct.id);
          } else if (overallCheapestProduct != undefined) {
            const neededAmountOfProducts =
              ingredientAmount / overallCheapestProduct.packageInfo!.amount;
            console.log(neededAmountOfProducts);
            const amountOfProductsToBuy = Math.ceil(neededAmountOfProducts);
            console.log(amountOfProductsToBuy);
            if (overallCheapestProduct.sales.length > 0) {
              totalPrice +=
                overallCheapestProduct.sales[0].price.amount *
                amountOfProductsToBuy;
              productIds.push(overallCheapestProduct.id);
            } else {
              totalPrice +=
                overallCheapestProduct.price.amount * amountOfProductsToBuy;
              productIds.push(overallCheapestProduct.id);
            }
          }
          selectedProduct = undefined;
        },
      );
    }

    return { totalPrice, productIds, ingredientData };
  } catch (error) {
    return { totalPrice: 0, productIds: [] };
  }
};
