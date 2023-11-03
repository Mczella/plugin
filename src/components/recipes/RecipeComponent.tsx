import {
  Badge,
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
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
      <Box
        maxW={"165px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        cursor={"pointer"}
      >
        <Box
          w={"150px"}
          h={"150px"}
          position={"relative"}
          pt={"10px"}
          mt={"20px"}
        >
          <Flex
            minW={"150"}
            flexDir={"row"}
            justifyContent={"space-between"}
            position={"absolute"}
            top={0}
          >
            <Image
              w={"24px"}
              // src={
              //   favorite
              //     ? "https://www.rohlik.cz/img/icons/icon-favorite-active.svg?v3"
              //     : "https://www.rohlik.cz/img/icons/icon-favorite.svg?v3"
              // }
              src={
                "https://www.rohlik.cz/img/icons/icon-favorite-active.svg?v3"
              }
            />
            <Text
              alignSelf={"center"}
              py={"5px"}
              bg={"rgba(209, 17, 0, 0.9)"}
              color={"white"}
              fontSize={"16px"}
              fontWeight={"bold"}
              px={"5px"}
            >
              -30 %
            </Text>
          </Flex>
          <Image
            src={recipe.image}
            fallbackSrc="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
            alt="panda"
            width="100%"
          />
          <Badge
            position={"absolute"}
            left={"25%"}
            bottom={0}
            bg={"rgba(0, 0, 0, 0.5)"}
            color={"white"}
            fontSize={"12px"}
            fontWeight={600}
            py={"2px"}
            px={"7px"}
            rounded={"2xl"}
          >
            {`${recipe.portion} porce`}
          </Badge>
        </Box>
      </Box>
      <Box maxW={"165px"} display={"contents"}>
        <Text
          cursor={"pointer"}
          pt={"10px"}
          textAlign={"center"}
          h={"60px"}
          casing={"capitalize"}
          display={"-webkit-box"}
          fontSize={"13px"}
          lineHeight={1.4}
          noOfLines={2}
          maxW={"165px"}
          textOverflow={"ellipsis"}
          sx={{ "-webkit-line-clamp": "2" }}
        >
          {recipe.name}
        </Text>
        {/*{sale? }*/}
        <Text
          color={"rgb(209, 17, 0)"}
          textAlign={"center"}
          fontSize={"13px"}
          h={"20px"}
          fontWeight={600}
          lineHeight={"22px"}
        >
          ušetříte 30 %
        </Text>
        {/*:*/}
        {/*<Box>*/}
        {/*  */}
        {/*</Box>*/}
        {/*{sale?}*/}
        <HStack>
          <Text
            as={"s"}
            fontSize={"18px"}
            lineHeight={1.4}
            fontWeight={"normal"}
            color={"rgb(28, 37, 41)"}
          >
            100 Kč
          </Text>
          <Text
            fontSize="24px"
            lineHeight="1.4"
            fontWeight={"bold"}
            color={"rgb(209, 17, 0)"}
          >
            {totalPrice === 0 ? "Vyprodáno" : `${Math.ceil(totalPrice)} Kč`}
          </Text>
        </HStack>
        {/*: <Text></Text>*/}
        <Text fontSize="12px" lineHeight={1.4} color={"rgb(93, 103, 108)"}>
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
            rounded={"lg"}
            alignItems="center"
            fontSize={"13px"}
            fontWeight={"bold"}
            isDisabled={totalPrice === 0}
            _hover={{ bg: "rgb(87, 130, 4)", color: "white" }}
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
