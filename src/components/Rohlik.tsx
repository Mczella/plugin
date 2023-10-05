import React, {useState} from "react";
import { ShadowDom } from "./ShadowDom";

export function Rohlik(): React.ReactElement | null {
    const [parentElement] = useState(() =>
        // See https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver for more robust solution
        document.querySelector('[data-gtm-section="hp-topBanner"]')
    );

    return parentElement ? (
        <ShadowDom parentElement={parentElement}>Hello 👋, </ShadowDom>
    ) : null;
}