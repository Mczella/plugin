import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, ReactNode, RefObject, useEffect, useRef } from "react";
import { useMyStore } from "../store/store.tsx";

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
  const {
    editSelectedProducts,
    selectIngredient,
    name,
    editAmount,
    editName,
    editOptimize,
    editSortBy,
    editStep,
  } = useMyStore();
  const modalContainer = useRef(null);

  const modalReset = () => {
    editStep(1);
    editAmount(0);
    editOptimize(false);
    editSortBy("price");
    editSelectedProducts([]);
    selectIngredient(null);
    editName(null);
  };

  useEffect(() => {
    modalReset();
  }, [isOpen]);

  return (
    <>
      <div ref={modalContainer}></div>
      <Modal
        blockScrollOnMount={!name}
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
