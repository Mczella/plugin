import { Flex, Heading } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const ShowSuggestion: FC<Props> = ({ children }) => {
  const numberOfChildren = React.Children.count(children);
    console.log("children", numberOfChildren)
  return numberOfChildren > 0 ? (
    <>
      <Heading mt={"24px"} mb={"16px"} fontSize={"20px"} fontWeight={900}>
        Nepotřebujete doplnit zásoby?
      </Heading>
      <Flex
        w="full"
        overflow="auto"
        scrollBehavior={"smooth"}
        pos="relative"
        sx={{
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          "::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
        border={"1px solid rgb(242, 244, 244)"}
        borderRadius={"4px"}
        py={"20px"}
      >
        {children}
      </Flex>
    </>
  ) : null;
};
