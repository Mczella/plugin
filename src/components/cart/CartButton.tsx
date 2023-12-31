import { useEffect, useState } from "react";
import { ShadowDom } from "../ShadowDom.tsx";
import { Button, Link } from "@chakra-ui/react";
import { useMyStore } from "../store/store.tsx";

const CartButton = () => {
  const [parentElement] = useState(() =>
    document.querySelector('[class*="Cart__footer"]'),
  );

  const { recipesInCart } = useMyStore();

  const submitButton = document.querySelector(
    '[data-test="cart-redirectToCart"]',
  );

  useEffect(() => {
    if (submitButton && recipesInCart.length > 0) {
      submitButton.remove();
    }
  }, [recipesInCart, submitButton]);

  return parentElement && recipesInCart.length > 0 ? (
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
