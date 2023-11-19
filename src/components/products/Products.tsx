import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Add from "../Add.tsx";
import { useMyStore } from "../store/store.tsx";
import { Icon } from "@chakra-ui/icons";
import BreadcrumbNav from "../BreadcrumbNav.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import Ingredient from "../recipes/Ingredient.tsx";
import IngredientModal from "../ingredients/IngredientModal.tsx";
import PlusMinus from "../PlusMinus.tsx";
import { NewIngredient } from "../types.ts";

const Products = () => {
  const { ingredients, ingredientsInCart } = useMyStore();
  // const [productArray, setProductArray] = useState<Product["id"][]>([]);
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  const focusRef = useRef<HTMLInputElement>(null);

  const { state } = useLocation();
  const navigate = useNavigate();

  const getAmountInCart = (ingredient: NewIngredient): number => {
    return ingredientsInCart.reduce((totalAmount, ingredientInCart) => {
      const matchingProduct = ingredient.selectedProducts.find(
        (product) => product.id === ingredientInCart.id,
      );

      if (matchingProduct) {
        const amount = Math.ceil(
          ingredientInCart.amount / ingredientInCart.packageAmount,
        );
        return totalAmount + amount;
      }

      return totalAmount;
    }, 0);
  };

  return (
    <>
      <Box
        pt={"16px"}
        pb={"12px"}
        mx={"calc(3% + 16px)"}
        w={"1000px"}
        minH={"100vh"}
        mb={"30px"}
      >
        <BreadcrumbNav type={"produkty"} />
        <Flex flexDir={"column"}>
          <Heading
            pt={"12px"}
            fontSize={"36px"}
            fontWeight={900}
            lineHeight={"48px"}
          >
            Produkty
          </Heading>
          <Flex flexDir={"row"} alignItems={"center"} gap={"10px"} mt={"32px"}>
            <Badge
              bg={"rgb(109, 163, 5)"}
              rounded={"2xl"}
              fontSize={"12px"}
              fontWeight={400}
              lineHeight={"22px"}
              px={"8px"}
              variant={"solid"}
              color={"white"}
            >
              <Text casing={"capitalize"}>Nové</Text>
            </Badge>
            <Heading fontSize={"20px"} fontWeight={900} lineHeight={"30px"}>
              Seznam vámi vytvořených ingrediencí
            </Heading>
            <Icon color={"rgb(28, 37, 41)"} boxSize={"20px"} />
          </Flex>
          <Text
            mt={"8px"}
            mb={"16px"}
            fontSize={"16px"}
            fontWeight={400}
            lineHeight={"24px"}
          >
            Nakupte jednotlivé produkty s jistotou nejlepší ceny.
          </Text>
          <Grid templateColumns="repeat(7, 1fr)" gap="10px">
            <GridItem display="flex" flexDir="column" alignItems="center">
              <Add
                text={"Přidat ingredienci"}
                type={"pridat-ingredienci"}
                onOpen={onOpen}
              />
            </GridItem>
            <GridItem display="flex" flexDir="column" alignItems="center">
              <Box onClick={() => navigate("/recepty")}>
                <Add text={"Recepty"} type={"odkaz"} />
              </Box>
            </GridItem>
          </Grid>
          {state && (
            <Text mt={"24px"} color={"red"}>
              {state.error}
            </Text>
          )}
          <Heading
            mt={"24px"}
            mb={"24px"}
            fontSize={"24px"}
            fontWeight={"normal"}
          >
            Vaše produkty
          </Heading>
          {/*<RadioGroup onChange={setValue} value={value}>*/}
          {/*  <Stack direction="row" gap={"16px"}>*/}
          {/*    <Radio value="1" fontSize={"12px"}>*/}
          {/*      OD NEJNOVĚJŠÍHO*/}
          {/*    </Radio>*/}
          {/*    <Radio value="2" fontSize={"12px"}>*/}
          {/*      OD NEJLEVNĚJŠÍHO*/}
          {/*    </Radio>*/}
          {/*    <Radio value="3" fontSize={"12px"}>*/}
          {/*      OD NEJDRAŽŠÍHO*/}
          {/*    </Radio>*/}
          {/*    <Radio value="4" fontSize={"12px"}>*/}
          {/*      OD NEJLEVNĚJŠÍHO ZA JEDNOTKU*/}
          {/*    </Radio>*/}
          {/*  </Stack>*/}
          {/*</RadioGroup>*/}
          <Grid templateColumns="repeat(5, 1fr)" gap="10px">
            {ingredients.map((ingredient) => {
              const amount = getAmountInCart(ingredient);

              return (
                <Flex
                  flexDir={"column"}
                  alignItems={"center"}
                  mb={"20px"}
                  key={ingredient.id}
                >
                  <Ingredient ingredient={ingredient} />
                  {ingredientsInCart.some(
                    (item) => ingredient.id === item.storeId,
                  ) ? (
                    <PlusMinus
                      amount={amount}
                      handleAdd={() => console.log("h")}
                      handleSubtract={() => console.log("h")}
                    />
                  ) : (
                    <Button
                      bg="white"
                      color="black"
                      border="1px solid rgba(0, 0, 0, 0.15)"
                      height="32px"
                      display="flex"
                      rounded={"lg"}
                      alignItems="center"
                      fontSize={"13px"}
                      fontWeight={"bold"}
                      // isDisabled={totalPrice === 0}
                      _hover={{ bg: "rgb(87, 130, 4)", color: "white" }}
                      // onClick={handleBuy}
                    >
                      Do košíku
                    </Button>
                  )}
                </Flex>
              );
            })}
          </Grid>
        </Flex>
        <IngredientModal
          focusRef={focusRef}
          isOpen={isOpen}
          onClose={onClose}
          type={"create"}
        />
      </Box>
    </>
  );
};

export default Products;
