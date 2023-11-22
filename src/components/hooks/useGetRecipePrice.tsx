import {
  IngredientData,
  NewRecipe,
  Preferred,
  Price,
  Product,
  Stock,
} from "../types.ts";
import { useGetIngredientIds } from "./useGetIngredientsIds.tsx";
import { useMyStore } from "../store/store.tsx";

type NeededProduct = {
  name: string;
  id: string;
  amount: number;
  unit: string;
  packageAmount: number;
};

type Result = {
  totalPrice: number;
  productIds: { id: string; storeId: string }[];
  ingredientData: IngredientData;
  needed: NeededProduct[];
  discount: number;
  saved: number;
};

export const useGetRecipePrice = (recipe: NewRecipe): Result => {
  const ingredientData: IngredientData = useGetIngredientIds(recipe);
  console.log({ ingredientData });
  const { ingredients } = useMyStore();
  let totalPrice = 0;
  let saved = 0;
  const productIds: { id: string; storeId: string }[] = [];
  let overallCheapestProduct: (Stock & Price & Preferred & Product) | undefined;
  let selectedProduct: (Stock & Price & Preferred & Product) | undefined;
  const needed: NeededProduct[] = [];

  try {
    if (ingredientData != null && recipe) {
      recipe.ingredients.forEach(
        (ingredient: { id: string; amount: number }) => {
          const ingredientId = ingredient.id;
          const ingredientAmount = ingredient.amount;
          const ingredientInfo = ingredients.find(
            (ing) => ing.id === ingredient.id,
          );
          if (!ingredientInfo) {
            throw new Error("No matching ingredient.");
          }
          const sortBy = ingredientInfo.sortBy;
          console.log(sortBy);
          const ingredientProducts =
            ingredientData.productsByStoreId[ingredientId];

          const inStockProducts = ingredientProducts.filter((product) =>
            productsInStock(product, ingredientAmount),
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
            const neededAmountOfProduct =
              ingredientAmount / selectedProduct.packageInfo.amount;

            needed.push({
              name: selectedProduct.name,
              id: selectedProduct.id,
              amount: ingredientAmount,
              unit: selectedProduct.packageInfo.unit,
              packageAmount: selectedProduct.packageInfo.amount,
            });

            const amountOfProductsToBuy = Math.ceil(neededAmountOfProduct);
            if (selectedProduct.sales.length > 0) {
              totalPrice +=
                selectedProduct.sales[0].price.amount * amountOfProductsToBuy;
              saved +=
                (selectedProduct.price.amount -
                  selectedProduct.sales[0].price.amount) *
                amountOfProductsToBuy;
            } else {
              totalPrice +=
                selectedProduct.price.amount * amountOfProductsToBuy;
            }
            productIds.push({ id: selectedProduct.id, storeId: ingredientId });
          } else if (overallCheapestProduct !== undefined) {
            const neededAmountOfProduct =
              ingredientAmount / overallCheapestProduct.packageInfo.amount;

            needed.push({
              name: overallCheapestProduct.name,
              id: overallCheapestProduct.id,
              amount: ingredientAmount,
              unit: overallCheapestProduct.packageInfo.unit,
              packageAmount: overallCheapestProduct.packageInfo.amount,
            });

            const amountOfProductsToBuy = Math.ceil(neededAmountOfProduct);

            if (overallCheapestProduct.sales.length > 0) {
              totalPrice +=
                overallCheapestProduct.sales[0].price.amount *
                amountOfProductsToBuy;

              saved +=
                (overallCheapestProduct.price.amount -
                  overallCheapestProduct.sales[0].price.amount) *
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
          // selectedProduct = undefined;
        },
      );
    }

    const discount = calculateDiscountPercentage(saved, totalPrice);

    return { totalPrice, productIds, ingredientData, needed, discount, saved };
  } catch (error) {
    console.error(error);
    return {
      totalPrice: 0,
      productIds: [],
      ingredientData,
      needed: [],
      discount: 0,
      saved: 0,
    };
  }
};

const productsInStock = (
  product: Stock & Price & Preferred & Product,
  ingredientAmount: number,
) => {
  const { tooltips, inStock, packageInfo, maxBasketAmount } = product;

  if (tooltips.length === 0) {
    return inStock && ingredientAmount / packageInfo.amount < maxBasketAmount;
  } else if (tooltips[0].triggerAmount) {
    return (
      inStock &&
      ingredientAmount / packageInfo.amount < tooltips[0].triggerAmount &&
      ingredientAmount / packageInfo.amount < maxBasketAmount
    );
  } else {
    return inStock && ingredientAmount / packageInfo.amount < maxBasketAmount;
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

function calculateDiscountPercentage(
  amountSaved: number,
  priceAfterDiscount: number,
): number {
  return (1 - priceAfterDiscount / (priceAfterDiscount + amountSaved)) * 100;
}
