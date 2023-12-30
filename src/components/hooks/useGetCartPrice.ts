import { NewIngredient, IngredientData, RohlikProduct } from "../types.ts";
import { useMyStore } from "../store/store.tsx";
import { fetchPriceAndStock } from "../api/api.ts";
import { useQuery } from "@tanstack/react-query";
import {
  calculateDiscountPercentage,
  filterProductsWithoutSales,
  filterProductsWithSales,
  findCheapestNormalProduct,
  findCheapestSalesProduct,
  findPreferredProduct,
  getOverallCheapestProduct,
} from "../utils/utils.ts";

interface ExtendedIngredient extends NewIngredient {
  amountInCart: number;
}
export const useGetCartPrice = (
  ingredientsInCart: {
    name: string;
    id: RohlikProduct["id"];
    amount: number;
    unit: string;
    packageAmount: number;
    optimize: boolean;
    storeId: string;
    amountInCart: number;
  }[],
) => {
  const getIngredientIds = (ingredients: NewIngredient[]) => {
    const ingredientIds: { [key: string]: string[] } = {};

    ingredients.forEach((ingredient) => {
      ingredientIds[ingredient.id] = ingredient.selectedProducts.map(
        (product) => product.id,
      );
    });

    return ingredientIds;
  };
  const { ingredients } = useMyStore();

  const myIngredients: ExtendedIngredient[] = [];

  ingredients.forEach((ingredient) => {
    ingredientsInCart.forEach((ingredientInCart) => {
      if (ingredient.id === ingredientInCart.storeId) {
        myIngredients.push({
          ...ingredient,
          amountInCart: ingredientInCart.amountInCart,
        });
      }
    });
  });

  console.log(myIngredients, "moje");

  const ingredientIds = getIngredientIds(myIngredients);

  const { data } = useQuery(["data"], () => fetchPriceAndStock(ingredientIds));

  console.log("hellop", data);
  if (!data) {
    return null;
  }

  const ingredientData: IngredientData = { ...data };

  const selectedProductPreferences: {
    [key: string]: { [key: string]: boolean | undefined };
  } = {};

  if (myIngredients) {
    myIngredients.forEach((ingredientItem) => {
      const productPreferences: { [key: string]: boolean | undefined } = {};

      ingredientItem.selectedProducts.forEach((product) => {
        productPreferences[product.id] = product.preferred;
      });

      selectedProductPreferences[ingredientItem.id] = productPreferences;

      Object.keys(data.productsByStoreId).forEach((storeId) => {
        if (storeId === ingredientItem.id) {
          data.productsByStoreId[storeId] = data.productsByStoreId[storeId].map(
            (product: { id: string }) => ({
              ...product,
              preferred:
                selectedProductPreferences[storeId][product.id] || false,
            }),
          );
        }
      });
    });
  }

  let totalPrice = 0;
  let saved = 0;
  const productInfo: {
    id: string;
    storeId: string;
    name: string;
    packageInfo: { amount: number; unit: string };
    image: string;
    textualAmount: string;
  }[] = [];
  let overallCheapestProduct: RohlikProduct | undefined;
  let selectedProduct: RohlikProduct | undefined;
  try {
    if (myIngredients) {
      myIngredients.forEach(
        (ingredient: {
          id: string;
          amountInCart: number;
          sortBy: "price" | "pricePerUnit";
        }) => {
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
            if (
              selectedProduct.sales.length > 0 &&
              selectedProduct.sales[0].type !== "expiration"
            ) {
              totalPrice +=
                selectedProduct.sales[0].price.amount * ingredient.amountInCart;
              saved +=
                selectedProduct.price.amount -
                selectedProduct.sales[0].price.amount;
              productInfo.push({
                id: selectedProduct.id,
                storeId: ingredientId,
                name: selectedProduct.name,
                packageInfo: selectedProduct.packageInfo,
                image: selectedProduct.image,
                textualAmount: selectedProduct.textualAmount,
              });
            } else {
              totalPrice +=
                selectedProduct.price.amount * ingredient.amountInCart;
              productInfo.push({
                id: selectedProduct.id,
                storeId: ingredientId,
                name: selectedProduct.name,
                packageInfo: selectedProduct.packageInfo,
                image: selectedProduct.image,
                textualAmount: selectedProduct.textualAmount,
              });
            }
          } else if (overallCheapestProduct !== undefined) {
            if (
              overallCheapestProduct.sales.length > 0 &&
              overallCheapestProduct.sales[0].type !== "expiration"
            ) {
              totalPrice +=
                overallCheapestProduct.sales[0].price.amount *
                ingredient.amountInCart;
              saved +=
                overallCheapestProduct.price.amount -
                overallCheapestProduct.sales[0].price.amount;
              productInfo.push({
                id: overallCheapestProduct.id,
                storeId: ingredientId,
                name: overallCheapestProduct.name,
                packageInfo: overallCheapestProduct.packageInfo,
                image: overallCheapestProduct.image,
                textualAmount: overallCheapestProduct.textualAmount,
              });
            } else {
              totalPrice +=
                overallCheapestProduct.price.amount * ingredient.amountInCart;

              productInfo.push({
                id: overallCheapestProduct.id,
                storeId: ingredientId,
                name: overallCheapestProduct.name,
                packageInfo: overallCheapestProduct.packageInfo,
                image: overallCheapestProduct.image,
                textualAmount: overallCheapestProduct.textualAmount,
              });
            }
          }
        },
      );
    }
    const discount = calculateDiscountPercentage(saved, totalPrice);
    return { totalPrice, productInfo, saved, discount };
  } catch (error) {
    console.error(error);
    return { totalPrice: 0, productInfo: [], saved: 0, discount: 0 };
  }
};
