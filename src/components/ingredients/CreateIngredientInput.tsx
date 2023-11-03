import { Box, Flex, IconButton, Image, Input, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";
import { Product } from "../types.ts";

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  productIds: string[];
  productsByIds: { [p: string]: Product };
  setSelectedProducts: Dispatch<SetStateAction<Product[]>>;
  selectedProducts: Product[];
}

const CreateIngredientInput: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  productsByIds,
  productIds,
  setSelectedProducts,
  selectedProducts,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleFocus = (): void => {
    setIsDropdownOpen(true);
  };

  const dropdownRef = useOutsideClick(() => {
    setIsDropdownOpen(false);
  });

  const handleAddToRecipe = (product: Product) => {
    const productWithPreferred = { ...product, preferred: false };
    setSelectedProducts((prevState) => [...prevState, productWithPreferred]);
    console.log(selectedProducts);
  };

  console.log(isDropdownOpen);

  return (
    <Flex alignItems={"center"} flexDir={"column"}>
      <Box ref={dropdownRef}>
        <Input
          width={"740px"}
          onFocus={handleFocus}
          height={"40px"}
          rounded={"xl"}
          fontSize={"14px"}
          bg={"white"}
          color={"rgb(132, 140, 145)"}
          outline={"none"}
          border={"1px solid rgb(132, 140, 145)"}
          placeholder={
            "Vyhledejte produkty, které odpovídají vaším požadavkům na danou ingredienci."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {productsByIds &&
        Object.keys(productsByIds).length > 0 &&
        isDropdownOpen ? (
          <Box
            zIndex={1}
            width={"740px"}
            maxHeight={"480px"}
            overflow="scroll"
            sx={{
              "::-webkit-scrollbar": {
                color: "#007 #bada55",
              },
            }}
            border={"1px solid rgb(218, 222, 224)"}
            rounded={"lg"}
            boxShadow={"md"}
            position={"absolute"}
            bg={"white"}
          >
            {productIds
              .filter(
                (productId) =>
                  !selectedProducts.find((product) => product.id === productId),
              )
              .map((productId) => {
                const product = productsByIds[productId];
                return (
                  <Box
                    key={productId}
                    width={"740px"}
                    borderBottom={
                      productIds.indexOf(productId) === productIds.length - 1
                        ? "none"
                        : "1px solid rgb(218, 222, 224)"
                    }
                    p={"10px"}
                    _hover={{ bg: "gray.100" }}
                    onClick={() => console.log("ahoj")}
                  >
                    <Flex
                      flexDir={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Flex flexDir={"row"} alignItems={"center"}>
                        <Box
                          width={"64px"}
                          height={"64px"}
                          display={"flex"}
                          px={"8px"}
                          py={"8px"}
                        >
                          <Image
                            src={product.image}
                            alt="panda"
                            objectFit={"contain"}
                            alignItems={"center"}
                            maxH={"-webkit-fill-available"}
                          />
                        </Box>
                        <Flex
                          flexDir={"column"}
                          alignItems={"flex-start"}
                          width={"450px"}
                        >
                          <Text
                            fontSize={"13px"}
                            fontWeight={400}
                            mr={"8px"}
                            lineHeight={"22px"}
                          >
                            {product.name}
                          </Text>
                          <Text
                            fontSize={"14px"}
                            fontWeight={600}
                            lineHeight={"22px"}
                          >
                            {product.price?.amount} {product.price?.currency}
                          </Text>
                        </Flex>
                      </Flex>
                      <Box>
                        <IconButton
                          aria-label={"vybrat"}
                          height={"40px"}
                          width={"40px"}
                          mr={"12px"}
                          _hover={{ border: "1px solid rgb(156, 164, 169)" }}
                          border={"1px solid rgb(218, 222, 224)"}
                          bg={"white"}
                          rounded={"2xl"}
                          icon={<AddIcon color={"black"} boxSize={6} />}
                          onClick={() => handleAddToRecipe(product)}
                        />
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
          </Box>
        ) : null}
      </Box>
    </Flex>
  );
};

export default CreateIngredientInput;