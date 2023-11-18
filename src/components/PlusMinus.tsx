import { Box, Flex, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const PlusMinus = () => {
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
      >
        <MinusIcon />
      </Box>
      <Text fontWeight={"bold"}>1</Text>
      <Box
        h={"32px"}
        w={"32px"}
        border={"1px solid rgba(0, 0, 0, 0.15)"}
        rounded={"md"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        _hover={{ border: "1px solid rgb(156, 164, 169)" }}
      >
        <AddIcon />
      </Box>
    </Flex>
  );
};

export default PlusMinus;
