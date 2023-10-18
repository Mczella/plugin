import { useEffect, useState } from "react";
import { ShadowDom } from "./ShadowDom.tsx";
import { Flex } from "@chakra-ui/react";
import { ButtonComponent } from "./ButtonComponent.tsx";

const NavigationArea = () => {
  const [parentElement] = useState(() =>
    document.querySelector(".sectionsItem")
  );

  const location = window.location.hash;

  useEffect(() => {
    console.log(location);
  }, [location]);

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <Flex flexDir={"row"}>
        <ButtonComponent
          navigate={"/#/pridat-recept"}
          label={"Vytvořit recept"}
          icon={"https://www.svgrepo.com/show/303501/red-star-1-logo.svg"}
        />
        <ButtonComponent
          navigate={"/#/recepty"}
          label={"Recepty"}
          icon={"https://www.svgrepo.com/show/303501/red-star-1-logo.svg"}
        />
      </Flex>
    </ShadowDom>
  ) : null;
};

export default NavigationArea;
