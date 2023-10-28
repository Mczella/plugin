export interface Product {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  unit: string;
  textualAmount: string;
  badges: string;
  image: string;
  preferred?: boolean;
  pricePerUnit: {
    amount: number;
    currency: string;
  };
  sales: string;
  packageInfo: string;
  inStock: string;
}

export type NewIngredient = {
  name: string;
  selectedProducts: Product[];
};

export type NewRecipe = {
  name: string;
  portion: number;
  description?: string;
  image?: string;
  ingredients: NewIngredient[];
};
