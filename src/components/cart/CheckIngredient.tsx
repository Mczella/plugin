import { Flex, Image, Text } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FC } from "react";
import PlusMinus from "../PlusMinus.tsx";
import { RohlikProduct } from "../types.ts";
import { useGetIngredientPrice } from "../hooks/useGetIngredientPrice.ts";
import { useMyStore } from "../store/store.tsx";

type Props = {
  ingredientInCart: {
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

const CheckIngredient: FC<Props> = ({ ingredientInCart }) => {
  const { ingredients } = useMyStore();

  const specificIngredient = ingredients.find(
    (ing) => ing.id === ingredientInCart.storeId,
  );

  if (!specificIngredient) {
    throw new Error("error");
  }

  const { totalPrice, productInfo } = useGetIngredientPrice(specificIngredient);
  console.log(productInfo, totalPrice);
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
        {ingredientInCart.name}
      </Text>
      <Flex
        p={"4px 32px 4px 48px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        minH={"80px"}
        bg={"white"}
        mb={"1px"}
        key={productInfo[0].id}
      >
        <Flex flexDir={"row"} w={"720px"} alignItems={"center"}>
          <Image
            width={"64px"}
            maxHeight={"64px"}
            objectFit={"contain"}
            src={productInfo[0].image}
          />
          <Text
            color={"rgb(28, 37, 41)"}
            fontSize={" 14px"}
            lineHeight={"1.47"}
            pl={"48px"}
          >
            {productInfo[0].name}
          </Text>
          <Text pl={"4"}>{productInfo[0].textualAmount}</Text>
        </Flex>
        <Flex flexDir={"row"} alignItems={"center"}>
          <PlusMinus
            size={"32px"}
            amount={ingredientInCart.amountInCart}
            handleAdd={() => console.log("add")}
            handleSubtract={() => console.log("h")}
          >
            <Text fontWeight={"bold"}>{ingredientInCart.amountInCart}</Text>
          </PlusMinus>
          <Text
            textAlign={"right"}
            color={"rgb(28, 37, 41)"}
            fontSize={"15px"}
            fontWeight={"bold"}
            minW={"210px"}
          >
            {totalPrice}
          </Text>
          <SmallCloseIcon
            ml={"40px"}
            color={"rgb(218, 222, 224)"}
            _hover={{ color: "rgb(87, 130, 4)" }}
          />
        </Flex>
      </Flex>
    </>
  );
};
export default CheckIngredient;
