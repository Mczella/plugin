import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
  addRecipe: boolean;
};

const BreadcrumbNav: FC<Props> = ({ children, addRecipe }) => {
  const location = useLocation();
  console.log(location);
  return (
    <Breadcrumb
      padding={"2px 21px 16px 0px"}
      spacing="8px"
      color={"rgb(57,57,59)"}
      separator={<ChevronRightIcon color="gray.500" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink fontSize={"12px"} href="/">
          Rohlik.cz
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink fontSize={"12px"} href="/#/recepty">
          {children}
        </BreadcrumbLink>
      </BreadcrumbItem>

      {addRecipe ? (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink fontSize={"12px"} href="/#/pridat-recept">
            Nový recept
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : null}
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
