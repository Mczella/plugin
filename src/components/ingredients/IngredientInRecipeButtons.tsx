import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { useMyStore } from "../store/store.tsx";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
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
  const [error, setError] = useState(false);

  const handleIngredientClick = (ingredient: NewIngredient) => {
    const newSelectedIngredient: NewIngredient = {
      ...ingredient,
      amount: amount,
    };
    addToSelectedIngredients(newSelectedIngredient);
    modalReset();
  };

  useEffect(() => {
    if (
      selectedProducts.length > 0 &&
      !selectedProducts.every(
        (product) => product.unit === selectedProducts[0].unit,
      )
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [selectedProducts]);

  return step === 1 ? (
    <>
      {error ? (
        <Text pt={"20px"} color={"red"} fontWeight={500}>
          Produkty jsou zadané v odlišných jednotkách. Prosím smažte nesprávný
          produkt.
        </Text>
      ) : null}
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
          isDisabled={
            (!selectedIngredient && selectedProducts.length === 0) || error
          }
          _hover={{ bg: "rgb(87, 130, 4)" }}
          onClick={() => setStep(2)}
        >
          Pokračovat
        </Button>
      </ButtonGroup>
    </>
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
