import { Dispatch, FC, SetStateAction } from "react";
import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import { Product } from "../types.ts";
import { SmallCloseIcon } from "@chakra-ui/icons";

type Props = {
  selectedProducts: Product[];
  setSelectedProducts: Dispatch<SetStateAction<Product[]>>;
};

const ChosenProducts: FC<Props> = ({
  selectedProducts,
  setSelectedProducts,
}) => {
  const handleClick = (product: Product) => {
    setSelectedProducts((prevState) => {
      return prevState.map((existingProduct) => {
        if (existingProduct.id === product.id) {
          return { ...existingProduct, preferred: true };
        }
        return existingProduct;
      });
    });
  };

  const handleDelete = (product: Product) => {
    const updatedProducts = selectedProducts.filter(
      (currentProduct) => currentProduct.id !== product.id,
    );
    setSelectedProducts(updatedProducts);
  };

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={4}>
      {selectedProducts.map((product) => (
        <Box key={product.id} p={4} justifyItems={"center"} display={"grid"}>
          <SmallCloseIcon
            justifySelf={"end"}
            position={"relative"}
            alignSelf={"end"}
            top={"5px"}
            color={"rgb(218, 222, 224)"}
            _hover={{ color: "rgb(87, 130, 4)" }}
            onClick={() => handleDelete(product)}
          />
          <Image
            src={product.image}
            objectFit={"contain"}
            height={"120px"}
            mb={"20px"}
          />
          <Text>{product.name}</Text>
          <Text>
            {product.price?.amount} {product.price?.currency}
          </Text>
          <Button
            mt="10px"
            bg="white"
            color="black"
            border="1px solid rgba(0, 0, 0, 0.15)"
            height="32px"
            display="flex"
            alignItems="center"
            isDisabled={selectedProducts.some((product) => product.preferred)}
            _hover={{ bg: "rgb(109, 163, 5)", color: "white" }}
            onClick={() => handleClick(product)}
          >
            {/*change to star or whatever in the corner of the box*/}
            {product.preferred ? "Preferovaná" : "Označit za preferovanou"}
          </Button>
        </Box>
      ))}
    </Grid>
  );
};

export default ChosenProducts;
