import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Add from "../Add.tsx";
import { useMyStore } from "../store/store.tsx";
import { Icon } from "@chakra-ui/icons";
import BreadcrumbNav from "../BreadcrumbNav.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import IngredientModal from "../ingredients/IngredientModal.tsx";
import Product from "./Product.tsx";
import IngredientModalOne from "../ingredients/IngredientModalOne.tsx";
import IngredientButtons from "../ingredients/IngredientButtons.tsx";
import ChosenBoughtOften from "../ingredients/ChosenBoughtOften.tsx";
import BoughtOftenModal from "../ingredients/BoughtOftenModal.tsx";
import { BoughtOftenButtons } from "../ingredients/BoughtOftenButtons.tsx";
import { BoughtOftenSuggestion } from "./BoughtOftenSuggestion.tsx";

const Products = () => {
  // const [productArray, setProductArray] = useState<Product["id"][]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [disable, setDisable] = useState(false);
  const focusRef = useRef<HTMLInputElement>(null);
  const {
    isOpen: isIngredientsModalOpen,
    onOpen: onIngredientsModalOpen,
    onClose: onIngredientsModalClose,
  } = useDisclosure();
  const ingredientsFocusRef = useRef<HTMLInputElement>(null);

  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    addIngredient,
    selectedProducts,
    name,
    ingredients,
    optimize,
    sortBy,
    ingredientsBoughtOften,
  } = useMyStore();

  const handleSave = () => {
    if (name != null && selectedProducts.length > 0) {
      const updatedSelectedProducts = selectedProducts.map(
        ({ id, preferred }) => ({ id, preferred }),
      );
      const newIngredientCreate = {
        name,
        selectedProducts: updatedSelectedProducts,
        id: Date.now().toString(36),
        unit: selectedProducts[0].unit,
        optimize,
        sortBy,
      };
      addIngredient(newIngredientCreate);
      onClose();
    }
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
        <BreadcrumbNav>Produkty</BreadcrumbNav>
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
              <Add text={"Přidat produkt"} action={onOpen}>
                <Image
                  as={"svg"}
                  height="24px"
                  viewBox="0 0 16 16"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#6DA305"
                >
                  <path d="M13 9H9V13C9 13.55 8.55 14 8 14C7.45 14 7 13.55 7 13V9H3C2.45 9 2 8.55 2 8C2 7.45 2.45 7 3 7H7V3C7 2.45 7.45 2 8 2C8.55 2 9 2.45 9 3V7H13C13.55 7 14 7.45 14 8C14 8.55 13.55 9 13 9Z"></path>
                </Image>
              </Add>
            </GridItem>
            <GridItem display="flex" flexDir="column" alignItems="center">
              <Add text={"Pravidelné nákupy"} action={onIngredientsModalOpen}>
                <Image
                  as={"svg"}
                  height="24px"
                  viewBox="0 0 16 16"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#6DA305"
                >
                  <path d="M13 9H9V13C9 13.55 8.55 14 8 14C7.45 14 7 13.55 7 13V9H3C2.45 9 2 8.55 2 8C2 7.45 2.45 7 3 7H7V3C7 2.45 7.45 2 8 2C8.55 2 9 2.45 9 3V7H13C13.55 7 14 7.45 14 8C14 8.55 13.55 9 13 9Z"></path>
                </Image>
              </Add>
            </GridItem>
            <GridItem display="flex" flexDir="column" alignItems="center">
              <Box onClick={() => navigate("/recepty")}>
                <Add text={"Recepty"}>
                  <Image
                    as={"svg"}
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.2929 9.70708C20.5789 9.99307 21.009 10.0786 21.3827 9.92385C21.7564 9.76907 22 9.40443 22 8.99997V2.99997C22 2.44768 21.5523 1.99997 21 1.99997H15C14.5955 1.99997 14.2309 2.24361 14.0761 2.61729C13.9213 2.99096 14.0069 3.42108 14.2929 3.70708L16.2322 5.64641L9.58574 12.2929C9.19522 12.6834 9.19522 13.3166 9.58574 13.7071L10.2928 14.4142C10.6834 14.8048 11.3165 14.8048 11.7071 14.4142L18.3536 7.76774L20.2929 9.70708Z"
                      fill="#6DA305"
                    />
                    <path
                      d="M4.5 8.00006C4.5 7.72392 4.72386 7.50006 5 7.50006H10.0625C10.6148 7.50006 11.0625 7.05234 11.0625 6.50006V5.50006C11.0625 4.94777 10.6148 4.50006 10.0625 4.50006H5C3.067 4.50006 1.5 6.06706 1.5 8.00006V19.0001C1.5 20.9331 3.067 22.5001 5 22.5001H16C17.933 22.5001 19.5 20.9331 19.5 19.0001V13.9376C19.5 13.3853 19.0523 12.9376 18.5 12.9376H17.5C16.9477 12.9376 16.5 13.3853 16.5 13.9376V19.0001C16.5 19.2762 16.2761 19.5001 16 19.5001H5C4.72386 19.5001 4.5 19.2762 4.5 19.0001V8.00006Z"
                      fill="#6DA305"
                    />
                  </Image>
                </Add>
              </Box>
            </GridItem>
          </Grid>
          {state && (
            <Text mt={"24px"} color={"red"}>
              {state.error}
            </Text>
          )}
          <Heading mt={"24px"} mb={"16px"} fontSize={"20px"} fontWeight={900}>
            Nepotřebujete doplnit zásoby?
          </Heading>
          <Grid
            templateColumns="repeat(5, 1fr)"
            gap="10px"
            border={"1px solid rgb(242, 244, 244)"}
            borderRadius={"4px"}
            py={"20px"}
          >
            {ingredientsBoughtOften.map((ingredient) => (
              <BoughtOftenSuggestion
                key={ingredient.id}
                ingredient={ingredient}
              />
            ))}
          </Grid>

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
            {ingredients.map((ingredient) => (
              <Product ingredient={ingredient} key={ingredient.id} />
            ))}
          </Grid>
        </Flex>
        <IngredientModal
          focusRef={focusRef}
          isOpen={isOpen}
          onClose={onClose}
          create
        >
          <IngredientModalOne create heading={"Přidat ingredienci"} />

          <IngredientButtons onClose={onClose} handleSave={handleSave} />
        </IngredientModal>
        <IngredientModal
          focusRef={ingredientsFocusRef}
          isOpen={isIngredientsModalOpen}
          onClose={onIngredientsModalClose}
          create
        >
          <BoughtOftenModal create heading={"Opakovaně kupované produkty"} />
          <ChosenBoughtOften setDisable={setDisable} />
          <BoughtOftenButtons
            disable={disable}
            onClose={onIngredientsModalClose}
          />
        </IngredientModal>
      </Box>
    </>
  );
};

export default Products;
