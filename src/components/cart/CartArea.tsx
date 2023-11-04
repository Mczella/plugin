import { useEffect, useState } from "react";
import { ShadowDom } from "../ShadowDom.tsx";
import { Text } from "@chakra-ui/react";
import CartButton from "./CartButton.tsx";
import { useMyStore } from "../store/store.tsx";
import RecipeInCart from "./RecipeInCart.tsx";

const CartArea = () => {
  const [parentElement, setParentElement] = useState(() =>
    document.querySelector('[data-test*="categoryCart"]'),
  );

  const cart = document.querySelector('[data-test*="categoryCart"]');
  const empty = document.querySelector(
    '[class*="emptyProducts"]',
  ) as HTMLElement;

  useEffect(() => {
    if (empty) {
      setParentElement(empty);
      empty.style.display = "none";
    } else if (cart) {
      setParentElement(cart);
    }
  }, [cart]);

  const { recipesInCart } = useMyStore();

  return parentElement && recipesInCart.length > 0 ? (
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
      {recipesInCart.map((recipe) => (
        <RecipeInCart key={recipe} recipe={recipe} />
      ))}
      <CartButton />
    </ShadowDom>
  ) : null;
};

export default CartArea;
