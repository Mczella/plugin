import { IngredientData, RohlikProduct } from "../types.ts";

export const productsInStock = (
  product: RohlikProduct,
  ingredientAmount: number,
) => {
  const { tooltips, inStock, packageInfo, maxBasketAmount } = product;

  if (tooltips.length === 0) {
    return inStock && ingredientAmount / packageInfo.amount <= maxBasketAmount;
  } else if (
    tooltips[0].triggerAmount &&
    tooltips[0].type === "PARTLY_SOLD_OUT"
  ) {
    return (
      inStock &&
      ingredientAmount / packageInfo.amount <= tooltips[0].triggerAmount &&
      ingredientAmount / packageInfo.amount <= maxBasketAmount
    );
  } else {
    return inStock && ingredientAmount / packageInfo.amount <= maxBasketAmount;
  }
};

export const findPreferredProduct = (products: RohlikProduct[]) => {
  const preferredProducts = products.filter(
    (product) => product.preferred && product.inStock,
  );
  return preferredProducts.length > 0 ? preferredProducts[0] : undefined;
};
export const filterProductsWithSales = (products: RohlikProduct[]) => {
  return products.filter((product) => product.sales.length > 0);
};

export const filterProductsWithoutSales = (products: RohlikProduct[]) => {
  return products.filter((product) => product.sales.length === 0);
};

export const findCheapestNormalProduct = (
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
export const findCheapestSalesProduct = (
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

export const getOverallCheapestProduct = (
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

export const calculateDiscountPercentage = (
  amountSaved: number,
  priceAfterDiscount: number,
): number =>
  Math.ceil(
    (1 - priceAfterDiscount / (priceAfterDiscount + amountSaved)) * 100,
  );
export const getFilteredIngredientData = (
  productIds: { id: string; storeId: string }[],
  ingredientData: IngredientData | undefined,
) => {
  const products: { [p: string]: RohlikProduct[] } = {};
  if (ingredientData) {
    Object.keys(ingredientData.productsByStoreId).forEach((storeId) => {
      products[storeId] = ingredientData.productsByStoreId[storeId].filter(
        (product: RohlikProduct) =>
          productIds.some(
            (productId) =>
              productId.id === product.id && productId.storeId === storeId,
          ),
      );
    });
  }

  return {
    productsByStoreId: products,
  };
};

export const getEditedPrice = (totalPrice: number) => {
  if (totalPrice > 0) {
    if (totalPrice > 999) {
      return Math.ceil(totalPrice);
    } else {
      return totalPrice.toFixed(1);
    }
  } else {
    return "Vyprodáno";
  }
};
