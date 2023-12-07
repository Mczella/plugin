import { FormControl, Heading } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { FC, useEffect, useState } from "react";
import { NewIngredient } from "../types.ts";
import { useMyStore } from "../store/store.tsx";

type Props = {
  create?: boolean;
  heading: string;
};

const BoughtOftenModal: FC<Props> = ({ heading }) => {
  const { ingredients, selectedBoughtOften, addToSelectedBoughtOften } =
    useMyStore();
  const [currentIngredients, setCurrentIngredients] =
    useState<NewIngredient[]>(ingredients);

  useEffect(() => {
    const filteredIngredients = ingredients.filter(
      (ingredient) =>
        !selectedBoughtOften.some((selected) => selected.id === ingredient.id),
    );

    setCurrentIngredients(filteredIngredients);
  }, [selectedBoughtOften, ingredients]);

  return (
    <>
      <Heading
        fontSize={"24px"}
        fontWeight={900}
        lineHeight={"32px"}
        mb={"24px"}
      >
        {heading}
      </Heading>
      <FormControl isRequired>
        <AutoComplete
          // openOnFocus
          closeOnSelect
          creatable
          autoComplete={"off"}
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
            placeholder={"Vyberte z vašich produktů..."}
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
                  console.log(selectedBoughtOften, "cau");
                  addToSelectedBoughtOften({
                    id: ingredient.id,
                    amount: 1,
                    frequency: 0,
                  });
                }}
              >
                {ingredient.name}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </FormControl>
    </>
  );
};

export default BoughtOftenModal;
