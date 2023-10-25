import { useEffect, useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import CreateRecipe from "./CreateRecipe.tsx";
import Recipes from "./Recipes.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import CheckRecipes from "./CheckRecipes.tsx";

const MainArea = () => {
  const [parentElement] = useState(() =>
    document.querySelector(".sc-e03dc118-1.kvCJfT"),
  );

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      const page = document.querySelector(".sc-e03dc118-1.kvCJfT");

      if (page) {
        page.innerHTML = "";
      }
    }
  }, [location.pathname]);

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
