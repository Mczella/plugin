import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { useMyStore } from "../store/store.tsx";
import { NewRecipe, Product } from "../types.ts";
import { useGetRecipePrice } from "../hooks/useGetRecipePrice.tsx";

type Props = {
  recipeInCart: string;
};

type IngredientData = null | {
  productsByStoreId: {
    [storeId: string]: Product[];
  };
  ingredientIds: {
    [storeId: string]: string[];
  };
};

const CheckRecipe: FC<Props> = ({ recipeInCart }) => {
  const { recipes } = useMyStore();
  const findRecipeById = (recipeInCart: string) =>
    recipes.find((oneRecipe) => oneRecipe.id === recipeInCart);

  // @ts-ignore
  const specificRecipe: NewRecipe = findRecipeById(recipeInCart);
  const { productIds, ingredientData } = useGetRecipePrice(specificRecipe);

  const getFilteredIngredientData = (
    productIds: string[],
    ingredientData: IngredientData | undefined,
  ) => {
    const products: { [p: string]: Product[] } = {};
    if (ingredientData) {
      Object.keys(ingredientData.productsByStoreId).forEach((storeId) => {
        products[storeId] = ingredientData.productsByStoreId[storeId].filter(
          (product: Product) => productIds.includes(product.id),
        );
      });
    }

    return {
      productsByStoreId: products,
    };
  };

  const ingredients = getFilteredIngredientData(productIds, ingredientData);

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
              <Flex flexDir={"row"} alignItems={"center"} gap={"15px"}>
                <Box
                  h={"32px"}
                  w={"32px"}
                  border={"1px solid rgba(0, 0, 0, 0.15)"}
                  rounded={"md"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _hover={{ border: "1px solid rgb(156, 164, 169)" }}
                >
                  <MinusIcon />
                </Box>
                <Text fontWeight={"bold"}>1</Text>
                <Box
                  h={"32px"}
                  w={"32px"}
                  border={"1px solid rgba(0, 0, 0, 0.15)"}
                  rounded={"md"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _hover={{ border: "1px solid rgb(156, 164, 169)" }}
                >
                  <AddIcon />
                </Box>
              </Flex>
              <Text
                textAlign={"right"}
                color={"rgb(28, 37, 41)"}
                fontSize={"15px"}
                fontWeight={"bold"}
                minW={"210px"}
              >
                {product.price?.amount} {product.price?.currency}
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
