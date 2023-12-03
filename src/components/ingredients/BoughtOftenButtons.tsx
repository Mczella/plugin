import { Button, ButtonGroup } from "@chakra-ui/react";
import { FC } from "react";
import { useMyStore } from "../store/store.tsx";

type Props = {
  onClose: () => void;
  handleSave: () => void;
};

export const BoughtOftenButtons: FC<Props> = ({ onClose, handleSave }) => {
  const { selectedBoughtOften } = useMyStore();

  return (
    <ButtonGroup
      mt={"40px"}
      display={"flex"}
      justifyContent={"center"}
      gap={"5px"}
    >
      <Button
        bg="white"
        color="black"
        fontSize={"14px"}
        fontWeight={"600"}
        border="1px solid rgba(0, 0, 0, 0.15)"
        height="40px"
        display="flex"
        alignItems="center"
        rounded={"xl"}
        onClick={onClose}
      >
        Zrušit
      </Button>
      <Button
        height={"40px"}
        w={"360px"}
        bg={"rgb(109, 163, 5)"}
        fontSize={"14px"}
        fontWeight={"600"}
        rounded={"xl"}
        boxShadow={"md"}
        color={"white"}
        isDisabled={selectedBoughtOften.length === 0}
        _hover={{ bg: "rgb(87, 130, 4)" }}
        onClick={handleSave}
      >
        Uložit
      </Button>
    </ButtonGroup>
  );
};
