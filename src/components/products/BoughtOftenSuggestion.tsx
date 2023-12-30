import { useFindIngredientById } from "../hooks/useFindIngredientById.ts";
import { useFindProductInDelivered } from "../hooks/useFindProductInDelivered.ts";
import { FC } from "react";
import { NewIngredient } from "../types.ts";
import Product from "./Product.tsx";

type Props = {
  ingredient: { id: NewIngredient["id"]; amount: number; frequency: number };
};

export const BoughtOftenSuggestion: FC<Props> = ({ ingredient }) => {
  const matchingIngredient = useFindIngredientById(ingredient);
  if (!matchingIngredient) {
    throw new Error("No matching ingredient found");
  }
  const productIds = matchingIngredient.selectedProducts.map(
    (product) => product.id,
  );
  const foundPurchase:
    | {
        daysDifference: number;
        parsedOrderDate: Date;
        matchingItem: { id: string; amount: number };
      }
    | undefined = useFindProductInDelivered(productIds);

  const showInSuggestions = (ingredient: {
    id: NewIngredient["id"];
    amount: number;
    frequency: number;
  }) => {
    const dailyNeed = ingredient.amount / ingredient.frequency;
    return (
      !foundPurchase ||
      (foundPurchase &&
        foundPurchase.matchingItem &&
        (foundPurchase.matchingItem.amount -
          dailyNeed * foundPurchase.daysDifference) /
          dailyNeed <=
          2)
    );
  };

  const showSuggestion = showInSuggestions(ingredient);

  return showSuggestion ? (
    <Product
      ingredient={matchingIngredient}
      key={matchingIngredient.id}
      boughtOften={true}
    />
  ) : null;
};
