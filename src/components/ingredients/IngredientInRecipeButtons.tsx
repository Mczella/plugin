import { Button, ButtonGroup } from "@chakra-ui/react";
import { useMyStore } from "../store/store.tsx";
import { Dispatch, FC, SetStateAction } from "react";
import { NewIngredient } from "../types.ts";

type Props = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  modalReset: () => void;
  handleSave: () => void;
  id: string | undefined;
};
const IngredientInRecipeButtons: FC<Props> = ({
  step,
  setStep,
  modalReset,
  handleSave,
  id,
}) => {
  const {
    selectedProducts,
    selectedIngredient,
    addToSelectedIngredients,
    amount,
  } = useMyStore();

  const handleIngredientClick = (ingredient: NewIngredient) => {
    const newSelectedIngredient: NewIngredient = {
      ...ingredient,
      amount: amount,
    };
    addToSelectedIngredients(newSelectedIngredient);
    modalReset();
  };

  return step === 1 ? (
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
        bg="white"
        color="black"
        fontSize={"14px"}
        fontWeight={"600"}
        border="1px solid rgba(0, 0, 0, 0.15)"
        height="40px"
        display="flex"
        alignItems="center"
        rounded={"xl"}
        isDisabled
      >
        Zpět
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
        isDisabled={!selectedIngredient && selectedProducts.length === 0}
        _hover={{ bg: "rgb(87, 130, 4)" }}
        onClick={() => setStep(2)}
      >
        Pokračovat
      </Button>
    </ButtonGroup>
  ) : (
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
        onClick={() => modalReset()}
      >
        Zrušit
      </Button>
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
        onClick={() => setStep(1)}
      >
        Zpět
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
        {id ? "Uložit" : "Vytvořit"}
      </Button>
    </ButtonGroup>
  );
};

export default IngredientInRecipeButtons;
