import {
  Badge,
  Box,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Add from "../Add.tsx";
import { useMyStore } from "../store/store.tsx";
import RecipeComponent from "./RecipeComponent.tsx";
import { Icon } from "@chakra-ui/icons";
import BreadcrumbNav from "../BreadcrumbNav.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import AddRecipeModal from "./AddRecipeModal.tsx";
import { useEffect, useRef, useState } from "react";
import { NewIngredient, NewRecipe, RohlikProduct } from "../types.ts";

const Recipes = () => {
  // inlined selector
  console.log("loc", document.location);
  const { recipes, ingredientsInCart, ingredients } = useMyStore((state) => ({
    recipes: state.recipes,
    ingredientsInCart: state.ingredientsInCart,
    ingredients: state.ingredients,
  }));
  const { editSelectedIngredients } = useMyStore();
  const {
    isOpen: isPopupOpen,
    onOpen: onPopupOpen,
    onClose: onPopupClose,
  } = useDisclosure();
  const focusRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("1");
  const navigate = useNavigate();
  console.log(ingredientsInCart);
  const { state } = useLocation();
  console.log("hz", recipes);
  const [filteredRecipes, setFilteredRecipes] = useState<NewRecipe[]>(recipes);
  useEffect(() => {
    if (filteredRecipes.length === 0 && recipes.length > 0) {
      setFilteredRecipes(recipes);
    }
  }, [filteredRecipes.length, recipes]);

  const handleFilter = (
    ingredient: {
      name: string;
      id: string;
      amount: number;
      unit: string;
      packageAmount: number;
    },
    remainingAmount: number,
  ) => {
    const findIngredientById = (ingredientId: string) =>
      ingredients.find((ingredient) => ingredient.id === ingredientId);
    const filtered = filteredRecipes.filter((recipe) =>
      recipe.ingredients.some(
        (recipeIngredient: { id: string; amount: number }) => {
          const recipeIngredientId = findIngredientById(recipeIngredient.id);
          return (
            recipeIngredientId &&
            recipeIngredientId.selectedProducts.some(
              (id) =>
                id.id === ingredient.id &&
                recipeIngredient.amount! <= remainingAmount,
            )
          );
        },
      ),
    );

    setFilteredRecipes(filtered);
  };

  const getRemainingAmount = (
    packageAmount: number,
    ingredientAmount: number,
  ): number => {
    const packageSize = Number(packageAmount.toFixed(1));
    let remainingAmount = packageSize - ingredientAmount;

    while (remainingAmount < 0) {
      remainingAmount += packageSize;
    }
    return remainingAmount;
  };

  const renderFilteredIngredients = () => {
    const filteredIngredients: {
      ingredient: {
        name: string;
        id: RohlikProduct["id"];
        amount: number;
        unit: string;
        packageAmount: number;
        optimize: boolean;
        storeId: string;
        amountInCart: number;
      };
      remainingAmount: number;
      myIngredient: NewIngredient;
    }[] = [];

    ingredientsInCart.forEach((ingredient) => {
      const remainingAmount = Number(
        getRemainingAmount(ingredient.packageAmount, ingredient.amount).toFixed(
          1,
        ),
      );

      const myIngredient = ingredients.find(
        (ing) => ing.id === ingredient.storeId,
      );

      if (remainingAmount !== 0 && myIngredient && myIngredient.optimize) {
        filteredIngredients.push({ ingredient, remainingAmount, myIngredient });
      }
    });

    console.log("filtered", filteredIngredients);

    if (filteredIngredients.length > 0) {
      return (
        <Badge
          px={"21px"}
          py={"8px"}
          borderRadius={"16px"}
          bg={"rgb(242, 244, 244)"}
        >
          <HStack>
            <Text
              textTransform={"initial"}
              fontSize={"12px"}
              fontWeight={400}
              lineHeight={1.85}
            >
              Filtrovat recepty obsahující max.
            </Text>
            {filteredIngredients.map(
              ({ ingredient, remainingAmount, myIngredient }) => (
                <Checkbox
                  key={ingredient.id}
                  colorScheme={"green"}
                  border={"rgb(132, 140, 145)"}
                  size="lg"
                  pl={"8px"}
                  fontWeight={400}
                  fontSize={"13px"}
                  textTransform={"uppercase"}
                  onChange={() => handleFilter(ingredient, remainingAmount)}
                  // isChecked={true}
                >
                  {remainingAmount} {ingredient.unit} produktu{" "}
                  {myIngredient.name}
                </Checkbox>
              ),
            )}
          </HStack>
        </Badge>
      );
    } else {
      return null;
    }
  };

  return (
    <Box
      pt={"16px"}
      pb={"12px"}
      mx={"calc(3% + 16px)"}
      w={"1000px"}
      minH={"100vh"}
      mb={"30px"}
    >
      <BreadcrumbNav>Recepty</BreadcrumbNav>
      <Flex flexDir={"column"}>
        <Heading
          pt={"12px"}
          fontSize={"32px"}
          fontWeight={"normal"}
          lineHeight={"42px"}
        >
          Recepty
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
            Seznam vašich receptů
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
          Vytvořte si vlastní recepty z produktů, které rádi používáte.
          Pohlídáme za vás cenu i dostupnost.
        </Text>
        <Grid templateColumns="repeat(7, 1fr)" gap="10px">
          <GridItem display="flex" flexDir="column" alignItems="center">
            <Add
              text={"Přidat recept"}
              action={() => {
                editSelectedIngredients([]);
                onPopupOpen();
              }}
            >
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
            <Box onClick={() => navigate("/produkty")}>
              <Add text={"Produkty"}>
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
        <Heading
          mt={"24px"}
          mb={"24px"}
          fontSize={"24px"}
          fontWeight={"normal"}
        >
          Vaše recepty
        </Heading>
        <Flex flexDir={"row"}>{renderFilteredIngredients()}</Flex>

        <RadioGroup
          onChange={setValue}
          value={value}
          fontSize={"lg"}
          size={"lg"}
          px={"4px"}
          mt={"13px"}
          mb={"32px"}
        >
          <Stack direction="row" gap={"16px"}>
            <Radio
              colorScheme={"green"}
              p={"8px"}
              value="1"
              sx={{
                width: "16px",
                height: "16px",
                'input[type="radio"]:checked': {
                  borderColor: "rgb(109, 163, 5)",
                  backgroundColor: "rgb(109, 163, 5)",
                  color: "white",
                },
              }}
              fontSize={"12px"}
              color={"rgb(109, 163, 5)"}
              //colorScheme="green"
              boxShadow={"rgba(0, 0, 0, 0.5) 0px 1px 3px 0px inset"}
            >
              OD NEJNOVĚJŠÍHO
            </Radio>
            <Radio
              p={"8px"}
              value="2"
              sx={{ width: "16px", height: "16px" }}
              fontSize={"12px"}
              colorScheme="green"
              boxShadow={"rgba(0, 0, 0, 0.5) 0px 1px 3px 0px inset"}
            >
              OD NEJLEVNĚJŠÍHO
            </Radio>
            <Radio
              p={"8px"}
              value="3"
              fontSize={"12px"}
              sx={{ width: "16px", height: "16px" }}
              colorScheme="green"
              boxShadow={"rgba(0, 0, 0, 0.5) 0px 1px 3px 0px inset"}
            >
              OD NEJDRAŽŠÍHO
            </Radio>
            <Radio
              p={"8px"}
              value="4"
              fontSize={"12px"}
              sx={{ width: "16px", height: "16px" }}
              colorScheme="green"
              boxShadow={"rgba(0, 0, 0, 0.5) 0px 1px 3px 0px inset"}
            >
              OD NEJLEVNĚJŠÍHO ZA JEDNOTKU
            </Radio>
          </Stack>
        </RadioGroup>
        <Grid templateColumns="repeat(5, 1fr)" gap="10px">
          {filteredRecipes.map((recipe) => (
            <RecipeComponent key={recipe.id} recipe={recipe} />
          ))}
        </Grid>
      </Flex>
      <AddRecipeModal
        isOpen={isPopupOpen}
        onClose={onPopupClose}
        focusRef={focusRef}
      />
    </Box>
  );
};

export default Recipes;
