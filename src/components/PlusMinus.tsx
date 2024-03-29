import { Box, Flex } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { FC, ReactNode } from "react";

type Props = {
  handleAdd: () => void;
  handleSubtract: () => void;
  amount: number;
  size: string;
  children: ReactNode;
};

const PlusMinus: FC<Props> = ({
  handleAdd,
  handleSubtract,
  amount,
  size,
  children,
}) => {
  return (
    <Flex flexDir={"row"} alignItems={"center"} gap={"13px"}>
      <Box
        h={size}
        w={size}
        border={"1px solid rgba(0, 0, 0, 0.15)"}
        rounded={"md"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        _hover={{ border: "1px solid rgb(156, 164, 169)" }}
        onClick={handleSubtract}
        boxShadow={"rgba(0, 0, 0, 0.15) 0px 6px 10px -6px;"}
      >
        <MinusIcon />
      </Box>
      {children}
      <Box
        h={size}
        w={size}
        border={"1px solid rgba(0, 0, 0, 0.15)"}
        rounded={"md"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={amount > 0 ? "rgb(109, 163, 5)" : {}}
        color={amount > 0 ? "white" : "black"}
        _hover={
          amount > 0
            ? { bg: "rgb(87, 130, 4)" }
            : { border: "1px solid rgb(156, 164, 169)" }
        }
        onClick={handleAdd}
        boxShadow={"rgba(0, 0, 0, 0.15) 0px 6px 10px -6px;"}
      >
        <AddIcon />
      </Box>
    </Flex>
  );
};

export default PlusMinus;
