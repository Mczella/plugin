import {Button, Image, Text} from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  label: string;
  icon: string;
};

export const ButtonComponent: FC<Props> = ({ label, icon }) => {
  return (
      <Button bg={"none"} border={"none"} paddingInline={"10px"} height={"35px"} display={"flex"} flexDir={"row"} alignItems={"center"} mx={"8px"}>
          <Image
              alt={"icon"}
              src={icon}
              width={"20px"}
              style={{width: "20px", marginRight: "5px"}}
          />
          <Text fontSize={"13px"} fontWeight={"normal"}>{label}</Text>
      </Button>
)
    ;
};
