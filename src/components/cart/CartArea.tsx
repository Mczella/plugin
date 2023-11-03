import { useState } from "react";
import { ShadowDom } from "../ShadowDom.tsx";
import { Text } from "@chakra-ui/react";
import CartButton from "./CartButton.tsx";
import { useMyStore } from "../store/store.tsx";
import RecipeInCart from "./RecipeInCart.tsx";

const CartArea = () => {
  const [parentElement] = useState(() =>
    document.querySelector('[data-test*="categoryCart"]'),
  );

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
