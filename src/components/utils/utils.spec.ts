import {
  calculateDiscountPercentage,
  filterProductsWithoutSales,
  filterProductsWithSales,
  findCheapestNormalProduct,
  findCheapestSalesProduct,
  findPreferredProduct,
  getFilteredIngredientData,
  getOverallCheapestProduct,
  productsInStock,
} from "./utils.ts";
import {
  IngredientData as OriginalIngredientData,
  RohlikProduct,
  Tooltips,
} from "../types.ts";

type PartialRohlikProduct = Partial<{
  id: string;
  name: string;
  unit: string;
  textualAmount: string;
  badges: string;
  image: string;
  pricePerUnit: {
    amount: number;
    currency: string;
  };
  packageInfo: {
    amount: number;
    unit: string;
  };
  inStock: boolean;
  tooltips: Tooltips;
  maxBasketAmount: number;
  preferred?: boolean;
  price: {
    amount: number;
    currency: string;
  };
  sales: Array<{
    price: {
      amount: number;
      currency: string;
    };
  }>;
}>;

type IngredientData = null | {
  productsByStoreId: {
    [storeId: string]: PartialRohlikProduct[];
  };
  ingredientIds: {
    [storeId: string]: RohlikProduct["id"][];
  };
};

describe("productsInStock function", () => {
  it("should return true if inStock", () => {
    const product: PartialRohlikProduct = {
      tooltips: [],
      inStock: true,
      packageInfo: { amount: 2, unit: "kg" },
      maxBasketAmount: 5,
    };
    const ingredientAmount = 4;

    const result = productsInStock(product as RohlikProduct, ingredientAmount);

    expect(result).toBe(true);
  });

  it("should return true because inStock && ingredientAmount / packageInfo.amount <= maxBasketAmount", () => {
    const product: PartialRohlikProduct = {
      tooltips: [],
      inStock: true,
      packageInfo: { amount: 2, unit: "kg" },
      maxBasketAmount: 3,
    };
    const ingredientAmount = 6;

    const result = productsInStock(product as RohlikProduct, ingredientAmount);

    expect(result).toBe(true);
  });

  it("should return false because inStock && ingredientAmount / packageInfo.amount > maxBasketAmount", () => {
    const product: PartialRohlikProduct = {
      tooltips: [],
      inStock: true,
      packageInfo: { amount: 2, unit: "kg" },
      maxBasketAmount: 2,
    };
    const ingredientAmount = 6;

    const result = productsInStock(product as RohlikProduct, ingredientAmount);

    expect(result).toBe(false);
  });

  it("should return false because triggerAmount: null and inStock && ingredientAmount / packageInfo.amount > maxBasketAmount", () => {
    const product: PartialRohlikProduct = {
      tooltips: [{ type: "xxx", triggerAmount: null }],
      inStock: true,
      packageInfo: { amount: 2, unit: "kg" },
      maxBasketAmount: 2,
    };
    const ingredientAmount = 6;

    const result = productsInStock(product as RohlikProduct, ingredientAmount);

    expect(result).toBe(false);
  });

  it("should return true because triggerAmount: null and inStock && ingredientAmount / packageInfo.amount <= maxBasketAmount", () => {
    const product: PartialRohlikProduct = {
      tooltips: [{ type: "xxx", triggerAmount: null }],
      inStock: true,
      packageInfo: { amount: 2, unit: "kg" },
      maxBasketAmount: 4,
    };
    const ingredientAmount = 6;

    const result = productsInStock(product as RohlikProduct, ingredientAmount);

    expect(result).toBe(true);
  });

  it(
    "should return true because inStock &&\n" +
      "      ingredientAmount / packageInfo.amount <= tooltips[0].triggerAmount &&\n" +
      '      tooltips[0].type === "PARTLY_SOLD_OUT" &&\n' +
      "      ingredientAmount / packageInfo.amount <= maxBasketAmount",
    () => {
      const product: PartialRohlikProduct = {
        tooltips: [{ triggerAmount: 3, type: "PARTLY_SOLD_OUT" }],
        inStock: true,
        packageInfo: { amount: 2, unit: "kg" },
        maxBasketAmount: 3,
      };
      const ingredientAmount = 6;

      const result = productsInStock(
        product as RohlikProduct,
        ingredientAmount,
      );

      expect(result).toBe(true);
    },
  );

  it(
    'should return false because tooltips[0].type === "PARTLY_SOLD_OUT" and  inStock &&\n' +
      "      ingredientAmount / packageInfo.amount > tooltips[0].triggerAmount &&\n" +
      "      ingredientAmount / packageInfo.amount <= maxBasketAmount",
    () => {
      const product: PartialRohlikProduct = {
        tooltips: [{ triggerAmount: 2, type: "PARTLY_SOLD_OUT" }],
        inStock: true,
        packageInfo: { amount: 2, unit: "kg" },
        maxBasketAmount: 3,
      };
      const ingredientAmount = 6;

      const result = productsInStock(
        product as RohlikProduct,
        ingredientAmount,
      );

      expect(result).toBe(false);
    },
  );

  it(
    'should return true because tooltips[0].type !== "PARTLY_SOLD_OUT" inStock &&\n' +
      "      ingredientAmount / packageInfo.amount > tooltips[0].triggerAmount &&\n" +
      '      tooltips[0].type === "xxx" &&\n' +
      "      ingredientAmount / packageInfo.amount <= maxBasketAmount",
    () => {
      const product: PartialRohlikProduct = {
        tooltips: [{ triggerAmount: 2, type: "xxx" }],
        inStock: true,
        packageInfo: { amount: 2, unit: "kg" },
        maxBasketAmount: 3,
      };
      const ingredientAmount = 6;

      const result = productsInStock(
        product as RohlikProduct,
        ingredientAmount,
      );

      expect(result).toBe(true);
    },
  );

  it("should return false for out-of-stock product", () => {
    const product: PartialRohlikProduct = {
      tooltips: [],
      inStock: false,
      packageInfo: { amount: 2, unit: "kg" },
      maxBasketAmount: 5,
    };
    const ingredientAmount = 4;

    const result = productsInStock(product as RohlikProduct, ingredientAmount);

    expect(result).toBe(false);
  });
});

