import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

const BreadcrumbNav = () => {
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
          Recepty
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink fontSize={"12px"} href="/#/pridat-recept">
          Nový recept
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
