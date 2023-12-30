import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { useMyStore } from "../store/store.tsx";
import { useFindRecipeById } from "../hooks/useFindRecipeById.ts";

type Props = {
  recipe: { id: string; amount: number };
};

const RecipeInCart: FC<Props> = ({ recipe }) => {
  const { deleteRecipeFromCart } = useMyStore();

  const specificRecipe = useFindRecipeById(recipe);

  if (!specificRecipe) {
    throw new Error("Error");
  }

  const handleDelete = (id: string) => {
    deleteRecipeFromCart(id);
  };

  const getInflection = () => {
    if (specificRecipe.portion < 5) {
      return "porce";
    } else {
      return "porcí";
    }
  };

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
              src={specificRecipe.image}
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
                {specificRecipe.name}
              </Text>
              <Text
                color={"rgb(28, 37, 41)"}
                fontStyle={"italic"}
                fontSize={"12px"}
              >
                {specificRecipe.portion} {getInflection()}
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
                {recipe.amount}
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
          onClick={() => handleDelete(specificRecipe.id)}
        />
      </Flex>
    </Flex>
  );
};

export default RecipeInCart;
