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
import { NewIngredient } from "../types.ts";

type Props = {
  isOpen: boolean;
  cancelRef: React.MutableRefObject<null>;
  onClose: () => void;
  ingredient: NewIngredient;
};

export const DeleteIngredientAlertDialog: FC<Props> = ({
  isOpen,
  cancelRef,
  onClose,
  ingredient,
}) => {
  const { editIngredients, ingredients, recipes } = useMyStore();
  const modalContainer = useRef(null);

  const crossCheckWithRecipes = () => {
    const recipesWithIngredient: { name: string; id: string }[] = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((recipeIngredient) => {
        if (recipeIngredient.id === ingredient.id) {
          recipesWithIngredient.push({ name: recipe.name, id: recipe.id });
        }
      });
    });
    return recipesWithIngredient;
  };

  const recipesWithIngredient = crossCheckWithRecipes();

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
      >
        <AlertDialogOverlay>
          <AlertDialogContent minW={"850px"} rounded={"xl"}>
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
                  Smazat produkt
                </Heading>
                {recipesWithIngredient.length > 0 ? (
                  <Flex flexDir={"column"} gap={"20px"} alignItems={"center"}>
                    <Text fontSize={"14px"} fontWeight={400}>
                      {`Přejete si smazat produkt, který je ingrediencí v ${
                        recipesWithIngredient.length === 1
                          ? "tomto receptu"
                          : "těchto receptech"
                      }`}
                    </Text>
                    {recipesWithIngredient.map((recipe) => (
                      <Text
                        casing={"capitalize"}
                        fontSize={"14px"}
                        as={"b"}
                        key={recipe.id}
                      >
                        {recipe.name}
                      </Text>
                    ))}
                    <Text fontSize={"14px"} fontWeight={400}>
                      Pokud chcete produkt smazat, odstraňte ho nejdříve z
                      receptů nebo smažte recepty, které ho obsahují.
                    </Text>
                  </Flex>
                ) : (
                  <>
                    <Text fontSize={"14px"} fontWeight={400}>
                      Přejete si smazat vámi vytvořený produkt? Smazání je
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
                          const updatedIngredients = ingredients.filter(
                            (ing) => ing.id !== ingredient.id,
                          );
                          editIngredients(updatedIngredients);
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
