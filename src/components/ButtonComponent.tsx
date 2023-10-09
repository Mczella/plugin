import { Button } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  label: string;
  icon: string;
};

export const ButtonComponent: FC<Props> = ({ label, icon }) => {
  return (
    <Button>
      <img
        alt={"icon"}
        src={icon}
        style={{ width: "20px", marginRight: "5px" }}
      />
      <span style={{ fontSize: "13px" }}>{label}</span>
    </Button>
  );
};
