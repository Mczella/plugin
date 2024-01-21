import { ShadowDom } from "../ShadowDom.tsx";
import { Flex } from "@chakra-ui/react";
import { useParentElement } from "../hooks/useParentElement.ts";
import { LineChart } from "./LineChart.tsx";

export const UserArea = () => {
  const parentElement = useParentElement(
    document.getElementById("finishedOrders")?.querySelector(".tabs"),
  );

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <Flex bg={"white"} justifyContent={"center"} alignItems={"center"}>
        <LineChart />
      </Flex>
    </ShadowDom>
  ) : null;
};
