import { IngredientData, NewIngredient, RohlikProduct } from "../types.ts";
import { useGetIngredientIds } from "./useGetIngredientsIds.tsx";

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

const findPreferredProduct = (products: RohlikProduct[]) => {
  const preferredProducts = products.filter(
    (product) => product.preferred && product.inStock,
  );
  return preferredProducts.length > 0 ? preferredProducts[0] : undefined;
};

const filterProductsWithSales = (products: RohlikProduct[]) => {
  return products.filter((product) => product.sales.length > 0);
};

const filterProductsWithoutSales = (products: RohlikProduct[]) => {
  return products.filter((product) => product.sales.length === 0);
};

const findCheapestNormalProduct = (
  products: RohlikProduct[],
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
  products: RohlikProduct[],
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
  withSales: RohlikProduct | undefined,
  withoutSales: RohlikProduct | undefined,
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
