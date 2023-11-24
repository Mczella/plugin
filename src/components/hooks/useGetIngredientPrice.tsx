import {
  IngredientData,
  NewIngredient,
  Preferred,
  Price,
  Product,
  Stock,
} from "../types.ts";
import { useGetIngredientIds } from "./useGetIngredientsIds.tsx";

export const useGetIngredientPrice = (ingredient: NewIngredient) => {
  const ingredientData: IngredientData = useGetIngredientIds(ingredient);
  console.log({ ingredientData });
  let totalPrice = 0;
  const productIds: { id: string; storeId: string }[] = [];
  let overallCheapestProduct: (Stock & Price & Preferred & Product) | undefined;
  let selectedProduct: (Stock & Price & Preferred & Product) | undefined;
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
        productIds.push({ id: selectedProduct.id, storeId: ingredientId });
      } else if (overallCheapestProduct !== undefined) {
        if (overallCheapestProduct.sales.length > 0) {
          totalPrice += overallCheapestProduct.sales[0].price.amount;
          productIds.push({
            id: overallCheapestProduct.id,
            storeId: ingredientId,
          });
        } else {
          totalPrice += overallCheapestProduct.price.amount;

          productIds.push({
            id: overallCheapestProduct.id,
            storeId: ingredientId,
          });
        }
      }
      selectedProduct = undefined;
    }

    return { totalPrice };
  } catch (error) {
    console.error(error);
    return { totalPrice: 0 };
  }
};

const findPreferredProduct = (
  products: (Stock & Price & Preferred & Product)[],
) => {
  const preferredProducts = products.filter(
    (product) => product.preferred && product.inStock,
  );
  return preferredProducts.length > 0 ? preferredProducts[0] : undefined;
};

const filterProductsWithSales = (
  products: (Stock & Price & Preferred & Product)[],
) => {
  return products.filter((product) => product.sales.length > 0);
};

const filterProductsWithoutSales = (
  products: (Stock & Price & Preferred & Product)[],
) => {
  return products.filter((product) => product.sales.length === 0);
};

const findCheapestNormalProduct = (
  products: (Stock & Price & Preferred & Product)[],
  key: "price" | "pricePerUnit",
) => {
  if (products.length > 0) {
    return products.reduce((minPriceProduct, product) =>
      product[key].amount < minPriceProduct[key].amount
        ? product
        : minPriceProduct,
    );
  }
  return undefined;
};

const findCheapestSalesProduct = (
  products: (Stock & Price & Preferred & Product)[],
  key: "price" | "pricePerUnit",
) => {
  if (products.length > 0) {
    return products.reduce((minPriceProduct, product) =>
      product.sales[0][key].amount < minPriceProduct.sales[0][key].amount
        ? product
        : minPriceProduct,
    );
  }
  return undefined;
};

const getOverallCheapestProduct = (
  withSales: (Stock & Price & Preferred & Product) | undefined,
  withoutSales: (Stock & Price & Preferred & Product) | undefined,
  key: "price" | "pricePerUnit",
) => {
  if (withSales && withoutSales) {
    return withSales.sales[0][key].amount < withoutSales[key].amount
      ? withSales
      : withoutSales;
  } else if (withSales) {
    return withSales;
  } else if (withoutSales) {
    return withoutSales;
  } else {
    throw new Error("Všechny alternativy vyprodány.");
  }
};
