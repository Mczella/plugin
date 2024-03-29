import { ShadowDom } from "../ShadowDom.tsx";
import { Text } from "@chakra-ui/react";
import CartButton from "./CartButton.tsx";
import { useMyStore } from "../store/store.tsx";
import RecipeInCart from "./RecipeInCart.tsx";
import { useParentElement } from "../hooks/useParentElement.ts";
import { useEffect } from "react";
import IngredientInCart from "./IngredientInCart.tsx";
import { CartHeader } from "./CartHeader.tsx";

const CartArea = () => {
  // const location = useLocation();
  const { ingredientsInCart, recipesInCart } = useMyStore();

  const cart = useParentElement(
    document.querySelector('[data-test*="categoryCart"]'),
  );
  const empty = useParentElement(
    document.querySelector('[class*="emptyProducts"]'),
  );

  const parentElement = cart ? cart : empty ? empty : null;

  useEffect(() => {
    if (
      (empty && ingredientsInCart.length > 0) ||
      (empty && recipesInCart.length > 0)
    ) {
      empty.style.display = "none";
    }
  }, [empty, ingredientsInCart.length, recipesInCart.length]);

  // const cartHeaderElement = document.querySelector('[data-test="cart-header"]');
  // const cartMain = document.querySelector('[data-test="cart"]');
  // const cartElement = useParentElement(document.getElementById("cart"));

  // useEffect(() => {
  //   const mouseOverEvent = new MouseEvent("mouseover", {
  //     bubbles: true,
  //   });
  //   const mouseleave = new MouseEvent("mouseout", {
  //     bubbles: true,
  //   });
  //   if (cartHeaderElement && location.pathname != "/") {
  //     cartHeaderElement.dispatchEvent(mouseOverEvent);
  //     cartHeaderElement.dispatchEvent(mouseleave);
  //   }
  // }, [cartElement, cartHeaderElement, cartMain, location]);

  const cartProductsElement: HTMLElement | null = document.querySelector(
    '[class*="cartProducts"]',
  );

  useEffect(() => {
    if (cartProductsElement) {
      cartProductsElement.style.overflow = "scroll";
    }
  }, [cartProductsElement]);

  return (parentElement && recipesInCart.length > 0) ||
    ingredientsInCart.length > 0 ? (
    <ShadowDom parentElement={parentElement}>
      {recipesInCart.length > 0 ? (
        <>
          <CartHeader />
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
            <RecipeInCart key={recipe.id} recipe={recipe} />
          ))}
        </>
      ) : null}
      {ingredientsInCart.length > 0 ? (
        <>
          <Text
            color={"rgb(93, 103, 108)"}
            bg={"rgb(242, 244, 244)"}
            fontSize={"13px"}
            fontWeight={"700"}
            letterSpacing={"-0.4px"}
            px={"16px"}
            py={"8px"}
          >
            Ingredience
          </Text>
          {ingredientsInCart.map((ingredient) => (
            <IngredientInCart key={ingredient.id} ingredient={ingredient} />
          ))}
        </>
      ) : null}
      <CartButton />
    </ShadowDom>
  ) : null;
};

export default CartArea;
