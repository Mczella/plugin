import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import CreateRecipe from "./recipes/CreateRecipe.tsx";
import Recipes from "./recipes/Recipes.tsx";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CheckRecipes from "./cart/CheckRecipes.tsx";

const MainArea = () => {
  const [parentElement] = useState(() =>
    document.querySelector<HTMLElement>("#pageFullWidth")
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const goToNonExistingPage = () => {
      console.log("zmen url na /");
      navigate("/");
    };

    const links = document.querySelectorAll(".sectionsLink");
    if (links) {
      Array.from(links).forEach((link) => {
        link.addEventListener("click", goToNonExistingPage);
      });
    }

    () => {
      if (links) {
        Array.from(links).forEach((link) => {
          link.removeEventListener("click", goToNonExistingPage);
        });
      }
    };
  }, [navigate]);

  useLayoutEffect(() => {
    if (!parentElement) {
      return;
    }

    parentElement.style.display = location.pathname === "/" ? "block" : "none";
  }, [location, parentElement]);

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <Routes>
        {/* / is placeholder for empty url, where we don't render anything */}
        <Route path="/" element={<></>} />
        <Route path="/pridat-recept/:id" element={<CreateRecipe />} />
        <Route path="/recepty" element={<Recipes />} />
        <Route path="/prehled-receptu" element={<CheckRecipes />} />
      </Routes>
    </ShadowDom>
  ) : null;
};

export default MainArea;
