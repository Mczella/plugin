import {
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
import { NewIngredient } from "../types.ts";
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
    selectedIngredients,
    name,
    editAmount,
    amount,
    ingredients,
    editIngredients,
    editSelectedIngredients,
    editName,
    optimize,
    editOptimize,
    sortBy,
    editSortBy,
  } = useMyStore();
  // const purgeStorage = usePurgeStorage();
  // // const bytesInUse = useBytesInUse();
  const modalContainer = useRef(null);
  const [step, setStep] = useState<number>(1);

  const modalReset = () => {
    setStep(1);
    editAmount(0);
    editOptimize(false);
    editSortBy("price");
    editSelectedProducts([]);
    selectIngredient(null);
    onClose();
    editName(null);
  };

  console.log(type);
  const handleSave = () => {
    if (name != null && selectedProducts.length > 0) {
      const updatedSelectedProducts = selectedProducts.map(
        ({ id, preferred }) => ({ id, preferred }),
      );

      switch (type) {
        case "createInRecipe":
          const createdIdCreate = Date.now().toString(36);
          const newIngredientCreateInRecipe = {
            name,
            selectedProducts: updatedSelectedProducts,
            id: createdIdCreate,
            unit: selectedProducts[0].unit,
            optimize,
            sortBy,
          };
          addIngredient(newIngredientCreateInRecipe);

          const newRecipeIngredientCreate = {
            name,
            selectedProducts: updatedSelectedProducts,
            id: createdIdCreate,
            amount,
            optimize,
            sortBy,
            unit: selectedProducts[0].unit,
          };
          addToSelectedIngredients(newRecipeIngredientCreate);
          break;

        case "editInRecipe":
          const editedIngredientsEditInRecipe = ingredients.map((ingredient) =>
            ingredient.id === id
              ? {
                  ...ingredient,
                  name,
                  selectedProducts: updatedSelectedProducts,
                  optimize,
                  sortBy,
                }
              : ingredient,
          );

          editIngredients(editedIngredientsEditInRecipe);

          const editedRecipeIngredientsEdit = selectedIngredients.map(
            (ingredient) =>
              ingredient.id === id
                ? {
                    ...ingredient,
                    name,
                    selectedProducts: updatedSelectedProducts,
                    amount,
                    optimize,
                    sortBy,
                  }
                : ingredient,
          );

          editSelectedIngredients(editedRecipeIngredientsEdit);
          break;

        case "edit":
          const editedIngredientsEdit = ingredients.map((ingredient) =>
            ingredient.id === id
              ? {
                  ...ingredient,
                  name,
                  selectedProducts: updatedSelectedProducts,
                  optimize,
                  sortBy,
                }
              : ingredient,
          );

          editIngredients(editedIngredientsEdit);
          break;

        case "create":
          const newIngredientCreate = {
            name,
            selectedProducts: updatedSelectedProducts,
            id: Date.now().toString(36),
            unit: selectedProducts[0].unit,
            optimize,
            sortBy,
          };
          addIngredient(newIngredientCreate);
          break;
      }

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
                <IngredientModalOne type={type} />
              ) : (
                <IngredientModalTwo />
              )}
              {type === "editInRecipe" || type === "createInRecipe" ? (
                <IngredientInRecipeButtons
                  id={id}
                  step={step}
                  setStep={setStep}
                  modalReset={modalReset}
                  handleSave={handleSave}
                />
              ) : (
                <IngredientButtons
                  id={id}
                  modalReset={modalReset}
                  handleSave={handleSave}
                />
              )}
              {/*<Button*/}
              {/*  onClick={() => {*/}
              {/*    purgeStorage();*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Purge Storage*/}
              {/*</Button>*/}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IngredientModal;
