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
import {
  SimpleIngredient,
  NewIngredient,
  NewRecipeIngredient,
} from "../types.ts";
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
      const createdId = Date.now().toString(36);
      const newIngredient: NewIngredient = {
        name: name,
        selectedProducts: updatedSelectedProducts,
        id: createdId,
        unit: selectedProducts[0].unit,
        optimize: optimize,
        sortBy: sortBy,
      };
      addIngredient(newIngredient);

      const newRecipeIngredient: NewRecipeIngredient = {
        name: name,
        selectedProducts: updatedSelectedProducts,
        id: createdId,
        amount: amount,
        optimize: optimize,
        sortBy: sortBy,
        unit: selectedProducts[0].unit,
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
            optimize: optimize,
            sortBy: sortBy,
          };
        }
        return ingredient;
      });

      editIngredients(editedIngredients);

      const editedRecipeIngredients: NewRecipeIngredient[] =
        selectedIngredients.map((ingredient) => {
          if (ingredient.id === id) {
            return {
              ...ingredient,
              name: name,
              selectedProducts: updatedSelectedProducts,
              amount: amount,
              optimize: optimize,
              sortBy: sortBy,
            };
          }
          return ingredient;
        });

      editSelectedIngredients(editedRecipeIngredients);
    } else if (name != null && selectedProducts.length > 0 && type === "edit") {
      const editedIngredients = ingredients.map((ingredient) => {
        if (ingredient.id === id) {
          return {
            ...ingredient,
            name: name,
            selectedProducts: updatedSelectedProducts,
            optimize: optimize,
            sortBy: sortBy,
          };
        }
        return ingredient;
      });

      editIngredients(editedIngredients);
    } else if (
      name != null &&
      selectedProducts.length > 0 &&
      type === "create"
    ) {
      const newIngredient: NewIngredient = {
        name: name,
        selectedProducts: updatedSelectedProducts,
        id: Date.now().toString(36),
        unit: selectedProducts[0].unit,
        optimize: optimize,
        sortBy: sortBy,
      };
      addIngredient(newIngredient);
    }

    modalReset();
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
