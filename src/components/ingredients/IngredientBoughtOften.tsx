import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Ingredient from "../recipes/Ingredient.tsx";
import PlusMinus from "../PlusMinus.tsx";
import { useMyStore } from "../store/store.tsx";
import { useFindProductInDelivered } from "../hooks/useFindProductInDelivered.ts";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { NewIngredient } from "../types.ts";
import { useFindIngredientById } from "../hooks/useFindIngredientById.ts";

type Props = {
  ingredient: { id: NewIngredient["id"]; amount: number; frequency: number };
  setDisable: Dispatch<SetStateAction<boolean>>;
};

export const IngredientBoughtOften: FC<Props> = ({
  ingredient,
  setDisable,
}) => {
  const { selectedBoughtOften, editSelectedBoughtOften } = useMyStore();
  const [error, setError] = useState(ingredient.frequency === 0);
  const matchingIngredient = useFindIngredientById(ingredient);
  if (!matchingIngredient) {
    throw new Error("No matching ingredient found");
  }
  const productIds = matchingIngredient.selectedProducts.map(
    (product) => product.id,
  );
  const foundPurchase = useFindProductInDelivered(productIds);
  console.log({ foundPurchase });
  const handleDelete = (ingredientId: string) => {
    const updatedIngredients = selectedBoughtOften.filter(
      (ingredient) => ingredient.id !== ingredientId,
    );
    editSelectedBoughtOften(updatedIngredients);
  };

  const onSubmit = (nextValue: string) => {
    console.log(nextValue, "ahoj");
    if (!nextValue || Number(nextValue) <= 0) {
      setError(true);
      return;
    }
    setError(false);
    const updatedIngredients = selectedBoughtOften.map((existingIngredient) => {
      if (existingIngredient.id === ingredient.id) {
        return {
          ...existingIngredient,
          frequency: Number(nextValue),
        };
      }
      return existingIngredient;
    });
    editSelectedBoughtOften(updatedIngredients);
  };

  const handleAdd = () => {
    const updatedIngredients = selectedBoughtOften.map((existingIngredient) => {
      if (existingIngredient.id === ingredient.id) {
        return {
          ...existingIngredient,
          amount: existingIngredient.amount + 1,
        };
      }
      return existingIngredient;
    });
    editSelectedBoughtOften(updatedIngredients);
  };

  useEffect(() => {
    setDisable(error);
  }, [error, setDisable]);

  const handleSubtract = () => {
    const updatedIngredients = selectedBoughtOften.map((existingIngredient) => {
      if (
        existingIngredient.id === ingredient.id &&
        existingIngredient.amount > 0
      ) {
        return {
          ...existingIngredient,
          amount: existingIngredient.amount - 1,
        };
      }
      return existingIngredient;
    });
    editSelectedBoughtOften(updatedIngredients);
  };

  return (
    <Stack alignItems={"center"}>
      <Ingredient
        ingredient={matchingIngredient}
        handleDelete={() => handleDelete(ingredient.id)}
      >
        <Text
          px={"4px"}
          as={"b"}
          color={"rgb(28, 37, 41)"}
          fontSize={"14px"}
          lineHeight={"22px"}
          casing={"capitalize"}
          noOfLines={1}
          sx={{ WebkitLineClamp: "1" }}
        >
          {matchingIngredient.name}
        </Text>
      </Ingredient>
      <PlusMinus
        handleAdd={handleAdd}
        handleSubtract={handleSubtract}
        amount={ingredient.amount}
        size={"32px"}
      >
        {ingredient.amount}
      </PlusMinus>
      <Flex flexDir={"row"} gap={"5px"} alignItems={"baseline"}>
        <Text fontSize={"14px"} fontWeight={400}>
          každých
        </Text>
        <form>
          <Editable
            fontSize={"14px"}
            fontWeight={400}
            isPreviewFocusable={true}
            border={"1px solid rgba(0, 0, 0, 0.15)"}
            rounded={"md"}
            px={"5px"}
            submitOnBlur
            onSubmit={onSubmit}
            defaultValue={ingredient.frequency.toString()}
          >
            <EditablePreview />
            <Input
              as={EditableInput}
              fontSize={"14px"}
              fontWeight={400}
              type={"number"}
            />
          </Editable>
        </form>
        <Text fontSize={"14px"} fontWeight={400}>
          dní
        </Text>
      </Flex>
      {error ? (
        <Text color={"red"} fontSize={"14px"} fontWeight={400}>
          Zadejte počet dnů
        </Text>
      ) : null}
    </Stack>
  );
};
