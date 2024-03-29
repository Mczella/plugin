import { useEffect, useLayoutEffect, useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import CreateRecipe from "./recipes/CreateRecipe.tsx";
import Recipes from "./recipes/Recipes.tsx";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CheckRecipes from "./cart/CheckRecipes.tsx";
import Products from "./products/Products.tsx";

const MainArea = () => {
  const [parentElement] = useState(() =>
    document.querySelector<HTMLElement>("#pageFullWidth"),
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let oldHref: null | string = null;
    const body = document.querySelector("body");

    const observer = new MutationObserver(() => {
      const { pathname } = new URL(document.location.href);

      if (pathname !== oldHref || oldHref === null) {
        oldHref = pathname;
        if (pathname !== "/") {
          navigate("/");
          console.log("naviguji na defaultni route, kde nic nerenderujeme...");
        }
      }
    });

    if (body) {
      observer.observe(body, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [navigate]);

  useLayoutEffect(() => {
    if (!parentElement) {
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    parentElement.style.display = location.pathname === "/" ? "block" : "none";
  }, [location, parentElement]);

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <Routes>
        {/* / is placeholder for empty url, where we don't render anything */}
        <Route path="/" element={<></>} />
        <Route path="/pridat-recept/:id" element={<CreateRecipe />} />
        <Route path="/recepty" element={<Recipes />} />
        <Route path="/produkty" element={<Products />} />
        <Route path="/prehled-receptu" element={<CheckRecipes />} />
      </Routes>
    </ShadowDom>
  ) : null;
};

export default MainArea;
