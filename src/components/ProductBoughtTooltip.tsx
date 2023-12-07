import { Tooltip } from "@chakra-ui/react";
import { FC, ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  label: ReactNode;
  show: boolean;
};

export const ProductBoughtTooltip: FC<Props> = ({ children, label, show }) => {
  const modalContainer = useRef(null);

  return (
    <div ref={modalContainer}>
      <Tooltip
        portalProps={{
          containerRef: modalContainer,
        }}
        w={"192px"}
        hasArrow
        label={label}
        placement="top"
        isOpen={show}
        bg="rgba(138, 181, 55, 0.9)"
        py={"8px"}
        px={"16px"}
        top={"37px"}
        fontSize={"12px"}
        lineHeight={1.4}
        textAlign={"center"}
        color={"black"}
      >
        {children}
      </Tooltip>
    </div>
  );
};
