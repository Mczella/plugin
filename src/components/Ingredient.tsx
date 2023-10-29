import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { NewIngredient } from "./types.ts";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./Api.ts";

type Props = {
  ingredient: NewIngredient;
};

type SimpleProduct = {
  id: number;
  name: string;
  images: string[];
  unit: string;
  textualAmount: string;
  mainCategoryId: number;
};

const Ingredient: FC<Props> = ({ ingredient }) => {
  const threeProducts = ingredient.selectedProducts.slice(0, 3);
  const restOfProducts = ingredient.selectedProducts.length - 3;
  const ArrayOfProductIds = threeProducts.map((product) => product.id);
  const { data, isError } = useQuery(["data", ArrayOfProductIds], () =>
    fetchProducts(ArrayOfProductIds),
  );

  if (isError) {
    return <div>Error.</div>;
  }

  return (
    <Flex flexDir={"column"}>
      <Flex
        flexDir={"column"}
        justify={"flex-start"}
        cursor={"pointer"}
        rounded={"3xl"}
        boxShadow={
          "rgba(0, 0, 0, 0.01) 0px 0px 12px, rgba(0, 0, 0, 0.06) 0px 0px 10px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px;"
        }
        w={"144px"}
        h={"144px"}
        justifyContent={"center"}
        mb={"8px"}
        p={"10px"}
        alignItems={"center"}
      >
        <SmallCloseIcon
          position={"relative"}
          alignSelf={"end"}
          top={"5px"}
          color={"rgb(218, 222, 224)"}
          _hover={{ color: "rgb(87, 130, 4)" }}
        />
        <SimpleGrid
          columns={ingredient.selectedProducts.length > 1 ? 2 : 1}
          spacing={"4px"}
        >
          {data &&
            data.map((product: SimpleProduct) => (
              <Box
                w={"60px"}
                h={"60px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                key={product.id}
              >
                <Image
                  src={product.images[0]}
                  objectFit={"contain"}
                  h={"55px"}
                />
              </Box>
            ))}
          {restOfProducts > 0 && (
            <Box
              w={"60px"}
              h={"60px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text as={"b"}>{`+ ${restOfProducts}`}</Text>
            </Box>
          )}
        </SimpleGrid>
      </Flex>
      <Text
        px={"4px"}
        as={"b"}
        color={"rgb(28, 37, 41)"}
        fontSize={"14px"}
        lineHeight={"22px"}
        casing={"capitalize"}
      >
        {ingredient.name}
      </Text>
      <Editable
        px={"4px"}
        defaultValue="Množství"
        color={"rgb(93, 103, 108)"}
        fontSize={"13px"}
        lineHeight={"22px"}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Flex>
  );
};

export default Ingredient;
