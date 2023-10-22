import { useEffect, useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import { Button, Link } from "@chakra-ui/react";

const CartButton = () => {
  const [parentElement] = useState(() =>
    document.querySelector(".sc-41450383-11.gYxQOr"),
  );

  useEffect(() => {
    const submitButton = document.querySelector(".sc-d51222c7-0.hlPRUh");
    // if (submitButton && recipesInCart.length > 0)
    if (submitButton) {
      submitButton.remove();
    }
  }, []);

  return parentElement ? (
    // parentElement && recipesInCart.length > 0 ?
    <ShadowDom parentElement={parentElement}>
      <Link
        style={{ all: "unset" }}
        href={`https://www.rohlik.cz/#/prehled-receptu`}
      >
        <Button
          w={"-webkit-fill-available"}
          h={"40px"}
          bg={"rgb(109, 163, 5)"}
          color={"white"}
          fontSize={"14px"}
          fontWeight={"600"}
          lineHeight={"1"}
          mx={"16px"}
          my={"12px"}
          rounded={"xl"}
          _hover={{ bg: "rgb(87, 130, 4)" }}
        >
          K objednávce
        </Button>
      </Link>
    </ShadowDom>
  ) : null;
};

export default CartButton;
