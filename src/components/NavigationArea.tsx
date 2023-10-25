import { useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import { ButtonComponent } from "./ButtonComponent.tsx";

const NavigationArea = () => {
  const [parentElement] = useState(() =>
    document.querySelector(".sectionsItem"),
  );

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <ButtonComponent
        navigate={"/#/recepty"}
        label={"Recepty"}
        icon={"https://www.svgrepo.com/show/303501/red-star-1-logo.svg"}
      />
    </ShadowDom>
  ) : null;
};

export default NavigationArea;
