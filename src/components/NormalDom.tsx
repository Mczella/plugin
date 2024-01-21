import { ChakraProvider } from "@chakra-ui/react";

import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function NormalDom({
  parentElement,
  position = "beforebegin",
  children,
}: {
  parentElement: Element;
  position?: InsertPosition;
  children: React.ReactNode;
}) {
  const [myModal] = React.useState(() => document.createElement("my-modal"));

  React.useLayoutEffect(() => {
    if (parentElement) {
      parentElement.insertAdjacentElement(position, myModal);
    }

    return () => {
      myModal.remove();
    };
  }, [parentElement, myModal, position]);

  const queryClient = new QueryClient();

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return ReactDOM.createPortal(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{children}</ChakraProvider>
    </QueryClientProvider>,
    myModal,
  );
}
