import {
  Checkbox,
  Flex,
  FormControl,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { FC, useEffect, useState } from "react";
import { NewIngredient } from "../types.ts";
import CreateIngredientInput from "./CreateIngredientInput.tsx";
import ChosenProducts from "./ChosenProducts.tsx";
import { useMyStore } from "../store/store.tsx";
import Ingredient from "../recipes/Ingredient.tsx";

type Props = {
  type: "create" | "createInRecipe" | "edit" | "editInRecipe";
};

const IngredientModalOne: FC<Props> = ({ type }) => {
  const {
    ingredients,
    selectedIngredient,
    selectIngredient,
    selectedIngredients,
    editName,
    name,
    editOptimize,
    optimize,
    sortBy,
    editSortBy,
  } = useMyStore();
  const [currentIngredients, setCurrentIngredients] =
    useState<NewIngredient[]>(ingredients);

  useEffect(() => {
    const filteredIngredients = ingredients.filter(
      (ingredient) =>
        !selectedIngredients.some(
          (selected) => selected.id === ingredient.id,
        ) &&
        (!selectedIngredient || selectedIngredient.id !== ingredient.id),
    );

    setCurrentIngredients(filteredIngredients);
  }, [selectedIngredients, selectedIngredient]);

  return (
    <>
      <Heading
        fontSize={"24px"}
        fontWeight={900}
        lineHeight={"32px"}
        mb={"24px"}
      >
        Přidat ingredienci
      </Heading>
      <FormControl isRequired>
        <AutoComplete
          // openOnFocus
          closeOnSelect
          creatable
          autoComplete={"off"}
          onCreateOption={({ item }: { item: { value: string } }) => {
            editName(item.value);
            selectIngredient(null);
          }}
        >
          <AutoCompleteInput
            width={"740px"}
            height={"40px"}
            rounded={"xl"}
            fontSize={"14px"}
            bg={"white"}
            color={"rgb(132, 140, 145)"}
            outline={"none"}
            mb={"24px"}
            border={"1px solid rgb(132, 140, 145)"}
            placeholder={
              name != null
                ? name
                : type === "create"
                ? "Vytvořte novou ingredienci..."
                : "Vyberte z vašich ingrediencí..."
            }
          />
          <AutoCompleteList
            border={"1px solid rgb(218, 222, 224)"}
            rounded={"lg"}
            boxShadow={"md"}
            bg={"white"}
          >
            {currentIngredients.map((ingredient) => (
              <AutoCompleteItem
                _hover={{ bg: "gray.100" }}
                key={ingredient.id}
                value={ingredient.name}
                textTransform="capitalize"
                onClick={() => {
                  selectIngredient(ingredient);
                  editName(null);
                }}
              >
                {ingredient.name}
              </AutoCompleteItem>
            ))}
            <AutoCompleteCreatable>
              {({ value }) =>
                name ? (
                  <Text>
                    Změnit název na <Text as={"b"}>{value}</Text>.
                  </Text>
                ) : selectedIngredients.some(
                    (selected) => selected.name === value,
                  ) ? (
                  <Text>Tato ingredience již existuje.</Text>
                ) : (
                  <Text>
                    Vytvořit ingredienci s názvem <Text as={"b"}>{value}</Text>.
                  </Text>
                )
              }
            </AutoCompleteCreatable>
          </AutoCompleteList>
        </AutoComplete>
        {name ? (
          <>
            <CreateIngredientInput />
            <ChosenProducts />
          </>
        ) : selectedIngredient ? (
          <Flex justifyContent={"center"}>
            <Ingredient ingredient={selectedIngredient} />
          </Flex>
        ) : null}
      </FormControl>
      <>
        <Checkbox
          colorScheme={"green"}
          size="lg"
          mt={"20px"}
          border={"rgb(132, 140, 145)"}
          onChange={() => editOptimize(!optimize)}
          isChecked={optimize}
        >
          <Text fontSize={"14px"} fontWeight={400}>
            Přejete si optimalizovat recepty za účelem spotřebovat celý produkt?
          </Text>
        </Checkbox>
        <HStack gap={"20px"}>
          <Checkbox
            colorScheme="green"
            size="lg"
            mt="20px"
            border="rgb(132, 140, 145)"
            onChange={() =>
              editSortBy(sortBy === "price" ? "pricePerUnit" : "price")
            }
            isChecked={sortBy === "price"}
          >
            <Text fontSize="14px" fontWeight={400}>
              Řadit dle celkové ceny
            </Text>
          </Checkbox>
          <Checkbox
            colorScheme="green"
            size="lg"
            mt="20px"
            value="pricePerUnit"
            border="rgb(132, 140, 145)"
            onChange={() =>
              editSortBy(sortBy === "price" ? "pricePerUnit" : "price")
            }
            isChecked={sortBy === "pricePerUnit"}
          >
            <Text fontSize="14px" fontWeight={400}>
              Řadit dle ceny za jednotku
            </Text>
          </Checkbox>
        </HStack>
      </>
    </>
  );
};

export default IngredientModalOne;
