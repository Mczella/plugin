import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
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

type Props = {
  ingredient: NewIngredient | NewRecipeIngredient;
};

const Ingredient: FC<Props> = ({ ingredient }) => {
  const {
    editSelectedIngredients,
    selectedIngredients,
    addToSelectedProducts,
    editName,
    editIngredients,
    ingredients,
    editSortBy,
    editOptimize,
    editAmount,
  } = useMyStore();

  if (ingredient == undefined) {
    throw new Error("No selected ingredient.");
  }
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

  const handleOpenIngredient = async () => {
    console.log({ data });
    if (data) {
      const productsArray = data.productIds.map(
        (productId: string) => data.productsByIds[productId],
      );
      productsArray.map((product) => {
        addToSelectedProducts(product);
      });

      editName(ingredient.name);
      editSortBy(ingredient.sortBy);
      editOptimize(ingredient.optimize);

      if ("amount" in ingredient) {
        editAmount(ingredient.amount);
        onEditInRecipeOpen();
      } else {
        onEditOpen();
      }
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
      flexDir={"column"}
      onClick={() => {
        handleOpenIngredient();
      }}
    >
      <Flex
        flexDir={"column"}
        justify={"flex-start"}
        cursor={"pointer"}
        rounded={"3xl"}
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
          //TODO: remove in createRecipe
          //TODO: might have to delete the recipe too
          onClick={
            "amount" in ingredient
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
      <Text
        px={"4px"}
        as={"b"}
        color={"rgb(28, 37, 41)"}
        fontSize={"14px"}
        lineHeight={"22px"}
        casing={"capitalize"}
      >
        {ingredient.name}
      </Text>
      <Text
        px={"4px"}
        color={"rgb(28, 37, 41)"}
        fontSize={"14px"}
        lineHeight={"22px"}
      >
        {totalPrice}
      </Text>
      <Editable
        px={"4px"}
        defaultValue="Množství"
        color={"rgb(93, 103, 108)"}
        fontSize={"13px"}
        lineHeight={"22px"}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <IngredientModal
        id={ingredient.id}
        focusRef={focusRef}
        isOpen={isEditInRecipeOpen}
        onClose={onEditInRecipeClose}
        type={"editInRecipe"}
      />
      <IngredientModal
        id={ingredient.id}
        focusRef={focusRef}
        isOpen={isEditOpen}
        onClose={onEditClose}
        type={"edit"}
      />
    </Flex>
  );
};

export default Ingredient;
