import { Flex, FormControl, Heading, Text } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { NewIngredient } from "../types.ts";
import CreateIngredientInput from "./CreateIngredientInput.tsx";
import ChosenProducts from "./ChosenProducts.tsx";
import { useMyStore } from "../store/store.tsx";
import Ingredient from "../recipes/Ingredient.tsx";

type Props = {
  setName: Dispatch<SetStateAction<string | null>>;
};

const IngredientModalOne: FC<Props> = ({ setName }) => {
  const {
    ingredients,
    selectedIngredient,
    selectIngredient,
    selectedIngredients,
  } = useMyStore();
  const [showInput, setShowInput] = useState<boolean>(false);
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
            setName(item.value);
            setShowInput(true);
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
            placeholder="Vyberte z vašich ingrediencí..."
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
                  setShowInput(false);
                }}
              >
                {ingredient.name}
              </AutoCompleteItem>
            ))}
            <AutoCompleteCreatable>
              {({ value }) =>
                selectedIngredients.some(
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
        {showInput ? (
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
    </>
  );
};

export default IngredientModalOne;
