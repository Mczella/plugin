export interface Product {
  id: string;
  name?: string;
  price: {
    amount: number;
    currency: string;
  };
  unit?: string;
  textualAmount?: string;
  badges?: string;
  image?: string;
  preferred?: boolean;
  pricePerUnit?: {
    amount: number;
    currency: string;
  };
  sales: Sales | [];
  packageInfo?: string;
  inStock?: boolean;
}

export type Sales = {
  price: {
    amount: number;
    currency: string;
  };
  originalPrice: {
    amount: number;
    currency: string;
  };
  pricePerUnit: {
    amount: number;
    currency: string;
  };
  triggerAmount: number;
  badges: {
    description: {
      icon: string;
      text: string;
    };
    title: string;
  }[];
}[];

export type IngredientData = null | {
  productsByStoreId: {
    [storeId: string]: Product[];
  };
  ingredientIds: {
    [storeId: string]: string[];
  };
};

export type SimpleIngredient = {
  id: string;
  preferred?: boolean;
};

export type NewIngredient = {
  name: string;
  selectedProducts: SimpleIngredient[];
  id: string;
};

export type NewRecipe = {
  name: string;
  portion: number;
  description?: string;
  image?: string;
  ingredients: string[];
  id: string;
};
