import React, { useEffect, useState } from "react";
import { Button, GridItem, Image, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useMyStore } from "./store";
import { NewRecipe } from "./types";
import { useGetIngredientIds } from "./UseGetIngredientsIds.tsx";
import { useGetRecipePrice } from "./useGetRecipePrice.tsx";

type Props = {
  recipe: NewRecipe;
};

type Product = {
  id: number;
  preferred?: boolean | undefined;
  price: {
    amount: number;
  };
  inStock: boolean;
};

type IngredientData = null | {
  productsByStoreId: {
    [storeId: string]: Product[];
  };
  ingredientIds: {
    [storeId: string]: string[];
  };
};

const RecipeComponent: React.FC<Props> = ({ recipe }) => {
  const { recipesInCart, ingredients, addRecipeToCart } = useMyStore();
  const [ingredientData, setIngredientData] = useState<IngredientData | null>(
    null,
  );
  const data = useGetIngredientIds(recipe);
  const { totalPrice, productIds } = useGetRecipePrice(ingredientData, recipe);
  const pricePerPortion = totalPrice / recipe.portion;

  console.log(recipe.name, totalPrice, productIds);
  console.log(recipe.name);

  useEffect(() => {
    if (data !== undefined) {
      const updatedIngredientData = { ...data };
      console.log(updatedIngredientData);

      let selectedProductPreferences: {
        [key: string]: { [key: string]: boolean | undefined };
      } = {};

      ingredients.forEach((ingredientItem) => {
        let productPreferences: { [key: string]: boolean | undefined } = {};

        ingredientItem.selectedProducts.forEach((product) => {
          productPreferences[product.id] = product.preferred;
        });

        selectedProductPreferences[ingredientItem.id] = productPreferences;

        Object.keys(data.productsByStoreId).forEach((storeId) => {
          if (storeId === ingredientItem.id) {
            data.productsByStoreId[storeId] = data.productsByStoreId[
              storeId
            ].map((product: { id: string }) => ({
              ...product,
              preferred:
                selectedProductPreferences[storeId][product.id] || false,
            }));
          }
        });
      });

      setIngredientData(updatedIngredientData);
    }
  }, [data]);

  return (
    <GridItem
      key={recipe.id}
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Image
        src={recipe.image}
        fallbackSrc="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
        alt="panda"
        width="100%"
      />
      <Text height="3em" isTruncated casing={"capitalize"}>
        {recipe.name}
      </Text>
      <Text fontSize="24px" fontWeight="bold" lineHeight="1.4">
        {totalPrice === 0 ? "Vyprodáno" : `${Math.ceil(totalPrice)} Kč`}
      </Text>
      <Text fontSize="12px" lineHeight={1.4}>
        {`${Math.ceil(pricePerPortion)} Kč/porce`}
      </Text>
      {recipesInCart.includes(recipe.id) ? (
        <AddIcon />
      ) : (
        <Button
          mt="10px"
          bg="white"
          color="black"
          border="1px solid rgba(0, 0, 0, 0.15)"
          height="32px"
          display="flex"
          alignItems="center"
          isDisabled={totalPrice === 0}
          _hover={{ bg: "green" }}
          onClick={() => addRecipeToCart(recipe.id)}
        >
          Do košíku
        </Button>
      )}
    </GridItem>
  );
};

export default RecipeComponent;
