import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsDetails } from "../api/api.ts";
import { useMyStore } from "../store/store.tsx";
import { FC, useRef } from "react";
import { NewIngredient, NewRecipeIngredient } from "../types.ts";
import IngredientModal from "../ingredients/IngredientModal.tsx";
import { useGetIngredientPrice } from "../hooks/useGetIngredientPrice.tsx";
import { useLocation } from "react-router-dom";
import IngredientInRecipeButtons from "../ingredients/IngredientInRecipeButtons.tsx";
import IngredientButtons from "../ingredients/IngredientButtons.tsx";
import IngredientModalOne from "../ingredients/IngredientModalOne.tsx";
import IngredientModalTwo from "../ingredients/IngredientModalTwo.tsx";
import { getEditedPrice } from "../utils/utils.ts";

type Props = {
  ingredient: NewIngredient | NewRecipeIngredient;
};

const Ingredient: FC<Props> = ({ ingredient }) => {
  const {
    selectedProducts,
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
    addToSelectedProducts,
    step,
  } = useMyStore();

  if (ingredient == undefined) {
    throw new Error("No selected ingredient.");
  }
  const location = useLocation();
  const { totalPrice } = useGetIngredientPrice(ingredient);
  const {
    isOpen: isEditInRecipeOpen,
    onOpen: onEditInRecipeOpen,
    onClose: onEditInRecipeClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const focusRef = useRef<HTMLInputElement>(null);
  const restOfProducts = ingredient.selectedProducts.length - 3;
  const arrayOfAllProductIds = ingredient.selectedProducts.map(
    (product) => product.id,
  );
  const { data, isError } = useQuery(["data", arrayOfAllProductIds], () =>
    fetchProductsDetails(arrayOfAllProductIds),
  );

  if (isError) {
    return <div>Error.</div>;
  }

  const isNewRecipeIngredientType = (
    ingredient: NewIngredient | NewRecipeIngredient,
  ): ingredient is NewRecipeIngredient => {
    return (ingredient as NewRecipeIngredient).amount !== undefined;
  };

  const handleOpenIngredient = () => {
    if (data) {
      console.log("kill", data);
      const productsArray = data.productIds.map(
        (productId: string) => data.productsByIds[productId],
      );
      productsArray.map((product) => {
        addToSelectedProducts(product);
      });
      console.log("mee", ingredient.name);

      editName(ingredient.name);
      editSortBy(ingredient.sortBy);
      editOptimize(ingredient.optimize);
      console.log("mee", name);

      if (isNewRecipeIngredientType(ingredient)) {
        editAmount(ingredient.amount);
        onEditInRecipeOpen();
      } else {
        onEditOpen();
      }
    }
  };

  const handleSave = () => {
    if (name != null && selectedProducts.length > 0) {
      const updatedSelectedProducts = selectedProducts.map(
        ({ id, preferred }) => ({ id, preferred }),
      );
      const editedIngredientsEdit = ingredients.map((ing) =>
        ing.id === ingredient.id
          ? {
              ...ing,
              name,
              selectedProducts: updatedSelectedProducts,
              optimize,
              sortBy,
            }
          : ing,
      );

      editIngredients(editedIngredientsEdit);
      onEditClose();
    }
  };

  const handleRecipeSave = () => {
    if (name != null && selectedProducts.length > 0) {
      const updatedSelectedProducts = selectedProducts.map(
        ({ id, preferred }) => ({ id, preferred }),
      );
      const editedIngredientsEditInRecipe = ingredients.map((ing) =>
        ing.id === ingredient.id
          ? {
              ...ing,
              name,
              selectedProducts: updatedSelectedProducts,
              optimize,
              sortBy,
            }
          : ing,
      );

      editIngredients(editedIngredientsEditInRecipe);

      const editedRecipeIngredientsEdit = selectedIngredients.map((ing) =>
        ing.id === ingredient.id
          ? {
              ...ing,
              name,
              selectedProducts: updatedSelectedProducts,
              amount,
              optimize,
              sortBy,
            }
          : ing,
      );

      editSelectedIngredients(editedRecipeIngredientsEdit);
      onEditInRecipeClose();
    }
  };

  const handleDelete = (ingredientId: string) => {
    const updatedIngredients = selectedIngredients.filter(
      (ingredient) => ingredient.id !== ingredientId,
    );
    editSelectedIngredients(updatedIngredients);
  };

  return (
    <Flex
      mb={"20px"}
      flexDir={"column"}
      onClick={() => {
        handleOpenIngredient();
      }}
      alignSelf={"center"}
      alignItems={"center"}
    >
      <Flex
        flexDir={"column"}
        justify={"flex-start"}
        cursor={"pointer"}
        rounded={"3xl"}
        alignSelf={"center"}
        boxShadow={
          "rgba(0, 0, 0, 0.01) 0px 0px 12px, rgba(0, 0, 0, 0.06) 0px 0px 10px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px;"
        }
        w={"144px"}
        h={"144px"}
        justifyContent={"center"}
        mb={"8px"}
        p={"10px"}
        alignItems={"center"}
      >
        <SmallCloseIcon
          position={"relative"}
          alignSelf={"end"}
          top={"5px"}
          color={"rgb(218, 222, 224)"}
          _hover={{ color: "rgb(87, 130, 4)" }}
          //TODO: might have to delete the recipe too
          onClick={
            isNewRecipeIngredientType(ingredient)
              ? (e) => {
                  e.stopPropagation();
                  handleDelete(ingredient.id);
                }
              : (e) => {
                  e.stopPropagation();
                  const updatedIngredients = ingredients.filter(
                    (ing) => ing.id !== ingredient.id,
                  );
                  editIngredients(updatedIngredients);
                }
          }
        />
        <SimpleGrid
          height={"100%"}
          alignItems={"center"}
          columns={ingredient.selectedProducts.length > 1 ? 2 : 1}
          spacing={"4px"}
        >
          {data && (
            <>
              {Object.keys(data.productsByIds)
                .slice(0, 3)
                .map((productId) => {
                  const product = data.productsByIds[productId];
                  return (
                    <Box
                      w={"60px"}
                      h={"60px"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      key={product.id}
                    >
                      <Image
                        src={product.image}
                        objectFit={"contain"}
                        h={"55px"}
                      />
                    </Box>
                  );
                })}

              {restOfProducts > 0 && (
                <Box
                  w={"60px"}
                  h={"60px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text as={"b"}>{`+ ${restOfProducts}`}</Text>
                </Box>
              )}
            </>
          )}
        </SimpleGrid>
      </Flex>
      {location.pathname === "/produkty" ? (
        <>
          <Text
            cursor={"pointer"}
            pt={"10px"}
            textAlign={"center"}
            h={"30px"}
            casing={"capitalize"}
            display={"-webkit-box"}
            fontSize={"13px"}
            lineHeight={1.4}
            noOfLines={1}
            maxW={"165px"}
            textOverflow={"ellipsis"}
            sx={{ "-webkit-line-clamp": "1" }}
          >
            {ingredient.name}
          </Text>
          <Text
            my={"10px"}
            textAlign={"center"}
            fontSize="24px"
            lineHeight="1.4"
            fontWeight={"bold"}
            color={"rgb(28, 37, 41)"}
          >
            {getEditedPrice(totalPrice)} Kč
          </Text>
        </>
      ) : (
        <>
          <Text
            px={"4px"}
            as={"b"}
            color={"rgb(28, 37, 41)"}
            fontSize={"14px"}
            lineHeight={"22px"}
            casing={"capitalize"}
            noOfLines={1}
            sx={{ "-webkit-line-clamp": "1" }}
          >
            {ingredient.name}
          </Text>
          <Text
            textAlign={"center"}
            px={"4px"}
            color={"rgb(28, 37, 41)"}
            fontSize={"14px"}
            lineHeight={"22px"}
          >
            {getEditedPrice(totalPrice)} Kč
          </Text>
        </>
      )}
      <IngredientModal
        focusRef={focusRef}
        isOpen={isEditInRecipeOpen}
        onClose={onEditInRecipeClose}
        id={ingredient.id}
      >
        {step === 1 ? (
          <IngredientModalOne heading={"Upravit ingredienci"} />
        ) : (
          <IngredientModalTwo />
        )}
        <IngredientInRecipeButtons
          onClose={onEditInRecipeClose}
          handleSave={handleRecipeSave}
          id={ingredient.id}
        />
      </IngredientModal>
      <IngredientModal
        focusRef={focusRef}
        isOpen={isEditOpen}
        onClose={onEditClose}
        id={ingredient.id}
      >
        {step === 1 ? (
          <IngredientModalOne heading={"Upravit ingredienci"} />
        ) : (
          <IngredientModalTwo />
        )}
        <IngredientButtons
          onClose={onEditClose}
          handleSave={handleSave}
          id={ingredient.id}
        />
      </IngredientModal>
    </Flex>
  );
};

export default Ingredient;
