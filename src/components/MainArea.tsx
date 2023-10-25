import { useEffect, useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import CreateRecipe from "./CreateRecipe.tsx";
import Recipes from "./Recipes.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import CheckRecipes from "./CheckRecipes.tsx";

const MainArea = () => {
  const [parentElement] = useState(() =>
    document.getElementById("pageFullWidth"),
  );
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    if (location.pathname !== "/") {
      const page = document.getElementById("pageFullWidth");

      if (page) {
        page.innerHTML = "";
      }
    }
  }, [location]);

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
