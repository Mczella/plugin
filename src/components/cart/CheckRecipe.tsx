import { Flex, Image, Text } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { useMyStore } from "../store/store.tsx";
import { IngredientData, RohlikProduct } from "../types.ts";
import { useGetRecipePrice } from "../hooks/useGetRecipePrice.tsx";
import PlusMinus from "../PlusMinus.tsx";

type Props = {
  recipeInCart: { id: string; amount: number };
};

const CheckRecipe: FC<Props> = ({ recipeInCart }) => {
  const { recipes, ingredientsInCart } = useMyStore();
  const findRecipeById = (recipeInCartId: string) =>
    recipes.find((oneRecipe) => oneRecipe.id === recipeInCartId);

  const specificRecipe = findRecipeById(recipeInCart.id);

  if (!specificRecipe) {
    throw new Error("error");
  }

  const { productIds, ingredientData } = useGetRecipePrice(specificRecipe);
  console.log({ specificRecipe });
  const getFilteredIngredientData = (
    productIds: { id: string; storeId: string }[],
    ingredientData: IngredientData | undefined,
  ) => {
    console.log({ ingredientData });
    console.log({ productIds });
    const products: { [p: string]: RohlikProduct[] } = {};
    if (ingredientData) {
      Object.keys(ingredientData.productsByStoreId).forEach((storeId) => {
        products[storeId] = ingredientData.productsByStoreId[storeId].filter(
          (product: RohlikProduct) =>
            productIds.some(
              (productId) =>
                productId.id === product.id && productId.storeId === storeId,
            ),
        );
      });
    }

    return {
      productsByStoreId: products,
    };
  };

  console.log({ ingredientsInCart });

  const ingredients = getFilteredIngredientData(productIds, ingredientData);
  console.log({ ingredients });
  return (
    <>
      <Text
        mt={"48px"}
        mb={"8px"}
        fontSize={"24px"}
        lineHeight={"33px"}
        fontWeight={"400"}
        color={"rgb(28, 37, 41)"}
      >
        {specificRecipe.name}
      </Text>

      {Object.keys(ingredients.productsByStoreId).map((storeId) =>
        ingredients.productsByStoreId[storeId].map((product) => (
          <Flex
            p={"4px 32px 4px 48px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            minH={"80px"}
            bg={"white"}
            mb={"1px"}
            key={product.id}
          >
            <Flex flexDir={"row"} w={"720px"} alignItems={"center"}>
              <Image width={"64px"} src={product.image} />
              <Text
                color={"rgb(28, 37, 41)"}
                fontSize={" 14px"}
                lineHeight={"1.47"}
                pl={"48px"}
              >
                {product.name}
              </Text>
              <Text pl={"4"}>{product.textualAmount}</Text>
            </Flex>
            <Flex flexDir={"row"} alignItems={"center"}>
              <PlusMinus
                size={"32px"}
                amount={
                  ingredientsInCart.find(
                    (ingredientInCart) => ingredientInCart.id === product.id,
                  )?.amount || 0
                }
                handleAdd={() => console.log(product.id)}
                handleSubtract={() => console.log("h")}
              />
              <Text
                textAlign={"right"}
                color={"rgb(28, 37, 41)"}
                fontSize={"15px"}
                fontWeight={"bold"}
                minW={"210px"}
              >
                {product.sales.length > 0
                  ? `${product.sales[0].price.amount} ${product.price.currency}`
                  : `${product.price.amount} ${product.price.currency}`}
              </Text>
              <SmallCloseIcon
                ml={"40px"}
                color={"rgb(218, 222, 224)"}
                _hover={{ color: "rgb(87, 130, 4)" }}
              />
            </Flex>
          </Flex>
        )),
      )}
    </>
  );
};
export default CheckRecipe;
