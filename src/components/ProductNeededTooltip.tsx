import { Tooltip } from "@chakra-ui/react";
import { FC, ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  label: string;
  show: boolean;
};

export const ProductNeededTooltip: FC<Props> = ({ children, label, show }) => {
  const modalContainer = useRef(null);

  return (
    <div ref={modalContainer}>
      <Tooltip
        portalProps={{
          containerRef: modalContainer,
        }}
        width={"150px"}
        hasArrow
        label={label}
        placement="top"
        isOpen={show}
        bg="rgb(209, 17, 0)"
        p={"10px"}
        fontSize={"11px"}
        lineHeight={1.4}
        borderRadius={"4px"}
        textAlign={"center"}
        boxShadow={"rgba(0, 0, 0, 0.51) 1px 2px 4px 0px"}
        mb={"5px"}
      >
        {children}
      </Tooltip>
    </div>
  );
};
