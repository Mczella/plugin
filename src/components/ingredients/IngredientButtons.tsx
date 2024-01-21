import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useMyStore } from "../store/store.tsx";
import useIsUnitError from "../hooks/useIsUnitError.ts";

type Props = {
  onClose: () => void;
  handleSave: () => void;
  id?: string;
};

const IngredientButtons: FC<Props> = ({ onClose, handleSave, id }) => {
  const { selectedProducts } = useMyStore();
  const error = useIsUnitError();

  return (
    <>
      {error === "wrong" ? (
        <Text pt={"20px"} color={"red"} fontWeight={500}>
          Produkty jsou zadané v odlišných jednotkách. Prosím smažte nesprávný
          produkt.
        </Text>
      ) : error === "check" ? (
        <Text pt={"20px"} color={"red"} fontWeight={500}>
          Produkty jsou zadané v odlišných jednotkách. Zkontrolujte prosím, že
          všechny produkty a jednotky, ve kterých jsou zadané, jsou zaměnitelné.
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
            onClose();
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
          isDisabled={selectedProducts.length === 0 || error === "wrong"}
          _hover={{ bg: "rgb(87, 130, 4)" }}
          onClick={() => handleSave()}
        >
          {id ? "Uložit" : "Vytvořit"}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default IngredientButtons;
