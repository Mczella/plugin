import React, { FC, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useMyStore } from "../store/store.tsx";
import { NewRecipe } from "../types.ts";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";

type Props = {
  isOpen: boolean;
  cancelRef: React.MutableRefObject<null>;
  onClose: () => void;
  recipe: NewRecipe;
};

export const DeleteRecipeAlertDialog: FC<Props> = ({
  isOpen,
  cancelRef,
  onClose,
  recipe,
}) => {
  const { editRecipes, recipes, recipesInCart } = useMyStore();
  const modalContainer = useRef(null);
  const modalRef = useOutsideClick(() => {
    onClose();
  });

  const isRecipeInCart = () => {
    return recipesInCart.some((recipeInCart) => {
      return recipeInCart.id === recipe.id;
    });
  };

  return (
    <>
      <div ref={modalContainer}></div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        portalProps={{
          containerRef: modalContainer,
        }}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent minW={"850px"} rounded={"xl"} ref={modalRef}>
            <AlertDialogCloseButton />
            <AlertDialogBody pb={6} m={"40px"}>
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Heading
                  fontSize={"24px"}
                  fontWeight={900}
                  lineHeight={"32px"}
                  mb={"24px"}
                >
                  Smazat recept
                </Heading>
                {isRecipeInCart() ? (
                  <Flex flexDir={"column"} gap={"20px"} alignItems={"center"}>
                    <Text fontSize={"14px"} fontWeight={400}>
                      Přejete si smazat recept, který máte momentálně v košíku.
                    </Text>
                    <Text fontSize={"14px"} fontWeight={400}>
                      Pokud chcete recept smazat, odstraňte ho nejdříve z
                      košíku.
                    </Text>
                  </Flex>
                ) : (
                  <>
                    <Text fontSize={"14px"} fontWeight={400}>
                      Přejete si smazat vámi vytvořený recept? Smazání je
                      nevratné.
                    </Text>
                    <ButtonGroup
                      mt={"40px"}
                      display={"flex"}
                      justifyContent={"center"}
                      gap={"5px"}
                    >
                      <Button
                        bg="white"
                        w={"60px"}
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
                        Ne
                      </Button>
                      <Button
                        height={"40px"}
                        w={"200px"}
                        bg={"rgb(109, 163, 5)"}
                        fontSize={"14px"}
                        fontWeight={"600"}
                        rounded={"xl"}
                        boxShadow={"md"}
                        color={"white"}
                        ml={3}
                        _hover={{ bg: "rgb(87, 130, 4)" }}
                        onClick={() => {
                          const updatedRecipes = recipes.filter(
                            (updatedRecipe) => updatedRecipe.id !== recipe.id,
                          );
                          editRecipes(updatedRecipes);
                        }}
                      >
                        Ano
                      </Button>
                    </ButtonGroup>
                  </>
                )}
              </Flex>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
