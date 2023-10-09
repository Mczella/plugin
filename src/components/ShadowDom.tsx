import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import React from "react";
import ReactDOM from "react-dom";

export function ShadowDom({
  parentElement,
  position = "beforebegin",
  children,
}: {
  parentElement: Element;
  position?: InsertPosition;
  children: React.ReactNode;
}) {
  const [shadowHost] = React.useState(() =>
    document.createElement("my-shadow-host")
  );

  const [shadowRoot] = React.useState(() =>
    shadowHost.attachShadow({ mode: "closed" })
  );

  const cache = createCache({
    key: "css",
    container: shadowRoot,
  });

  React.useLayoutEffect(() => {
    if (parentElement) {
      parentElement.insertAdjacentElement(position, shadowHost);
    }

    return () => {
      shadowHost.remove();
    };
  }, [parentElement, shadowHost, position]);

  return ReactDOM.createPortal(
    <CacheProvider value={cache}>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>,
    shadowRoot
  );
}
