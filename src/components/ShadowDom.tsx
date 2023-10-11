import {ChakraProvider} from "@chakra-ui/react";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";

import React from "react";
import ReactDOM from "react-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

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
        shadowHost.attachShadow({mode: "closed"})
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
    const queryClient = new QueryClient();

    return ReactDOM.createPortal(
        <QueryClientProvider client={queryClient}>
            <CacheProvider value={cache}>
                <ChakraProvider>{children}</ChakraProvider>
            </CacheProvider>
        </QueryClientProvider>,
        shadowRoot
    );
}
