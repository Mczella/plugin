import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Heading,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import EditableName from "./EditableName.tsx";
import BreadcrumbNav from "./BreadcrumbNav.tsx";
import Add from "./Add.tsx";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import Ingredient from "./Ingredient.tsx";
import { useState } from "react";
import { useStore } from "./store.ts";

const initialIngredients = [
  "cibule",
  "kuřecí stehna",
  "mleté hovězí",
  "mleté vepřové",
  "rýže",
  "jasmínová rýže",
];

const CreateRecipe = () => {
  const { recepty, products, addProducts } = useStore();

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>(initialIngredients);

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    const updatedIngredients = ingredients.filter(
      (item) => item !== ingredient
    );
    setIngredients(updatedIngredients);
  };

  console.log({ selectedIngredients });

  console.log(recepty);
  return (
    <>
      <Box pt={"16px"} pb={"12px"} mx={"calc(3% + 16px)"} w={"1000px"}>
        {products.map((product) => (
          <div key={product}>{product}</div>
        ))}
        <Button onClick={() => addProducts(5)}>Add product</Button>
        <BreadcrumbNav />
        <Flex
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"32px"}
        >
          <EditableName />
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
      <Flex flexDir={"column"} mx={"calc(3% + 16px)"} gap={"32px"} w={"1000px"}>
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
        {/*separate inputs for existing ingredients and creating new one or the option to create a new ingredient when searching for existing?*/}
        <FormControl isRequired>
          <AutoComplete openOnFocus multiple closeOnSelect>
            <AutoCompleteInput
              rounded={"xl"}
              fontSize={"14px"}
              bg={"white"}
              color={"rgb(132, 140, 145)"}
              outline={"none"}
              // border={"1px solid rgb(132, 140, 145)"}
              // py={"10px"}
              placeholder="Vyberte z vašich ingrediencí..."
            />
            <AutoCompleteList
              border={"1px solid rgb(218, 222, 224)"}
              rounded={"lg"}
              boxShadow={"md"}
              bg={"white"}
            >
              {ingredients.map((ingredient, id) => (
                <AutoCompleteItem
                  _hover={{ bg: "gray.100" }}
                  key={`option-${id}`}
                  value={ingredient}
                  textTransform="capitalize"
                  onClick={() => handleIngredientClick(ingredient)}
                >
                  {ingredient}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </FormControl>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <Add text={"Vytvořit novou ingredienci"} type={"ingredience"} />
          {selectedIngredients.map((selectedIngredient) => (
            <Box key={selectedIngredient}>
              <Ingredient />
            </Box>
          ))}
        </Grid>
      </Flex>
    </>
  );
};

export default CreateRecipe;
