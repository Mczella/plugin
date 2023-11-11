import {
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useMyStore } from "../store/store.tsx";

const IngredientModalTwo = () => {
  const { editAmount, amount } = useMyStore();
  return (
    <>
      <Heading
        fontSize={"24px"}
        fontWeight={900}
        lineHeight={"32px"}
        mb={"24px"}
      >
        Zadejte množství vybrané ingredience pro tento recept
      </Heading>
      <NumberInput
        min={0.1}
        max={3000}
        width={"600px"}
        height={"40px"}
        defaultValue={amount ? amount : 0}
        isRequired
        onChange={(_, valueAsNumber) => editAmount(valueAsNumber)}
      >
        <NumberInputField
          id={"amount"}
          placeholder={"Zadejte množství"}
          type={"number"}
          height={"40px"}
          rounded={"xl"}
          fontSize={"14px"}
          bg={"white"}
          color={"rgb(132, 140, 145)"}
          outline={"none"}
          border={"1px solid rgb(132, 140, 145)"}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};

export default IngredientModalTwo;
