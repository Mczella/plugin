import { RohlikProduct } from "../types.ts";

export const fetchData = async (searchQuery: string) => {
  const url = `https://www.rohlik.cz/services/frontend-service/autocomplete?search=${searchQuery}&referer=whisperer&companyId=1&limit=20`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error");
  }

  const data = await response.json();

  return data.productIds;
};

export const fetchProducts = async (productIds: string[]) => {
  const url = `https://www.rohlik.cz/api/v1/products?products=${productIds.join(
    "&products=",
  )}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error");
  }

  return response.json();
};

export const fetchStock = async (productIds: string[]) => {
  const url = `https://www.rohlik.cz/api/v1/products/stock?products=${productIds.join(
    "&products=",
  )}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error");
  }

  return response.json();
};

export const fetchPrices = async (productIds: string[]) => {
  const url = `https://www.rohlik.cz/api/v1/products/prices?products=${productIds.join(
    "&products=",
  )}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error");
  }

  return response.json();
};

export const fetchAll = async (query: string) => {
  const productIds = await fetchData(query);

  const [products, prices, stock] = await Promise.all([
    fetchProducts(productIds),
    fetchPrices(productIds),
    fetchStock(productIds),
  ]);

  const productsByIds = Object.fromEntries(
    productIds.map((id: string, index: number) => [
      id,
      {
        id: products[index].id,
        name: products[index].name,
        unit: products[index].unit,
        textualAmount: products[index].textualAmount,
        badges: products[index].badges,
        image: products[index].images[0],
        price: prices[index].price,
        pricePerUnit: prices[index].pricePerUnit,
        sales: prices[index].sales,
        packageInfo: stock[index].packageInfo,
        inStock: stock[index].inStock,
        tooltips: stock[index].tooltips,
        maxBasketAmount: stock[index].maxBasketAmount,
      },
    ]),
  );

  return { productsByIds, productIds };
};

export const fetchProductsDetails = async (
  productIds: RohlikProduct["id"][],
) => {
  const [products, prices, stock] = await Promise.all([
    fetchProducts(productIds),
    fetchPrices(productIds),
    fetchStock(productIds),
  ]);

  const productsByIds = Object.fromEntries(
    productIds.map((id: string, index: number) => [
      id,
      {
        id: products[index].id,
        name: products[index].name,
        unit: products[index].unit,
        textualAmount: products[index].textualAmount,
        badges: products[index].badges,
        image: products[index].images[0],
        price: prices[index].price,
        pricePerUnit: prices[index].pricePerUnit,
        sales: prices[index].sales,
        packageInfo: stock[index].packageInfo,
        inStock: stock[index].inStock,
        tooltips: stock[index].tooltips,
        maxBasketAmount: stock[index].maxBasketAmount,
      },
    ]),
  );

  return { productsByIds, productIds };
};

export const fetchPriceAndStock = async (ingredientIds: {
  [key: string]: string[];
}) => {
  const promises = Object.entries(ingredientIds).map(
    async ([storeId, productIds]) => {
      const [prices, stock, products] = await Promise.all([
        fetchPrices(productIds),
        fetchStock(productIds),
        fetchProducts(productIds),
      ]);

      const productsForStoreId = productIds.map((productId, index) => ({
        id: productId,
        price: prices[index].price,
        pricePerUnit: prices[index].pricePerUnit,
        sales: prices[index].sales,
        packageInfo: stock[index].packageInfo,
        inStock: stock[index].inStock,
        name: products[index].name,
        unit: products[index].unit,
        textualAmount: products[index].textualAmount,
        badges: products[index].badges,
        image: products[index].images[0],
        tooltips: stock[index].tooltips,
        maxBasketAmount: stock[index].maxBasketAmount,
      }));

      return {
        [storeId]: productsForStoreId,
      };
    },
  );

  const productsByStoreId = await Promise.all(promises);

  const mergedProducts = Object.assign({}, ...productsByStoreId);

  return { productsByStoreId: mergedProducts, ingredientIds };
};

export const fetchDeliveredIds = async (limit: number) => {
  const url = `https://www.rohlik.cz/api/v3/orders/delivered?offset=0&limit=${limit}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error");
  }

  return await response.json();
};

export const fetchDeliveredProduct = async (id: number) => {
  const url = `https://www.rohlik.cz/api/v3/orders/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error");
  }

  return await response.json();
};

export const fetchDelivered = async () => {
  const ids: { id: number }[] = await fetchDeliveredIds(30);

  const deliveredProducts = ids.map((product) =>
    fetchDeliveredProduct(product.id),
  );

  try {
    return await Promise.all(deliveredProducts);
  } catch (error) {
    console.log("An error has occured: ", error);
  }
};

export const fetchComposition = async (id: string) => {
  const url = `https://www.rohlik.cz/api/v1/products/${id}/composition`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching composition for id: ${id}`);
  }

  return await response.json();
};
