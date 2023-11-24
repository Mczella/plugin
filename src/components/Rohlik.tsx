import React from "react";
import NavigationArea from "./NavigationArea.tsx";
import MainArea from "./MainArea.tsx";
import CartArea from "./cart/CartArea.tsx";

export const Rohlik = (): React.ReactNode => (
  <>
    <NavigationArea />
    <MainArea />
    <CartArea />
  </>
);
