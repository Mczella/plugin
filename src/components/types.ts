export interface Product {
  id: string;
  name?: string;
  price: {
    amount: number;
    currency: string;
  };
  unit: string;
  textualAmount?: string;
  badges?: string;
  image?: string;
  preferred?: boolean;
  pricePerUnit?: {
    amount: number;
    currency: string;
  };
  sales: Sales | [];
  packageInfo?: {
    amount: number;
    unit: string;
  };
  inStock?: boolean;
  tooltips: Tooltips;
  maxBasketAmount: number;
}

export type Tooltips =
  | []
  | [
      {
        type: string; //"PARTLY_SOLD_OUT",
        closable: boolean;
        triggerAmount: number | null;
        size: null;
        message: string;
        actionable: boolean;
      },
    ];

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
  amount?: number;
  unit: string;
  optimize: boolean;
};

export type NewRecipeIngredient = {
  id: NewIngredient["id"];
  amount: NewIngredient["amount"];
  unit: NewIngredient["unit"];
}[];

export type NewRecipe = {
  name: string;
  portion: number;
  description?: string;
  image?: string;
  ingredients: NewRecipeIngredient;
  id: string;
};
