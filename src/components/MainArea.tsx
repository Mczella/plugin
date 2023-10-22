import { useEffect, useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import CreateRecipe from "./CreateRecipe.tsx";
import Recipes from "./Recipes.tsx";
import { Route, Routes } from "react-router-dom";
import CheckRecipes from "./CheckRecipes.tsx";

const MainArea = () => {
  const [parentElement] = useState(() =>
    document.querySelector('[data-gtm-section="hp-topBanner"]'),
  );

  useEffect(() => {
    const bannerSpace = document.querySelector(
      '[data-gtm-section="hp-topBanner"]',
    );
    const banner3 = document.querySelector('[data-gtm-section="hp-banners"]');
    if (bannerSpace) {
      bannerSpace.remove();
    }

    if (banner3) {
      banner3?.remove();
    }
  }, []);

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <Routes>
        <Route path="/pridat-recept" element={<CreateRecipe />} />
        <Route path="/recepty" element={<Recipes />} />
        <Route path="/prehled-receptu" element={<CheckRecipes />} />
      </Routes>
    </ShadowDom>
  ) : null;
};

export default MainArea;
