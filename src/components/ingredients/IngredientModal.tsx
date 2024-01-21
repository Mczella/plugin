import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, ReactNode, RefObject, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusRef: RefObject<HTMLInputElement>;
  children: ReactNode;
  create?: boolean;
};

const IngredientModal: FC<Props> = ({
  isOpen,
  onClose,
  focusRef,
  children,
}) => {
  const modalContainer = useRef(null);

  // const modalRef = useOutsideClick(() => {
  //   onClose();
  // });

  return (
    <>
      <div ref={modalContainer}></div>
      <Modal
        blockScrollOnMount={false}
        portalProps={{
          containerRef: modalContainer,
        }}
        initialFocusRef={focusRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent minW={"850px"} rounded={"xl"}>
          {/*<ModalCloseButton />*/}
          <ModalBody pb={6} m={"40px"}>
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {children}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IngredientModal;
