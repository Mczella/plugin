import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "./Fetch.ts";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import CreateRecipeInput from "./CreateRecipeInput.tsx";
import EditableName from "./EditableName.tsx";

interface Product {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  unit: string;
  textualAmount: string;
  badges: string;
  image: string;
  pricePerUnit: {
    amount: number;
    currency: string;
  };
  sales: string;
  packageInfo: string;
  inStock: string;
}

const CreateRecipe = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isError } = useQuery(["data", searchQuery], () =>
    fetchAll(searchQuery),
  );
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: Product[];
  }>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { productsByIds, productIds } = data ?? {
    productIds: [],
    productByIds: {},
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Box pt={"16px"} pb={"12px"} px={"calc(3% + 16px)"} ml={0}>
        <Breadcrumb
          padding={"2px 21px 16px 0px"}
          spacing="8px"
          color={"rgb(57,57,59)"}
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink fontSize={"12px"} href="/">
              Rohlik.cz
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink fontSize={"12px"} href="/#/recepty">
              Recepty
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink fontSize={"12px"} href="/#/pridat-recept">
              Nový recept
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"32px"}
        >
          <Heading
            mr={"12px"}
            fontSize={"36px"}
            fontWeight={"900"}
            lineHeight={"48px"}
          >
            Šunkofleky
          </Heading>
          <Flex flexDir={"row"}>
            <Button
              mr={"8px"}
              height={"40px"}
              bg={"rgb(109, 163, 5)"}
              fontSize={"14px"}
              fontWeight={"600"}
              rounded={"lg"}
              boxShadow={"md"}
              color={"white"}
              _hover={{ bg: "rgb(87, 130, 4)" }}
            >
              Uložit recept
            </Button>
            <IconButton
              aria-label="Select"
              boxSize={"40px"}
              _hover={{ border: "1px solid rgb(156, 164, 169)" }}
              border={"1px solid rgb(218, 222, 224)"}
              bg={"white"}
              rounded={"2xl"}
              icon={<HamburgerIcon boxSize={"18px"} />}
            />
          </Flex>
        </Flex>
      </Box>
      <Flex flexDir={"column"} mx={"calc(3% + 16px)"} gap={"32px"}>
        <Textarea
          placeholder={"Přidejte více informací k receptu a postup."}
          width="-webkit-fill-available"
          height={"80px"}
          rounded={"xl"}
          fontSize={"14px"}
          bg={"white"}
          color={"rgb(132, 140, 145)"}
          outline={"none"}
          border={"1px solid rgb(132, 140, 145)"}
        />
        <Heading>Ingredience</Heading>
        <EditableName />
        {/*<Box onClick={isOpen}>Přidat ingredienci</Box>*/}
        <CreateRecipeInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          productsByIds={productsByIds}
          productIds={productIds}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
        {Object.keys(selectedProducts).map((searchQuery) => {
          const products = selectedProducts[searchQuery];

          return (
            <React.Fragment key={searchQuery}>
              <Grid templateColumns="repeat(7, 1fr)" gap={4}>
                {products.map((product) => (
                  <Box
                    key={product.id}
                    p={4}
                    justifyItems={"center"}
                    display={"grid"}
                  >
                    <Image
                      src={product.image}
                      objectFit={"contain"}
                      height={"120px"}
                      mb={"20px"}
                    />
                    <Text>{product.name}</Text>
                    <Text>
                      {product.price.amount} {product.price.currency}
                    </Text>
                    <Button
                      mt="10px"
                      bg="white"
                      color="black"
                      border="1px solid rgba(0, 0, 0, 0.15)"
                      height="32px"
                      display="flex"
                      alignItems="center"
                      _hover={{ bg: "rgb(109, 163, 5)", color: "white" }}
                    >
                      Označit za primární
                    </Button>
                  </Box>
                ))}
              </Grid>
            </React.Fragment>
          );
        })}
        <Button
          mt="10px"
          bg="white"
          color="black"
          border="1px solid rgba(0, 0, 0, 0.15)"
          height="32px"
          display="flex"
          alignItems="center"
          _hover={{ bg: "rgb(109, 163, 5)", color: "white" }}
        >
          Přidat další ingredienci
        </Button>
      </Flex>
    </>
  );
};

export default CreateRecipe;
