import { Button, Skeleton, Stack, Text, useDisclosure } from "@chakra-ui/react";
import Ingredient from "../recipes/Ingredient.tsx";
import { useGetIngredientPrice } from "../hooks/useGetIngredientPrice.tsx";
import PlusMinus from "../PlusMinus.tsx";
import { FC, useRef } from "react";
import { NewIngredient, RohlikProduct } from "../types.ts";
import { useMyStore } from "../store/store.tsx";
import { useGetAmountOfIngredientUsedInRecipes } from "../hooks/useGetAmountOfIngredientUsedInRecipes.ts";
import { ProductNeededTooltip } from "../ProductNeededTooltip.tsx";
import { DeleteIngredientAlertDialog } from "./DeleteIngredientAlertDialog.tsx";
import { getEditedPrice } from "../utils/utils.ts";

type Props = {
  ingredient: NewIngredient;
};

const getProductFromCart = (
  ingredient: NewIngredient,
  ingredients: NewIngredient[],
  ingredientsInCart: {
    name: string;
    id: RohlikProduct["id"];
    amount: number;
    unit: string;
    packageAmount: number;
    optimize: boolean;
    storeId: string;
    amountInCart: number;
  }[],
  storeId: string,
) => {
  const cartItem = ingredientsInCart.find(
    (cartItem) => ingredient.id === cartItem.storeId,
  );

  if (!cartItem) {
    return null;
  }

  const matchingIngredient = ingredients.find(
    (storeIngredient) => storeIngredient.id === storeId,
  );

  if (!matchingIngredient) {
    return null;
  }

  return {
    cartItem,
    matchingIngredient,
  };
};

const Product: FC<Props> = ({ ingredient }) => {
  const { ingredients, ingredientsInCart, addIngredientToCart } = useMyStore();
  const { productInfo, totalPrice } = useGetIngredientPrice(ingredient);
  const productDetails = productInfo[0];
  const neededAmount = useGetAmountOfIngredientUsedInRecipes(ingredient);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const focusRef = useRef(null);
  console.log("info", productInfo);

  if (productInfo.length === 0) {
    return;
  }
  const productInCart = getProductFromCart(
    ingredient,
    ingredients,
    ingredientsInCart,
    productDetails.storeId,
  );
  console.log(productInCart, "jesus");

  const getInflection = () => {
    if (neededAmount && neededAmount === 1) {
      return "kus";
    } else if (neededAmount && neededAmount < 5) {
      return "kusy";
    } else {
      return "kusů";
    }
  };

  const amountOfProduct = getInflection();
  const label = `Pro recept ve vašem košíku potřebujete ${neededAmount} ${amountOfProduct} tohoto produktu.`;

  return (
    <Skeleton isLoaded={productInfo.length !== 0}>
      <Stack alignItems={"center"}>
        <Ingredient ingredient={ingredient} handleDelete={onOpen}>
          <>
            <Text
              cursor={"pointer"}
              pt={"10px"}
              textAlign={"center"}
              h={"30px"}
              casing={"capitalize"}
              display={"-webkit-box"}
              fontSize={"13px"}
              lineHeight={1.4}
              noOfLines={1}
              maxW={"165px"}
              textOverflow={"ellipsis"}
              sx={{ WebkitLineClamp: "1" }}
            >
              {ingredient.name}
            </Text>
            <Text
              my={"10px"}
              textAlign={"center"}
              fontSize="24px"
              lineHeight="1.4"
              fontWeight={"bold"}
              color={"rgb(28, 37, 41)"}
            >
              {getEditedPrice(totalPrice)} Kč
            </Text>
          </>
        </Ingredient>
        {productInCart ? (
          <PlusMinus
            key={productInCart.cartItem.id}
            amount={productInCart.cartItem.amountInCart}
            handleAdd={() =>
              addIngredientToCart(
                productDetails.name,
                productDetails.id,
                productDetails.packageInfo.amount,
                productDetails.packageInfo.unit,
                productDetails.packageInfo.amount,
                productInCart.matchingIngredient.optimize,
                productInCart.matchingIngredient.id,
              )
            }
            handleSubtract={() =>
              addIngredientToCart(
                productDetails.name,
                productDetails.id,
                -productDetails.packageInfo.amount,
                productDetails.packageInfo.unit,
                productDetails.packageInfo.amount,
                productInCart.matchingIngredient.optimize,
                productInCart.matchingIngredient.id,
              )
            }
            size={"32px"}
          >
            {neededAmount ? (
              <ProductNeededTooltip
                label={label}
                show={neededAmount > productInCart.cartItem.amountInCart}
              >
                <Text fontWeight={"bold"}>
                  {productInCart.cartItem.amountInCart}
                </Text>
              </ProductNeededTooltip>
            ) : (
              <Text fontWeight={"bold"}>
                {productInCart.cartItem.amountInCart}
              </Text>
            )}
          </PlusMinus>
        ) : (
          <ProductNeededTooltip label={label} show={neededAmount != 0}>
            <Button
              mb={"30px"}
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
          </ProductNeededTooltip>
        )}
      </Stack>
      <DeleteIngredientAlertDialog
        isOpen={isOpen}
        cancelRef={focusRef}
        onClose={onClose}
        ingredient={ingredient}
      />
    </Skeleton>
  );
};

export default Product;
