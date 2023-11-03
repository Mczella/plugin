import { Box, Button, GridItem, Image, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useMyStore } from "../store/store.tsx";
import { NewRecipe } from "../types.ts";
import { useGetRecipePrice } from "../hooks/useGetRecipePrice.tsx";
import { FC } from "react";

type Props = {
  recipe: NewRecipe;
};

const RecipeComponent: FC<Props> = ({ recipe }) => {
  const { recipesInCart, addRecipeToCart } = useMyStore();
  const { totalPrice, productIds } = useGetRecipePrice(recipe);
  const pricePerPortion = totalPrice / recipe.portion;

  console.log(recipe.name, totalPrice, productIds);
  console.log(recipe.name);

  return (
    <GridItem display="flex" flexDir="column" alignItems="center">
      <Box w={"165px"}>
        <Box w={"150px"} h={"150px"}>
          <Image
            src={recipe.image}
            fallbackSrc="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
            alt="panda"
            width="100%"
          />
        </Box>
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
      </Box>
    </GridItem>
  );
};

export default RecipeComponent;
