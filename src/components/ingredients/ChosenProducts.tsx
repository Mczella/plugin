import { Badge, Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { Preferred, Price, Product, Stock } from "../types.ts";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useMyStore } from "../store/store.tsx";

const ChosenProducts = () => {
  const { selectedProducts, editSelectedProducts, deleteSelectedProduct } =
    useMyStore();
  console.log("selected", selectedProducts);
  const handleClick = (product: Product & Stock & Price & Preferred) => {
    const updatedProducts = selectedProducts.map(
      (existingProduct: Product & Stock & Price & Preferred) => {
        if (existingProduct.id === product.id) {
          return { ...existingProduct, preferred: true };
        }
        return existingProduct;
      },
    );
    editSelectedProducts(updatedProducts);
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={8}>
      {selectedProducts.map((product) => (
        <Box key={product.id} p={4} justifyItems={"center"} display={"grid"}>
          <Box
            w={"150px"}
            h={"150px"}
            position={"relative"}
            pt={"10px"}
            mt={"20px"}
            display={"grid"}
          >
            <Box position={"absolute"} top={0}>
              <Image
                w={"24px"}
                src={
                  "https://www.rohlik.cz/img/icons/icon-favorite-active.svg?v3"
                }
              />
            </Box>
            <SmallCloseIcon
              position={"absolute"}
              top={0}
              right={0}
              color={"rgb(218, 222, 224)"}
              _hover={{ color: "rgb(87, 130, 4)" }}
              onClick={() => deleteSelectedProduct(product)}
            />
            <Image
              justifySelf={"center"}
              alignSelf={"center"}
              src={product.image}
              objectFit={"contain"}
              maxH={"100px"}
              maxW={"130px"}
              mb={"20px"}
            />
            <Badge
              justifySelf={"center"}
              position={"absolute"}
              bottom={0}
              bg={"rgba(0, 0, 0, 0.5)"}
              color={"white"}
              fontSize={"12px"}
              fontWeight={600}
              py={"2px"}
              px={"7px"}
              rounded={"2xl"}
            >
              {product.unit}
            </Badge>
          </Box>
          <Text
            cursor={"pointer"}
            pt={"20px"}
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
            {product.name}
          </Text>
          <Text fontSize="16px" lineHeight="1.4" fontWeight={"bold"}>
            {Number(product.price?.amount.toFixed(1))} Kč
          </Text>
          {/*<Button*/}
          {/*  mt="10px"*/}
          {/*  bg="white"*/}
          {/*  color="black"*/}
          {/*  border="1px solid rgba(0, 0, 0, 0.15)"*/}
          {/*  height="32px"*/}
          {/*  display="flex"*/}
          {/*  alignItems="center"*/}
          {/*  isDisabled={selectedProducts.some((product) => product.preferred)}*/}
          {/*  _hover={{ bg: "rgb(109, 163, 5)", color: "white" }}*/}
          {/*  onClick={() => handleClick(product)}*/}
          {/*>*/}
          {/*  /!*change to a star or whatever in the corner of the box*!/*/}
          {/*  {product.preferred ? "Preferovaná" : "Označit za preferovanou"}*/}
          {/*</Button>*/}
        </Box>
      ))}
    </Grid>
  );
};

export default ChosenProducts;
