import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, RefObject, useRef, useState } from "react";
import {
  useMyStore,
  usePurgeStorage,
  // usePurgeStorage,
} from "../store/store.tsx";
import { SimpleIngredient, NewIngredient } from "../types.ts";
import IngredientModalOne from "./IngredientModalOne.tsx";
import IngredientModalTwo from "./IngredientModalTwo.tsx";
import IngredientInRecipeButtons from "./IngredientInRecipeButtons.tsx";
import IngredientButtons from "./IngredientButtons.tsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusRef: RefObject<HTMLInputElement>;
  type: "create" | "createInRecipe" | "edit" | "editInRecipe";
  id?: NewIngredient["id"];
};

const IngredientModal: FC<Props> = ({
  isOpen,
  onClose,
  focusRef,
  type,
  id,
}) => {
  const {
    addIngredient,
    addToSelectedIngredients,
    selectedProducts,
    editSelectedProducts,
    selectIngredient,
    name,
    editAmount,
    amount,
    ingredients,
    editIngredients,
    editSelectedIngredients,
    editName,
  } = useMyStore();
  const purgeStorage = usePurgeStorage();
  // // const bytesInUse = useBytesInUse();
  const modalContainer = useRef(null);
  const [step, setStep] = useState<number>(1);

  const modalReset = () => {
    setStep(1);
    editAmount(0);
    editSelectedProducts([]);
    selectIngredient(null);
    onClose();
    editName(null);
  };

  console.log(type);
  const handleSave = () => {
    const updatedSelectedProducts: SimpleIngredient[] = selectedProducts.map(
      (product) => {
        const { id, preferred } = product;
        return { id, preferred };
      },
    );
    if (
      name != null &&
      selectedProducts.length > 0 &&
      type === "createInRecipe"
    ) {
      const newIngredient: NewIngredient = {
        name: name,
        selectedProducts: updatedSelectedProducts,
        id: Date.now().toString(36),
      };
      addIngredient(newIngredient);

      const newRecipeIngredient: NewIngredient = {
        name: name,
        selectedProducts: updatedSelectedProducts,
        id: Date.now().toString(36),
        amount: amount,
      };
      addToSelectedIngredients(newRecipeIngredient);

      modalReset();
    } else if (
      name != null &&
      selectedProducts.length > 0 &&
      type === "editInRecipe"
    ) {
      const editedIngredients = ingredients.map((ingredient) => {
        if (ingredient.id === id) {
          return {
            ...ingredient,
            name: name,
            selectedProducts: updatedSelectedProducts,
          };
        }
        return ingredient;
      });

      editIngredients(editedIngredients);

      const editedRecipeIngredients = ingredients.map((ingredient) => {
        if (ingredient.id === id) {
          return {
            ...ingredient,
            name: name,
            selectedProducts: updatedSelectedProducts,
            amount: amount,
          };
        }
        return ingredient;
      });

      editSelectedIngredients(editedRecipeIngredients);
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
              {step === 1 ? <IngredientModalOne /> : <IngredientModalTwo />}

              {type === "editInRecipe" || type === "createInRecipe" ? (
                <IngredientInRecipeButtons
                  step={step}
                  setStep={setStep}
                  modalReset={modalReset}
                  handleSave={handleSave}
                />
              ) : (
                <IngredientButtons
                  modalReset={modalReset}
                  handleSave={handleSave}
                />
              )}
              <Button
                onClick={() => {
                  purgeStorage();
                }}
              >
                Purge Storage
              </Button>
              {/*bytesInUse: {bytesInUse}*/}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IngredientModal;
