import { FormControl, Text } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Dispatch, FC, SetStateAction } from "react";
import { NewIngredient } from "../types.ts";

type Props = {
  setName: Dispatch<SetStateAction<string | null>>;
  setShowInput: Dispatch<SetStateAction<boolean>>;
  currentIngredients: NewIngredient[];
  setSelectedIngredient: Dispatch<SetStateAction<NewIngredient | null>>;
};

const Autocomplete: FC<Props> = ({
  setName,
  setShowInput,
  currentIngredients,
  setSelectedIngredient,
}) => {
  return (
    <FormControl isRequired>
      <AutoComplete
        openOnFocus
        closeOnSelect
        creatable
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
                setSelectedIngredient(ingredient);
                setShowInput(false);
              }}
            >
              {ingredient.name}
            </AutoCompleteItem>
          ))}
          <AutoCompleteCreatable>
            {({ value }) => (
              <Text>
                Vytvořit ingredienci s názvem <Text as={"b"}>{value}</Text>.
              </Text>
            )}
          </AutoCompleteCreatable>
        </AutoCompleteList>
      </AutoComplete>
    </FormControl>
  );
};

export default Autocomplete;
