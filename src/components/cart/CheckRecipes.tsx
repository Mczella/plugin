import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMyStore } from "../store/store.tsx";
import CheckRecipe from "./CheckRecipe.tsx";

const CheckRecipes = () => {
  const { recipesInCart } = useMyStore();

  useEffect(() => {
    const cartWrapper = document.querySelector('[class*="cartWrapper"]');
    const chat = document.querySelector('[class*="chat-placeholder"]');

    if (cartWrapper) {
      cartWrapper.remove();
    }

    if (chat) {
      chat.remove();
    }
  }, []);

  return (
    <>
      <Flex
        flexDir={"column"}
        bg={"rgb(242, 244, 244)"}
        minH={"100vh"}
        p={"40px 11% 72px"}
        mb={"64px"}
      >
        <Text
          textAlign={"center"}
          mt={"48px"}
          fontSize={"32px"}
          fontWeight={"400"}
          lineHeight={"43px"}
          color={"rgb(28, 37, 41)"}
        >
          Přehled objednávky receptů
        </Text>
        {recipesInCart.map((recipeInCart) => {
          return (
            <CheckRecipe key={recipeInCart.id} recipeInCart={recipeInCart} />
          );
        })}
      </Flex>
      <Box width={"100%"} position={"fixed"} bottom={0} bg={"black"} h={"80px"}>
        <Flex
          p={"12px"}
          zIndex={305}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            color={"white"}
            fontSize={"14px"}
            fontWeight={"600"}
            pr={"32px"}
          >
            Kč za ingredience k receptům
          </Text>
          <Link
            style={{ all: "unset" }}
            href={`https://www.rohlik.cz/objednavka/prehled-kosiku`}
          >
            <Button
              h={"40px"}
              bg={"rgb(109, 163, 5)"}
              color={"white"}
              fontSize={"14px"}
              fontWeight={"600"}
              lineHeight={"1"}
              mx={"16px"}
              my={"12px"}
              rounded={"xl"}
              _hover={{ bg: "rgb(87, 130, 4)" }}
              // onClick={nahazet veci do kosiku}
            >
              Pokračovat k objednávce
            </Button>
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export default CheckRecipes;
