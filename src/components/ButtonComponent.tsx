import { Button, Image, Link as ChakraLink, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  label: string;
  icon: string;
  navigate: string;
};

export const ButtonComponent: FC<Props> = ({ label, icon, navigate }) => {
  return (
    <Link
      style={{ all: "unset" }}
      to={navigate}
      onClick={() => {
        console.log("zmen url na /");
        window.history.pushState("", "", "/");
      }}
    >
      <Button
        bg={"none"}
        border={"none"}
        _hover={{ bg: "rgb(242, 244, 244)" }}
        paddingInline={"10px"}
        height={"35px"}
        display={"flex"}
        flexDir={"row"}
        alignItems={"center"}
        mx={"8px"}
      >
        <Image
          alt={"icon"}
          src={icon}
          width={"20px"}
          style={{ width: "20px", marginRight: "5px" }}
        />
        <Text fontSize={"13px"} fontWeight={"normal"}>
          {label}
        </Text>
      </Button>
    </Link>
  );
};