describe("findPreferredProduct function", () => {
  it("should return the first preferred and in-stock product", () => {
    const products: PartialRohlikProduct[] = [
      { preferred: true, inStock: true },
      { preferred: false, inStock: true },
      { preferred: true, inStock: false },
    ];

    const result = findPreferredProduct(products as RohlikProduct[]);

    expect(result).toEqual({ preferred: true, inStock: true });
  });

  it("should return undefined because preferred product is not inStock", () => {
    const products: PartialRohlikProduct[] = [
      { preferred: true, inStock: false },
      { preferred: false, inStock: true },
      { preferred: true, inStock: false },
    ];

    const result = findPreferredProduct(products as RohlikProduct[]);

    expect(result).toBeUndefined();
  });

  it("should return undefined if there is no preferred and in-stock product", () => {
    const products: PartialRohlikProduct[] = [
      { preferred: false, inStock: false },
      { preferred: false, inStock: true },
    ];

    const result = findPreferredProduct(products as RohlikProduct[]);

    expect(result).toBeUndefined();
  });
});

it("should filter products with sales", () => {
  const products: PartialRohlikProduct[] = [
    { sales: [{ price: { amount: 10, currency: "CZK" } }] },
    { sales: [] },
    { sales: [{ price: { amount: 5, currency: "CZK" } }] },
  ];

  const result = filterProductsWithSales(products as RohlikProduct[]);

  expect(result).toEqual([
    { sales: [{ price: { amount: 10, currency: "CZK" } }] },
    { sales: [{ price: { amount: 5, currency: "CZK" } }] },
  ]);
});

it("should return an empty array if no products have sales", () => {
  const products: PartialRohlikProduct[] = [{ sales: [] }, { sales: [] }];

  const result = filterProductsWithSales(products as RohlikProduct[]);

  expect(result).toEqual([]);
});

describe("filterProductsWithoutSales function", () => {
  it("should filter products without sales", () => {
    const products: PartialRohlikProduct[] = [
      { sales: [] },
      { sales: [{ price: { amount: 10, currency: "CZK" } }] },
      { sales: [] },
    ];

    const result = filterProductsWithoutSales(products as RohlikProduct[]);

    expect(result).toEqual([{ sales: [] }, { sales: [] }]);
  });

  it("should return an empty array if all products have sales", () => {
    const products: PartialRohlikProduct[] = [
      { sales: [{ price: { amount: 5, currency: "CZK" } }] },
      { sales: [{ price: { amount: 10, currency: "CZK" } }] },
    ];

    const result = filterProductsWithoutSales(products as RohlikProduct[]);

    expect(result).toEqual([]);
  });
});

describe("findCheapestNormalProduct function", () => {
  it("should return the cheapest product", () => {
    const products: PartialRohlikProduct[] = [
      { price: { amount: 100, currency: "CZK" } },
      { price: { amount: 50, currency: "CZK" } },
      { price: { amount: 80, currency: "CZK" } },
    ];

    const result = findCheapestNormalProduct(
      products as RohlikProduct[],
      "price",
    );

    expect(result).toEqual({ price: { amount: 50, currency: "CZK" } });
  });

  it("should return undefined for an empty products array", () => {
    const products: PartialRohlikProduct[] = [];

    const result = findCheapestNormalProduct(
      products as RohlikProduct[],
      "price",
    );

    expect(result).toBeUndefined();
  });
});

