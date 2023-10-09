import { createRoot } from "react-dom/client";
import {CacheProvider} from "@emotion/react";
import createCache from '@emotion/cache'
import React from "react";
import {ChakraProvider} from "@chakra-ui/react";

export function render(content: React.ReactElement) {
    const container = document.createDocumentFragment();
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(container);
    const cache = createCache({
        key: 'css',
        container: shadowRoot,
    });
    const root = createRoot(container);

    root.render(<CacheProvider value={cache}><ChakraProvider>{content}</ChakraProvider></CacheProvider>);
}