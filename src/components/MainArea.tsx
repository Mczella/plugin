import {FC, useEffect, useState} from "react";
import {ShadowDom} from "./ShadowDom.tsx";
import CreateRecipe from "./CreateRecipe.tsx";
import Recipes from "./Recipes.tsx";

type MainProps = {
    hash: string
}
const MainArea: FC<MainProps> = ({hash}) => {
    const [parentElement] = useState(() =>
        document.querySelector('[data-gtm-section="hp-topBanner"]')
    );

    const currentHash = window.location.hash

    useEffect(() => {
        if (currentHash === hash) {

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
    }, [currentHash, hash]);


    return parentElement ? (
        <ShadowDom parentElement={parentElement}>
            {currentHash === "#/pridat-recept" ? (
                <CreateRecipe/>
            ) : currentHash === "#/recepty" ? (
                <Recipes/>
            ) : null}
        </ShadowDom>
    ) : null;
}

export default MainArea