import { useGetCartPrice } from "../hooks/useGetCartPrice.ts";
import { useEffect } from "react";
import { useMyStore } from "../store/store.tsx";

export const CartHeader = () => {
  const { ingredientsInCart } = useMyStore();

  const cartPrice = useGetCartPrice(ingredientsInCart);
  const cartHeaderPrice = document.querySelector('[data-test="headerPrice"]');

  useEffect(() => {
    if (cartHeaderPrice && cartPrice && cartPrice?.totalPrice > 0) {
      const textContent = cartHeaderPrice.textContent;
      const editedContent = textContent?.split("Kč")[0].trim() + " Kč";
      cartHeaderPrice.textContent = `${editedContent} + ${cartPrice.totalPrice.toFixed(
        1,
      )} Kč`;
    }
  }, [cartHeaderPrice, cartPrice]);

  return false;
};
