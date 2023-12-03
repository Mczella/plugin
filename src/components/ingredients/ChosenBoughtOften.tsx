import { Button, ButtonGroup, Grid, Stack, Text } from "@chakra-ui/react";
import { useMyStore } from "../store/store.tsx";
import Ingredient from "../recipes/Ingredient.tsx";
import PlusMinus from "../PlusMinus.tsx";

const ChosenBoughtOften = () => {
  const { selectedBoughtOften, editSelectedBoughtOften } = useMyStore();
  console.log("selected", selectedBoughtOften);
  //make it just ids

  const handleDelete = (ingredientId: string) => {
    const updatedIngredients = selectedBoughtOften.filter(
      (ingredient) => ingredient.id !== ingredientId,
    );
    editSelectedBoughtOften(updatedIngredients);
  };

  //find the last time a product was bought and check whether i need it again

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={8}>
      {selectedBoughtOften.map((ingredient) => (
        <Stack alignItems={"center"}>
          <Ingredient
            ingredient={ingredient}
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
              {ingredient.name}
            </Text>
          </Ingredient>
          <ButtonGroup isAttached display={"flex"}>
            <Button
              fontSize={"13px"}
              fontWeight={"light"}
              bg={"white"}
              flex={1}
              border={"1px solid rgba(0, 0, 0, 0.15)"}
              _hover={{ border: "1px solid rgb(156, 164, 169)" }}
            >
              týdně
            </Button>
            <Button
              fontSize={"13px"}
              fontWeight={"light"}
              bg={"white"}
              flex={1}
              border={"1px solid rgba(0, 0, 0, 0.15)"}
              _hover={{ border: "1px solid rgb(156, 164, 169)" }}
            >
              měsíčně
            </Button>
          </ButtonGroup>
          <PlusMinus
            handleAdd={() => console.log}
            handleSubtract={() => console.log}
            amount={0}
            size={"32px"}
          >
            0
          </PlusMinus>
        </Stack>
      ))}
    </Grid>
  );
};

export default ChosenBoughtOften;
