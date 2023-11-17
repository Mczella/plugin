export interface Price {
  pricePerUnit: {
    amount: number;
    currency: string;
  };
  sales: Sales | [];
  price: {
    amount: number;
    currency: string;
  };
}

export interface Preferred {
  preferred?: boolean;
}

export interface Product {
  id: string;
  name: string;
  unit: string;
  textualAmount: string;
  badges: string;
  image: string;
}

export interface Stock {
  packageInfo: {
    amount: number;
    unit: string;
  };
  inStock: boolean;
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
    [storeId: string]: (Stock & Price & Preferred & Product)[];
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
  unit: string;
  optimize: boolean;
  sortBy: "price" | "pricePerUnit";
};

export type NewRecipeIngredient = NewIngredient & {
  amount: number;
};

export type RecipeIngredient = {
  id: NewRecipeIngredient["id"];
  amount: NewRecipeIngredient["amount"];
  unit?: NewRecipeIngredient["unit"];
}[];

export type NewRecipe = {
  name: string;
  portion: number;
  description?: string;
  image?: string;
  ingredients: NewRecipeIngredient[];
  id: string;
};
