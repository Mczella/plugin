import { Flex } from "@chakra-ui/react";

const Ingredient = () => {
  return (
    <Flex
      flexDir={"column"}
      justify={"flex-start"}
      cursor={"pointer"}
      rounded={"3xl"}
      boxShadow={
        "rgba(0, 0, 0, 0.01) 0px 0px 12px, rgba(0, 0, 0, 0.06) 0px 0px 10px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px;"
      }
      w={"144px"}
      h={"144px"}
      justifyContent={"center"}
      mb={"8px"}
    >
      ahoj
    </Flex>
  );
};

export default Ingredient;
