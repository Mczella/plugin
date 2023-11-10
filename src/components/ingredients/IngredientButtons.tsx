import { Button, ButtonGroup } from "@chakra-ui/react";
import { useMyStore } from "../store/store.tsx";
import { FC } from "react";
import { NewIngredient } from "../types.ts";

type Props = {
  modalReset: () => void;
  handleSave: () => void;
};
const IngredientButtons: FC<Props> = ({ modalReset, handleSave }) => {
  const { selectedIngredient, addToSelectedIngredients, amount } = useMyStore();

  const handleIngredientClick = (ingredient: NewIngredient) => {
    const newSelectedIngredient: NewIngredient = {
      ...ingredient,
      amount: amount,
    };
    addToSelectedIngredients(newSelectedIngredient);
    modalReset();
  };

  return (
    <ButtonGroup
      mt={"40px"}
      display={"flex"}
      justifyContent={"center"}
      gap={"5px"}
    >
      <Button
        bg="white"
        color="black"
        fontSize={"14px"}
        fontWeight={"600"}
        border="1px solid rgba(0, 0, 0, 0.15)"
        height="40px"
        display="flex"
        alignItems="center"
        rounded={"xl"}
        onClick={() => {
          modalReset();
        }}
      >
        Zrušit
      </Button>
      <Button
        height={"40px"}
        w={"360px"}
        bg={"rgb(109, 163, 5)"}
        fontSize={"14px"}
        fontWeight={"600"}
        rounded={"xl"}
        boxShadow={"md"}
        color={"white"}
        isDisabled={amount === 0}
        _hover={{ bg: "rgb(87, 130, 4)" }}
        onClick={() => {
          selectedIngredient && amount > 0
            ? handleIngredientClick(selectedIngredient)
            : handleSave();
        }}
      >
        Vytvořit
      </Button>
    </ButtonGroup>
  );
};

export default IngredientButtons;
