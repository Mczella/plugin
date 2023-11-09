import {
  Button,
  ButtonGroup,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, RefObject, useRef, useState } from "react";
import {
  useMyStore,
  // usePurgeStorage,
} from "../store/store.tsx";
import { SimpleIngredient, NewIngredient } from "../types.ts";
import IngredientModalOne from "./IngredientModalOne.tsx";
import IngredientModalTwo from "./IngredientModalTwo.tsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusRef: RefObject<HTMLInputElement>;
};

const IngredientModal: FC<Props> = ({ isOpen, onClose, focusRef }) => {
  const {
    addIngredient,
    addToSelectedIngredients,
    selectedProducts,
    selectedIngredient,
    editSelectedProducts,
    selectIngredient,
  } = useMyStore();
  // const purgeStorage = usePurgeStorage();
  // // const bytesInUse = useBytesInUse();
  const [name, setName] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const modalContainer = useRef(null);
  const [step, setStep] = useState<number>(1);

  const modalReset = () => {
    setStep(1);
    setAmount(0);
    editSelectedProducts([]);
    selectIngredient(null);
    onClose();
  };

  const handleIngredientClick = (ingredient: NewIngredient) => {
    const newSelectedIngredient: NewIngredient = {
      ...ingredient,
      amount: amount,
    };
    addToSelectedIngredients(newSelectedIngredient);
    modalReset();
  };

  const handleSave = () => {
    if (name != null && selectedProducts.length > 0) {
      const updatedSelectedProducts: SimpleIngredient[] = selectedProducts.map(
        (product) => {
          const { id, preferred } = product;
          return { id, preferred };
        },
      );
      const newIngredient: NewIngredient = {
        name: name,
        selectedProducts: updatedSelectedProducts,
        id: Date.now().toString(36),
        amount: amount,
      };
      addToSelectedIngredients(newIngredient);
      addIngredient(newIngredient);
      modalReset();
    }
  };

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
              {step === 1 ? (
                <IngredientModalOne setName={setName} />
              ) : (
                <IngredientModalTwo setAmount={setAmount} />
              )}

              {step === 1 ? (
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
                    onClick={() => {
                      modalReset();
                    }}
                  >
                    Zrušit
                  </Button>
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
                    isDisabled
                  >
                    Zpět
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
                    isDisabled={
                      !selectedIngredient && selectedProducts.length === 0
                    }
                    _hover={{ bg: "rgb(87, 130, 4)" }}
                    onClick={() => setStep(2)}
                  >
                    Pokračovat
                  </Button>
                </ButtonGroup>
              ) : (
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
                    onClick={() => modalReset()}
                  >
                    Zrušit
                  </Button>
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
                    onClick={() => setStep(1)}
                  >
                    Zpět
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
                    isDisabled={amount === 0}
                    _hover={{ bg: "rgb(87, 130, 4)" }}
                    onClick={() => {
                      selectedIngredient && amount > 0
                        ? handleIngredientClick(selectedIngredient)
                        : handleSave();
                    }}
                  >
                    Vytvořit
                  </Button>
                </ButtonGroup>
              )}
              {/*<Button*/}
              {/*  onClick={() => {*/}
              {/*    resetProducts();*/}
              {/*    resetIngredient();*/}
              {/*    resetIngredients();*/}
              {/*    purgeStorage();*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Purge Storage*/}
              {/*</Button>*/}
              {/*/!*bytesInUse: {bytesInUse}*!/*/}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IngredientModal;
