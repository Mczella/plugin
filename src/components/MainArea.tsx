import { useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import CreateRecipe from "./recipes/CreateRecipe.tsx";
import Recipes from "./recipes/Recipes.tsx";
import { Route, Routes } from "react-router-dom";
import CheckRecipes from "./cart/CheckRecipes.tsx";

const MainArea = () => {
  const [parentElement] = useState(() =>
    document.querySelector("#pageFullWidth"),
  );

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <Routes>
        <Route path="/pridat-recept/:id" element={<CreateRecipe />} />
        <Route path="/recepty" element={<Recipes />} />
        <Route path="/prehled-receptu" element={<CheckRecipes />} />
      </Routes>
    </ShadowDom>
  ) : null;
};

export default MainArea;
