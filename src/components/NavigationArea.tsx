import {useEffect, useState} from "react";
import {ShadowDom} from "./ShadowDom.tsx";
import {Flex, Link} from "@chakra-ui/react";
import {ButtonComponent} from "./ButtonComponent.tsx";

const NavigationArea = () => {
    const [parentElement] = useState(() =>
        document.querySelector(".sectionsItem")
    );

    const location = window.location.hash

    useEffect(() => {
        console.log(location)
    }, [location]);

    return parentElement ? (
        <ShadowDom parentElement={parentElement}>
            <Flex flexDir={"row"}>
                <Link style={{all: "unset"}} href={"https://www.rohlik.cz/#/pridat-recept"}>
                    <ButtonComponent
                        label={"Vytvořit recept"}
                        icon={"https://www.svgrepo.com/show/303501/red-star-1-logo.svg"}
                    />
                </Link>
                <Link style={{all: "unset"}} href={"https://www.rohlik.cz/#/recepty"}>
                    <ButtonComponent
                        label={"Recepty"}
                        icon={"https://www.svgrepo.com/show/303501/red-star-1-logo.svg"}
                    />
                </Link>
            </Flex>
        </ShadowDom>
    ) : null;
}

export default NavigationArea