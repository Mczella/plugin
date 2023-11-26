import { IngredientData, NewIngredient, RohlikProduct } from "../types.ts";
import { useGetIngredientIds } from "./useGetIngredientsIds.tsx";
import {
  filterProductsWithoutSales,
  filterProductsWithSales,
  findCheapestNormalProduct,
  findCheapestSalesProduct,
  findPreferredProduct,
  getOverallCheapestProduct,
} from "../utils/utils.ts";

export const useGetIngredientPrice = (ingredient: NewIngredient) => {
  const ingredientData: IngredientData = useGetIngredientIds(ingredient);
  console.log({ ingredientData });
  let totalPrice = 0;
  const productInfo: {
    id: string;
    storeId: string;
    name: string;
    packageInfo: { amount: number; unit: string };
  }[] = [];
  let overallCheapestProduct: RohlikProduct | undefined;
  let selectedProduct: RohlikProduct | undefined;
  try {
    if (ingredientData != null && ingredient) {
      const ingredientId = ingredient.id;
      const sortBy = ingredient.sortBy;
      const ingredientProducts =
        ingredientData.productsByStoreId[ingredient.id];

      const inStockProducts = ingredientProducts.filter(
        (product) => product.inStock,
      );

      const preferredProduct = findPreferredProduct(ingredientProducts);
      if (preferredProduct) {
        selectedProduct = preferredProduct;
      }

      if (inStockProducts.length > 0) {
        const productsWithSales = filterProductsWithSales(inStockProducts);
        const productsWithoutSales =
          filterProductsWithoutSales(inStockProducts);

        const cheapestProductWithSales = findCheapestSalesProduct(
          productsWithSales,
          sortBy,
        );
        console.log(cheapestProductWithSales);
        const cheapestProductWithoutSales = findCheapestNormalProduct(
          productsWithoutSales,
          sortBy,
        );
        console.log(cheapestProductWithoutSales);
        overallCheapestProduct = getOverallCheapestProduct(
          cheapestProductWithSales,
          cheapestProductWithoutSales,
          sortBy,
        );
        console.log(overallCheapestProduct);
      } else {
        throw new Error("Všechny alternativy vyprodány.");
      }

      if (selectedProduct) {
        totalPrice += selectedProduct.price.amount;
        productInfo.push({
          id: selectedProduct.id,
          storeId: ingredientId,
          name: selectedProduct.name,
          packageInfo: selectedProduct.packageInfo,
        });
      } else if (overallCheapestProduct !== undefined) {
        if (overallCheapestProduct.sales.length > 0) {
          totalPrice += overallCheapestProduct.sales[0].price.amount;
          productInfo.push({
            id: overallCheapestProduct.id,
            storeId: ingredientId,
            name: overallCheapestProduct.name,
            packageInfo: overallCheapestProduct.packageInfo,
          });
        } else {
          totalPrice += overallCheapestProduct.price.amount;

          productInfo.push({
            id: overallCheapestProduct.id,
            storeId: ingredientId,
            name: overallCheapestProduct.name,
            packageInfo: overallCheapestProduct.packageInfo,
          });
        }
      }
    }

    return { totalPrice, productInfo };
  } catch (error) {
    console.error(error);
    return { totalPrice: 0, productInfo: [] };
  }
};
