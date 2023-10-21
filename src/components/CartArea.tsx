import { useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import { Flex, Image, Text } from "@chakra-ui/react";

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
        justifyContent={"space-between"}
        borderBottom={"1px solid rgb(218, 222, 224)"}
        p={"10px 16px 10px 8px"}
      >
        <Image
          width={"50px"}
          src={
            "https://jz.img0.cz/media/1b/3c/1b3c0bf1-1b76-44dd-b19e-39b79a8da1ce.jpg.570x570_q85_crop.jpg"
          }
        />
        <Text>Rizoto</Text>
        <Text>120 Kč</Text>
      </Flex>
    </ShadowDom>
  ) : null;
};

export default CartArea;
