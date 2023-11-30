import { Button, Stack } from "@chakra-ui/react";
import Ingredient from "../recipes/Ingredient.tsx";
import { useGetIngredientPrice } from "../hooks/useGetIngredientPrice.tsx";
import PlusMinus from "../PlusMinus.tsx";
import { FC } from "react";
import { NewIngredient } from "../types.ts";
import { useMyStore } from "../store/store.tsx";

type Props = {
  ingredient: NewIngredient;
};

const Product: FC<Props> = ({ ingredient }) => {
  const { ingredients, ingredientsInCart, addIngredientToCart } = useMyStore();
  const { productInfo, totalPrice } = useGetIngredientPrice(ingredient);
  const productDetails = productInfo[0];

  return (
    <Stack alignItems={"center"}>
      <Ingredient ingredient={ingredient} />
      {ingredientsInCart.map((cartItem) => {
        if (ingredient.id === cartItem.storeId && productInfo.length > 0) {
          console.log({ productInfo });
          const matchingIngredient = ingredients.find(
            (storeIngredient) => storeIngredient.id === productDetails.storeId,
          );
          if (!matchingIngredient) {
            return;
          }
          console.log("ahoj", ingredient.name);
          console.log(cartItem.storeId);
          return (
            <PlusMinus
              key={cartItem.id}
              amount={cartItem.amountInCart}
              handleAdd={() =>
                addIngredientToCart(
                  productDetails.name,
                  productDetails.id,
                  productDetails.packageInfo.amount,
                  productDetails.packageInfo.unit,
                  productDetails.packageInfo.amount,
                  matchingIngredient.optimize,
                  matchingIngredient.id,
                )
              }
              handleSubtract={() =>
                addIngredientToCart(
                  productDetails.name,
                  productDetails.id,
                  -productDetails.packageInfo.amount,
                  productDetails.packageInfo.unit,
                  productDetails.packageInfo.amount,
                  matchingIngredient.optimize,
                  matchingIngredient.id,
                )
              }
              size={"32px"}
            />
          );
        } else {
          return (
            <Button
              key={ingredient.id}
              bg="white"
              color="black"
              border="1px solid rgba(0, 0, 0, 0.15)"
              height="32px"
              display="flex"
              rounded={"lg"}
              alignItems="center"
              fontSize={"13px"}
              fontWeight={"bold"}
              isDisabled={totalPrice === 0}
              onClick={() => {
                addIngredientToCart(
                  productDetails.name,
                  productDetails.id,
                  productDetails.packageInfo.amount,
                  productDetails.packageInfo.unit,
                  productDetails.packageInfo.amount,
                  ingredient.optimize,
                  ingredient.id,
                );
              }}
              _hover={{ bg: "rgb(87, 130, 4)", color: "white" }}
            >
              Do košíku
            </Button>
          );
        }
      })}
    </Stack>
  );
};

export default Product;
