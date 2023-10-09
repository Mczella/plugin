import {FC, useEffect, useState} from "react";
import {ShadowDom} from "./ShadowDom.tsx";

type MainProps = {
    hash: string
}
const MainArea: FC<MainProps> = ({hash}) => {
    const [parentElement] = useState(() =>
        document.querySelector('[data-gtm-section="hp-topBanner"]')
    );


    useEffect(() => {
        if (window.location.hash === hash) {

            const bannerSpace = document.querySelector(
                '[data-gtm-section="hp-topBanner"]'
            );
            const banner3 = document.querySelector('[data-gtm-section="hp-banners"]');
            if (bannerSpace) {
                bannerSpace.innerHTML = "";
            }

            if (banner3) {
                banner3?.remove();
            }
        }
    }, [hash]);


    return parentElement ? (
        <ShadowDom parentElement={parentElement}>
            <h1>ahoj</h1>
        </ShadowDom>
    ) : null;
}

export default MainArea