describe("findCheapestSalesProduct function", () => {
  it("should return the product with the cheapest sales price", () => {
    const products: PartialRohlikProduct[] = [
      { sales: [{ price: { amount: 10, currency: "CZK" } }] },
      { sales: [{ price: { amount: 5, currency: "CZK" } }] },
      { sales: [{ price: { amount: 8, currency: "CZK" } }] },
    ];

    const result = findCheapestSalesProduct(
      products as RohlikProduct[],
      "price",
    );

    expect(result).toEqual({
      sales: [{ price: { amount: 5, currency: "CZK" } }],
    });
  });

  it("should return undefined for an empty product array", () => {
    const products: PartialRohlikProduct[] = [];

    const result = findCheapestSalesProduct(
      products as RohlikProduct[],
      "price",
    );

    expect(result).toBeUndefined();
  });
});

describe("getOverallCheapestProduct function", () => {
  it("should return the product with sales if it is cheaper", () => {
    const withSales: PartialRohlikProduct = {
      sales: [{ price: { amount: 50, currency: "CZK" } }],
    };
    const withoutSales: PartialRohlikProduct = {
      price: { amount: 80, currency: "CZK" },
    };

    const result = getOverallCheapestProduct(
      withSales as RohlikProduct,
      withoutSales as RohlikProduct,
      "price",
    );

    expect(result).toEqual({
      sales: [{ price: { amount: 50, currency: "CZK" } }],
    });
  });

  it("should return the product without sales if it is cheaper", () => {
    const withSales: PartialRohlikProduct = {
      sales: [{ price: { amount: 80, currency: "CZK" } }],
    };
    const withoutSales: PartialRohlikProduct = {
      price: { amount: 50, currency: "CZK" },
    };

    const result = getOverallCheapestProduct(
      withSales as RohlikProduct,
      withoutSales as RohlikProduct,
      "price",
    );

    expect(result).toEqual({ price: { amount: 50, currency: "CZK" } });
  });

  //what should it actually return?
  it("should return the product without sales if both have the same price", () => {
    const withSales: PartialRohlikProduct = {
      sales: [{ price: { amount: 50, currency: "CZK" } }],
    };
    const withoutSales: PartialRohlikProduct = {
      price: { amount: 50, currency: "CZK" },
    };

    const result = getOverallCheapestProduct(
      withSales as RohlikProduct,
      withoutSales as RohlikProduct,
      "price",
    );

    expect(result).toEqual({
      price: { amount: 50, currency: "CZK" },
    });
  });

  it("should throw an error if both are undefined", () => {
    const withSales: PartialRohlikProduct | undefined = undefined;
    const withoutSales: PartialRohlikProduct | undefined = undefined;

    expect(() =>
      getOverallCheapestProduct(withSales, withoutSales, "price"),
    ).toThrowError("Všechny alternativy vyprodány.");
  });
});

describe("calculateDiscountPercentage function", () => {
  it("should calculate the discount percentage", () => {
    const amountSaved = 20;
    const priceAfterDiscount = 80;

    const result = calculateDiscountPercentage(amountSaved, priceAfterDiscount);

    expect(result).toBe(20);
  });

  it("should return 0% discount if amountSaved is 0", () => {
    const amountSaved = 0;
    const priceAfterDiscount = 100;

    const result = calculateDiscountPercentage(amountSaved, priceAfterDiscount);

    expect(result).toBe(0);
  });
});

describe("getFilteredIngredientData function", () => {
  it("should filter ingredient data based on product IDs and store IDs", () => {
    const productIds = [
      { id: "product1", storeId: "store1" },
      { id: "product2", storeId: "store2" },
    ];

    const ingredientData: IngredientData = {
      productsByStoreId: {
        store1: [
          { id: "product1", name: "Product 1" },
          { id: "product3", name: "Product 3" },
        ],
        store2: [
          { id: "product2", name: "Product 2" },
          { id: "product4", name: "Product 4" },
        ],
      },
      ingredientIds: {
        store1: ["product1", "product3"],
        store2: ["product2", "product4"],
      },
    };

    const result = getFilteredIngredientData(
      productIds,
      ingredientData as OriginalIngredientData,
    );

    expect(result).toEqual({
      productsByStoreId: {
        store1: [{ id: "product1", name: "Product 1" }],
        store2: [{ id: "product2", name: "Product 2" }],
      },
    });
  });

  it("should handle undefined ingredientData", () => {
    const productIds = [
      { id: "product1", storeId: "store1" },
      { id: "product2", storeId: "store2" },
    ];

    const ingredientData: IngredientData | undefined = undefined;

    const result = getFilteredIngredientData(productIds, ingredientData);

    expect(result).toEqual({
      productsByStoreId: {},
    });
  });

  it("should handle empty productIds", () => {
    const productIds: { id: string; storeId: string }[] = [];

    const ingredientData: IngredientData = {
      productsByStoreId: {
        store1: [{ id: "product1", name: "Product 1" }],
        store2: [{ id: "product2", name: "Product 2" }],
      },
      ingredientIds: {
        store1: ["product1"],
        store2: ["product2"],
      },
    };

    const result = getFilteredIngredientData(
      productIds,
      ingredientData as OriginalIngredientData,
    );

    expect(result).toEqual({
      productsByStoreId: {
        store1: [],
        store2: [],
      },
    });
  });
});
