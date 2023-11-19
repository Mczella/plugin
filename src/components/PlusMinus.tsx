import { Box, Flex, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { FC } from "react";

type Props = {
  handleAdd: () => void;
  handleSubtract: () => void;
  amount: number;
};

const PlusMinus: FC<Props> = ({ handleAdd, handleSubtract, amount }) => {
  return (
    <Flex flexDir={"row"} alignItems={"center"} gap={"13px"}>
      <Box
        h={"32px"}
        w={"32px"}
        border={"1px solid rgba(0, 0, 0, 0.15)"}
        rounded={"md"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        _hover={{ border: "1px solid rgb(156, 164, 169)" }}
        onClick={handleSubtract}
      >
        <MinusIcon />
      </Box>
      <Text fontWeight={"bold"}>{amount}</Text>
      <Box
        h={"32px"}
        w={"32px"}
        border={"1px solid rgba(0, 0, 0, 0.15)"}
        rounded={"md"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        _hover={{ border: "1px solid rgb(156, 164, 169)" }}
        onClick={handleAdd}
      >
        <AddIcon />
      </Box>
    </Flex>
  );
};

export default PlusMinus;
