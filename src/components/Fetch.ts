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

  return Object.fromEntries(
    productIds.map((id: number, index: number) => [
      id,
      {
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
};

// Nutricni hodnoty
// https://www.rohlik.cz/api/v1/products/1317317/composition
