import { Box, Flex, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  text: string;
  children: ReactNode;
  action?: () => void;
};

const Add: FC<Props> = ({ text, children, action }) => {
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
      onClick={action}
    >
      <Box
        bg={"white"}
        h={"92px"}
        display={"flex"}
        borderTopRadius={"3xl"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {children}
      </Box>
      <Box
        h={"52px"}
        bg={"rgb(109, 163, 5)"}
        borderBottomRadius={"3xl"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text
          fontSize={"14px"}
          fontWeight={"600"}
          lineHeight={"22px"}
          textAlign={"center"}
          color={"white"}
        >
          {text}
        </Text>
      </Box>
    </Flex>
  );
};

export default Add;
