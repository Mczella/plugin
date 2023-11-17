import {
  IngredientData,
  NewRecipe,
  Preferred,
  Price,
  Product,
  Stock,
} from "../types.ts";
import { useGetIngredientIds } from "./useGetIngredientsIds.tsx";

export const useGetRecipePrice = (recipe: NewRecipe) => {
  const ingredientData: IngredientData = useGetIngredientIds(recipe);
  // const { ingredients } = useMyStore();
  console.log({ ingredientData });
  let totalPrice = 0;
  const productIds: { id: string; storeId: string }[] = [];
  let overallCheapestProduct: (Stock & Price & Preferred & Product) | undefined;
  let selectedProduct: (Stock & Price & Preferred & Product) | undefined;
  const needed: {
    name: string;
    id: string;
    amount: number;
    unit: string;
    packageAmount: number;
  }[] = [];
  try {
    if (ingredientData != null && recipe) {
      recipe.ingredients.forEach(
        (ingredient: { id: string; amount: number }) => {
          console.log("ing", ingredient);
          // const getPrice = ingredients.find((ing) => ing.id === ingredient.id);
          const ingredientId = ingredient.id;
          const ingredientAmount = ingredient.amount;
          const ingredientProducts =
            ingredientData.productsByStoreId[ingredientId];

          if (ingredientProducts && ingredientProducts.length > 0) {
            const preferredProduct = ingredientProducts.filter(
              (product) => product.preferred,
            );

            console.log({ preferredProduct });
            const inStockProducts = ingredientProducts.filter((product) =>
              product.tooltips.length === 0
                ? product.inStock &&
                  ingredientAmount / product.packageInfo.amount <
                    product.maxBasketAmount
                : product.tooltips[0].triggerAmount
                ? product.inStock &&
                  ingredientAmount / product.packageInfo.amount <
                    product.tooltips[0].triggerAmount &&
                  ingredientAmount / product.packageInfo.amount <
                    product.maxBasketAmount
                : product.inStock &&
                  ingredientAmount / product.packageInfo.amount <
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
                (product) => product.sales.length > 0,
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
            const neededAmountOfProduct =
              ingredientAmount / selectedProduct.packageInfo.amount;
            console.log(neededAmountOfProduct);
            needed.push({
              name: selectedProduct.name,
              id: selectedProduct.id,
              amount: ingredientAmount,
              unit: selectedProduct.packageInfo.unit,
              packageAmount: selectedProduct.packageInfo.amount,
            });
            const amountOfProductsToBuy = Math.ceil(neededAmountOfProduct);
            console.log(amountOfProductsToBuy);
            totalPrice += selectedProduct.price.amount * amountOfProductsToBuy;
            productIds.push({ id: selectedProduct.id, storeId: ingredientId });
          } else if (overallCheapestProduct != undefined) {
            const neededAmountOfProduct =
              ingredientAmount / overallCheapestProduct.packageInfo.amount;
            console.log(neededAmountOfProduct);
            needed.push({
              name: overallCheapestProduct.name,
              id: overallCheapestProduct.id,
              amount: ingredientAmount,
              unit: overallCheapestProduct.packageInfo.unit,
              packageAmount: overallCheapestProduct.packageInfo.amount,
            });
            const amountOfProductsToBuy = Math.ceil(neededAmountOfProduct);
            console.log(amountOfProductsToBuy);
            if (overallCheapestProduct.sales.length > 0) {
              totalPrice +=
                overallCheapestProduct.sales[0].price.amount *
                amountOfProductsToBuy;
              productIds.push({
                id: overallCheapestProduct.id,
                storeId: ingredientId,
              });
            } else {
              totalPrice +=
                overallCheapestProduct.price.amount * amountOfProductsToBuy;
              productIds.push({
                id: overallCheapestProduct.id,
                storeId: ingredientId,
              });
            }
          }
          selectedProduct = undefined;
        },
      );
    }

    return { totalPrice, productIds, ingredientData, needed };
  } catch (error) {
    return { totalPrice: 0, productIds: [] };
  }
};
