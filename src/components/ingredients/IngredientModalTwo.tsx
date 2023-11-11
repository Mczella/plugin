import {
  Checkbox,
  Heading,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { useMyStore } from "../store/store.tsx";

const IngredientModalTwo = () => {
  const { editAmount, amount, selectedProducts, editOptimize, optimize } =
    useMyStore();
  console.log(selectedProducts);
  console.log({ optimize });
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
      <HStack>
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
        <Text>ahoj {selectedProducts[1]?.unit}</Text>
      </HStack>
      <Checkbox
        mt={"20px"}
        fontSize={"14px"}
        onChange={() => editOptimize(!optimize)}
        isChecked={optimize}
      >
        Přejete si optimalizovat recepty za účelem spotřebovat celý produkt?
      </Checkbox>
    </>
  );
};

export default IngredientModalTwo;
