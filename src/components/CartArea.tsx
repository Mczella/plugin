import { useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CartButton from "./CartButton.tsx";
import { AddIcon, MinusIcon, SmallCloseIcon } from "@chakra-ui/icons";

const CartArea = () => {
  const [parentElement] = useState(() =>
    document.querySelector("#cartContent"),
  );

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <Text
        color={"rgb(93, 103, 108)"}
        bg={"rgb(242, 244, 244)"}
        fontSize={"13px"}
        fontWeight={"700"}
        letterSpacing={"-0.4px"}
        px={"16px"}
        py={"8px"}
      >
        Recepty
      </Text>
      <Flex
        bg={"white"}
        flexDir={"row"}
        borderBottom={"1px solid rgb(218, 222, 224)"}
        p={"10px 16px 10px 8px"}
        justifyContent={"space-between"}
      >
        <Flex>
          <Flex flexDir={"row"}>
            <Box w={"45px"} h={"45px"} mr={"5px"}>
              <Image
                src={
                  "https://jz.img0.cz/media/1b/3c/1b3c0bf1-1b76-44dd-b19e-39b79a8da1ce.jpg.570x570_q85_crop.jpg"
                }
              />
            </Box>
            <Flex flexDir={"column"} justify={"space-between"}>
              <Flex
                p={"3px 25px 10px 0px"}
                ml={"5px"}
                flexDir={"column"}
                alignItems={"left"}
                gap={"4px"}
              >
                <Text
                  fontSize={"12px"}
                  lineHeight={1.5}
                  color={"rgb(28, 37, 41)"}
                >
                  Svíčková
                </Text>
                <Text
                  color={"rgb(28, 37, 41)"}
                  fontStyle={"italic"}
                  fontSize={"12px"}
                >
                  6 porcí
                </Text>
              </Flex>
              <Flex
                flexDir={"row"}
                gap={"14px"}
                alignItems={"center"}
                mb={"10px"}
                ml={"3px"}
              >
                <Box
                  h={"20px"}
                  w={"20px"}
                  border={"1px solid rgba(0, 0, 0, 0.15)"}
                  rounded={"md"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _hover={{ border: "1px solid rgb(156, 164, 169)" }}
                >
                  <MinusIcon boxSize={"4"} />
                </Box>
                <Text fontWeight={"bold"} fontSize={"12px"}>
                  1
                </Text>
                <Box
                  h={"20px"}
                  w={"20px"}
                  border={"1px solid rgba(0, 0, 0, 0.15)"}
                  rounded={"md"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _hover={{ border: "1px solid rgb(156, 164, 169)" }}
                >
                  <AddIcon boxSize={"5"} />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDir={"column"}
          justify={"space-between"}
          alignItems={"flex-end"}
        >
          <SmallCloseIcon
            color={"rgb(218, 222, 224)"}
            _hover={{ color: "rgb(87, 130, 4)" }}
          />
          <Text
            textAlign={"right"}
            fontSize={"12px"}
            fontWeight={"700"}
            mb={"10px"}
          >
            120 Kč
          </Text>
        </Flex>
      </Flex>
      <CartButton />
    </ShadowDom>
  ) : null;
};

export default CartArea;
