import {
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Ingredient from "../recipes/Ingredient.tsx";
import { useGetIngredientPrice } from "../hooks/useGetIngredientPrice.ts";
import PlusMinus from "../PlusMinus.tsx";
import { FC, useEffect, useRef } from "react";
import { NewIngredient, RohlikProduct } from "../types.ts";
import { useMyStore } from "../store/store.tsx";
import { useGetAmountOfIngredientUsedInRecipes } from "../hooks/useGetAmountOfIngredientUsedInRecipes.ts";
import { ProductNeededTooltip } from "../ProductNeededTooltip.tsx";
import { DeleteIngredientAlertDialog } from "./DeleteIngredientAlertDialog.tsx";
import { getEditedPrice } from "../utils/utils.ts";

type Props = {
  ingredient: NewIngredient;
  boughtOften?: boolean;
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

const Product: FC<Props> = ({ ingredient, boughtOften }) => {
  const {
    ingredients,
    ingredientsInCart,
    deleteIngredientFromCart,
    addIngredientToCart,
    recipes,
    deleteRecipeFromCart,
  } = useMyStore();
  const { productInfo, totalPrice, saved, discount } =
    useGetIngredientPrice(ingredient);
  const productDetails = productInfo[0];
  const neededAmount = useGetAmountOfIngredientUsedInRecipes(ingredient);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const focusRef = useRef(null);
  console.log("info", productInfo);
  const priceBeforeSale = totalPrice + saved;
  const editedPrice = getEditedPrice(totalPrice);

  const crossCheckWithRecipes = () => {
    const recipesWithIngredient: { name: string; id: string }[] = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((recipeIngredient) => {
        if (recipeIngredient.id === ingredient.id) {
          recipesWithIngredient.push({ name: recipe.name, id: recipe.id });
        }
      });
    });
    return recipesWithIngredient;
  };

  const recipesWithIngredient = crossCheckWithRecipes();

  useEffect(() => {
    if (productInfo.length > 0) {
      console.log({ productDetails });
      const checkCurrencyOfIngredientsInCart = () => {
        const chosenProductIsNowDifferent = ingredientsInCart.find(
          (ing) =>
            ing.storeId === productDetails.storeId &&
            ing.id !== productDetails.id,
        );

        if (chosenProductIsNowDifferent) {
          updateIngredientsInCart();
        }
      };

      const updateIngredientsInCart = () => {
        const oldProduct = ingredientsInCart.find(
          (ing) => ing.storeId === productDetails.storeId,
        );

        if (oldProduct) {
          addIngredientToCart(
            productDetails.name,
            productDetails.id,
            oldProduct.amount,
            productDetails.packageInfo.unit,
            productDetails.packageInfo.amount,
            ingredient.optimize,
            ingredient.id,
          );

          deleteIngredientFromCart(oldProduct.id);
        }
      };

      if ((editedPrice as number) === 0) {
        deleteIngredientFromCart(productDetails.id);
        if (recipesWithIngredient.length > 0) {
          recipesWithIngredient.map((recipeWithIngredient) => {
            deleteRecipeFromCart(recipeWithIngredient.id);
          });
        }
      }

      checkCurrencyOfIngredientsInCart();
    }
  }, [
    addIngredientToCart,
    deleteIngredientFromCart,
    deleteRecipeFromCart,
    editedPrice,
    ingredient,
    ingredientsInCart,
    productDetails,
    productInfo.length,
    recipesWithIngredient,
  ]);

  if (productInfo.length === 0) {
    return;
  }

  const getPriceBeforeSale = () => {
    if (totalPrice > 0) {
      return `${Math.ceil(priceBeforeSale)} Kč`;
    } else {
      return null;
    }
  };

  console.log(totalPrice, "total");
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
    <Flex justifyContent={"center"} sx={{ scrollSnapAlign: "start" }}>
      <Stack
        alignItems={"center"}
        mb={boughtOften ? 0 : "30px"}
        flexBasis={"20%"}
        w={"165px"}
      >
        <Ingredient
          discount={discount}
          ingredient={ingredient}
          handleDelete={onOpen}
          id={productDetails.id}
        >
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
            <HStack>
              {discount > 0 ? (
                <Text
                  as={"s"}
                  fontSize={"14px"}
                  lineHeight={1.4}
                  fontWeight={"normal"}
                  color={"rgb(28, 37, 41)"}
                >
                  {getPriceBeforeSale()}
                </Text>
              ) : null}
              <Text
                my={"10px"}
                textAlign={"center"}
                fontSize="20px"
                lineHeight="1.4"
                fontWeight={"bold"}
                color={discount > 0 ? "rgb(209, 17, 0)" : "rgb(28, 37, 41)"}
              >
                {(editedPrice as number) > 0
                  ? `${editedPrice} Kč`
                  : "Vyprodáno"}
              </Text>
            </HStack>
          </>
        </Ingredient>
        {productInCart && productInCart.cartItem.amountInCart > 0 ? (
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
              mb={boughtOften ? 0 : "30px"}
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
              boxShadow={"rgba(0, 0, 0, 0.15) 0px 6px 10px -6px;"}
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
        recipesWithIngredient={recipesWithIngredient}
      />
    </Flex>
  );
};

export default Product;
