import { useState } from "react";
import { ShadowDom } from "../ShadowDom.tsx";
import { Flex } from "@chakra-ui/react";
import { LineChart } from "./LineChart.tsx";

export const UserArea = () => {
  const finishedOrdersElement = document.getElementById("finishedOrders");

  const [parentElement] = useState(
    () => finishedOrdersElement?.querySelector(".tabs"),
  );

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <Flex bg={"white"} justifyContent={"center"} alignItems={"center"}>
        <LineChart />
      </Flex>
    </ShadowDom>
  ) : null;
};
