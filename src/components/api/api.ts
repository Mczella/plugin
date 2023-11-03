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

// DO NOT FETCH, only needed when getting ingredients for a specific recipe before checkout
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

  console.log(productIds);

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

// Nutricni hodnoty
// https://www.rohlik.cz/api/v1/products/1317317/composition
