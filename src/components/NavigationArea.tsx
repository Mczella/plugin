import { useEffect } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import { ButtonComponent } from "./ButtonComponent.tsx";
import { useParentElement } from "./hooks/useParentElement.ts";

const NavigationArea = () => {
  const parentElement = useParentElement(
    document.querySelector(".sectionsItem"),
  );

  const logoElement: HTMLLinkElement | null = document.querySelector("#logo");

  useEffect(() => {
    if (logoElement) {
      logoElement.href = "https://www.rohlik.cz/";
      logoElement.onclick = () => {
        window.location.href = "https://www.rohlik.cz/";
      };
      logoElement.setAttribute("to", "/");
    }
  }, [logoElement]);

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <ButtonComponent
        navigate={"recepty"}
        label={"Chytrý nákup"}
        icon={"https://www.svgrepo.com/show/303501/red-star-1-logo.svg"}
      />
    </ShadowDom>
  ) : null;
};

export default NavigationArea;
