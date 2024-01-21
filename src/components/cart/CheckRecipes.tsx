import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMyStore } from "../store/store.tsx";
import CheckRecipe from "./CheckRecipe.tsx";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import CheckIngredient from "./CheckIngredient.tsx";
import { useGetCartPrice } from "../hooks/useGetCartPrice.ts";
import { usePurgeStorage } from "../store/hooks.ts";

const CheckRecipes = () => {
  const { recipesInCart, ingredientsInCart } = useMyStore();
  const location = useLocation();
  const purge = usePurgeStorage();

  const cartPrice = useGetCartPrice(ingredientsInCart);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer && location.pathname === "/prehled-receptu") {
      footer.remove();
    }
  }, [location.pathname]);

  const mutation = useMutation(
    async (data: { quantity: number; productId: string }) => {
      const response = await fetch(
        "https://www.rohlik.cz/services/frontend-service/v2/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("Error posting to cart");
      }

      return response.json();
    },
    {},
  );

  const handlePostToCart = async (
    productsDetails: { productId: string; amount: number }[],
  ) => {
    for (const productDetail of productsDetails) {
      try {
        await mutation.mutateAsync({
          quantity: productDetail.amount,
          productId: productDetail.productId,
        });
      } catch (error) {
        console.log(
          `An error has occurred with ${productDetail.productId}: `,
          error,
        );
      }
    }
  };

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

  const getProductsInCartDetails = () => {
    const productDetails: { productId: string; amount: number }[] = [];
    ingredientsInCart.map((ingredientInCart) =>
      productDetails.push({
        productId: ingredientInCart.id,
        amount: ingredientInCart.amountInCart,
      }),
    );
    return productDetails;
  };

  const productsDetails = getProductsInCartDetails();
  console.log(productsDetails);

  return cartPrice && cartPrice.totalPrice && cartPrice.totalPrice > 0 ? (
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
          Přehled objednávky z chytrého nákupu
        </Text>
        {recipesInCart.map((recipeInCart) => {
          return (
            <CheckRecipe key={recipeInCart.id} recipeInCart={recipeInCart} />
          );
        })}
        {ingredientsInCart.map((ingredientInCart) => {
          return (
            <CheckIngredient
              key={ingredientInCart.id}
              ingredientInCart={ingredientInCart}
            />
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
            {cartPrice?.totalPrice.toFixed(1)} Kč za ingredience z chytrého
            nákupu
          </Text>
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
            onClick={async () => {
              await handlePostToCart(productsDetails);
              purge();
              window.location.href =
                "https://www.rohlik.cz/objednavka/prehled-kosiku";
            }}
            disabled={mutation.isLoading}
          >
            Pokračovat k objednávce
          </Button>
        </Flex>
      </Box>
    </>
  ) : null;
};

export default CheckRecipes;
