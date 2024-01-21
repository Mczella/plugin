import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { useMyStore } from "../store/store.tsx";
import { RohlikProduct } from "../types.ts";
import { useGetIngredientPrice } from "../hooks/useGetIngredientPrice.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsDetails } from "../api/api.ts";

type Props = {
  ingredient: {
    name: string;
    id: RohlikProduct["id"];
    amount: number;
    unit: string;
    packageAmount: number;
    optimize: boolean;
    storeId: string;
    amountInCart: number;
  };
};

const IngredientInCart: FC<Props> = ({ ingredient }) => {
  const { deleteIngredientFromCart, ingredients } = useMyStore();

  const ingredientById = ingredients.find(
    (ing) => ing.id === ingredient.storeId,
  );

  if (!ingredientById) {
    throw new Error("No matching ingredient.");
  }

  const { totalPrice, saved, discount } = useGetIngredientPrice(ingredientById);

  const { data, isError } = useQuery(["data", ingredient.id], () =>
    fetchProductsDetails([ingredient.id]),
  );

  if (isError) {
    return (
      <Text p={"10px"}>
        Došlo k chybě. Tento produkt zřejmě již není v nabídce.
      </Text>
    );
  }

  const priceBeforeSale = totalPrice + saved;

  console.log(data);
  const handleDelete = (id: string) => {
    deleteIngredientFromCart(id);
  };

  const productDetail = data?.productsByIds[ingredient.id];

  return (
    <Flex
      bg={"white"}
      flexDir={"row"}
      borderBottom={"1px solid rgb(218, 222, 224)"}
      p={"10px 16px 10px 8px"}
      justifyContent={"space-between"}
    >
      <Flex>
        <Flex flexDir={"row"}>
          <Box
            minW={"45px"}
            maxW={"45px"}
            h={"45px"}
            mr={"5px"}
            display={"grid"}
          >
            <Image
              justifySelf={"center"}
              maxH={"45px"}
              src={productDetail?.image}
              fallbackSrc={
                "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
              }
            />
          </Box>
          <Flex flexDir={"column"} justify={"space-between"}>
            <Flex
              p={"3px 25px 10px 0px"}
              ml={"5px"}
              flexDir={"column"}
              alignItems={"left"}
              gap={"4px"}
            >
              <Text
                fontSize={"12px"}
                lineHeight={1.5}
                color={"rgb(28, 37, 41)"}
              >
                {ingredientById.name}
              </Text>
              <Text
                color={"rgb(28, 37, 41)"}
                fontStyle={"italic"}
                fontSize={"12px"}
              >
                {ingredient.packageAmount} {ingredient.unit}
              </Text>
            </Flex>
            <Flex
              flexDir={"row"}
              gap={"14px"}
              alignItems={"center"}
              mb={"10px"}
              ml={"3px"}
            >
              <Box
                h={"20px"}
                w={"20px"}
                border={"1px solid rgba(0, 0, 0, 0.15)"}
                rounded={"md"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{ border: "1px solid rgb(156, 164, 169)" }}
                boxShadow={"rgba(0, 0, 0, 0.2) 0px 2px 4px -2px"}
              >
                <MinusIcon boxSize={"4"} />
              </Box>
              <Text fontWeight={"bold"} fontSize={"12px"}>
                {ingredient.amountInCart}
              </Text>
              <Box
                h={"20px"}
                w={"20px"}
                border={"1px solid rgba(0, 0, 0, 0.15)"}
                rounded={"md"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{ border: "1px solid rgb(156, 164, 169)" }}
                boxShadow={"rgba(0, 0, 0, 0.2) 0px 2px 4px -2px"}
              >
                <AddIcon boxSize={"5"} />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir={"column"}
        justify={"space-between"}
        alignItems={"flex-end"}
      >
        <SmallCloseIcon
          color={"rgb(218, 222, 224)"}
          _hover={{ color: "rgb(87, 130, 4)" }}
          onClick={() => handleDelete(ingredient.id)}
        />
        <Flex flexDir={"column"} mb={"10px"} w={"60px"}>
          {discount > 0 ? (
            <Text
              textAlign={"right"}
              fontSize={"12px"}
              fontWeight={"normal"}
              color={"rgb(28, 37, 41)"}
              as={"s"}
            >
              {(priceBeforeSale * ingredient.amountInCart).toFixed(1)} Kč
            </Text>
          ) : null}
          <Text
            textAlign={"right"}
            fontSize={"12px"}
            fontWeight={"700"}
            color={discount > 0 ? "rgb(209, 17, 0)" : "black"}
          >
            {(Number(totalPrice) * ingredient.amountInCart).toFixed(1)} Kč
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default IngredientInCart;
