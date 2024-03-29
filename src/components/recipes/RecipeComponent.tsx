import {
  Badge,
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { State, useMyStore } from "../store/store.tsx";
import { NewRecipe } from "../types.ts";
import { useGetRecipePrice } from "../hooks/useGetRecipePrice.ts";
import { FC, useRef } from "react";
import PlusMinus from "../PlusMinus.tsx";
import { getEditedPrice } from "../utils/utils.ts";
import { ProductBoughtTooltip } from "../ProductBoughtTooltip.tsx";
import { RecipeModal } from "./RecipeModal.tsx";

type Props = {
  recipe: NewRecipe;
};

const selector = (state: State) => {
  return {
    recipesInCart: state.recipesInCart,
    deleteRecipeFromCart: state.deleteRecipeFromCart,
    addRecipeToCart: state.addRecipeToCart,
    addIngredientToCart: state.addIngredientToCart,
    ingredients: state.ingredients,
  };
};

const RecipeComponent: FC<Props> = ({ recipe }) => {
  // extracted selector
  const {
    recipesInCart,
    deleteRecipeFromCart,
    addRecipeToCart,
    addIngredientToCart,
    ingredients,
  } = useMyStore(selector);
  const { totalPrice, needed, productIds, saved, discount, fetchedProducts } =
    useGetRecipePrice(recipe);
  console.log("products", fetchedProducts, productIds);
  const pricePerPortion = totalPrice / recipe.portion;
  const priceBeforeSale = totalPrice + saved;
  const show = recipesInCart.some(
    (item: { id: string }) => recipe.id === item.id,
  );
  const editedPrice = getEditedPrice(totalPrice);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);

  const getPriceBeforeSale = () => {
    if (totalPrice > 0) {
      if (totalPrice > 999) {
        return `${Math.ceil(priceBeforeSale)} Kč`;
      } else {
        return `${priceBeforeSale.toFixed(1)} Kč`;
      }
    } else {
      return null;
    }
  };

  const editedPriceBeforeSale = getPriceBeforeSale();

  const getAmount = () => {
    const currentRecipe = recipesInCart.find(
      (recipeInCart: { id: string }) => recipeInCart.id === recipe.id,
    );

    if (!currentRecipe) {
      return 0;
    }

    return currentRecipe.amount;
  };

  const getInflection = () => {
    if (recipe.portion < 5) {
      return "porce";
    } else {
      return "porcí";
    }
  };

  const handleAdd = () => {
    filterIngredient("add");
    addRecipeToCart({ id: recipe.id, amount: 1 });
  };

  const handleSubtract = () => {
    filterIngredient("subtract");
    const currentRecipe = recipesInCart.find(
      (recipeInCart: { id: string }) => recipeInCart.id === recipe.id,
    );

    if (currentRecipe && currentRecipe.amount === 1) {
      deleteRecipeFromCart(recipe.id);
    } else {
      addRecipeToCart({ id: recipe.id, amount: -1 });
    }
  };

  const filterIngredient = (type: string) => {
    productIds.forEach((item) => {
      const filteredIngredient = ingredients.find(
        (ingredient: { id: string }) => ingredient.id === item.storeId,
      );
      const filteredNeeded = needed?.find(
        (ingredient) => ingredient.id === item.id,
      );

      console.log("needed", needed);
      console.log({ filteredNeeded });
      if (filteredIngredient && filteredNeeded && type === "add") {
        addIngredientToCart(
          filteredNeeded.name,
          filteredNeeded.id,
          filteredNeeded.amount,
          filteredNeeded.unit,
          filteredNeeded.packageAmount,
          filteredIngredient.optimize,
          filteredIngredient.id,
        );
      } else if (filteredIngredient && filteredNeeded && type === "subtract") {
        addIngredientToCart(
          filteredNeeded.name,
          filteredNeeded.id,
          -filteredNeeded.amount,
          filteredNeeded.unit,
          filteredNeeded.packageAmount,
          filteredIngredient.optimize,
          filteredIngredient.id,
        );
      }
    });
  };

  const handleBuy = () => {
    filterIngredient("add");
    addRecipeToCart({ id: recipe.id, amount: 1 });
  };

  return (
    <>
      <GridItem display="flex" flexDir="column" alignItems="center">
        <Box
          maxW={"165px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={onOpen}
        >
          <ProductBoughtTooltip
            show={show}
            label={
              <Text>
                V košíku máte <br />
                <Text as={"b"}>{getAmount()} ks</Text>
              </Text>
            }
          >
            <Box
              w={"150px"}
              h={"150px"}
              position={"relative"}
              pt={"10px"}
              mt={"20px"}
            >
              <Flex
                minW={"171px"}
                justifyContent={"end"}
                position={"absolute"}
                top={show ? 33 : 0}
              >
                {discount > 0 ? (
                  <Text
                    alignSelf={"center"}
                    py={"5px"}
                    bg={"rgba(209, 17, 0, 0.9)"}
                    color={"white"}
                    fontSize={"16px"}
                    fontWeight={"bold"}
                    px={"5px"}
                  >
                    {`-${Math.ceil(discount)} %`}
                  </Text>
                ) : null}
              </Flex>
              <Image
                src={recipe.image}
                fallbackSrc="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
                alt="recipeImage"
                width="100%"
              />
              <Badge
                position={"absolute"}
                left={"25%"}
                bottom={0}
                bg={"rgba(0, 0, 0, 0.5)"}
                color={"white"}
                fontSize={"12px"}
                fontWeight={600}
                py={"2px"}
                px={"7px"}
                rounded={"2xl"}
              >
                {recipe.portion} {getInflection()}
              </Badge>
            </Box>
          </ProductBoughtTooltip>
        </Box>
        <Box maxW={"165px"} display={"contents"}>
          <Text
            cursor={"pointer"}
            pt={"10px"}
            textAlign={"center"}
            h={"60px"}
            casing={"capitalize"}
            display={"-webkit-box"}
            fontSize={"13px"}
            lineHeight={1.4}
            noOfLines={2}
            maxW={"165px"}
            textOverflow={"ellipsis"}
            sx={{ WebkitLineClamp: "2" }}
          >
            {recipe.name}
          </Text>
          <Text
            color={"rgb(209, 17, 0)"}
            textAlign={"center"}
            fontSize={"13px"}
            h={"20px"}
            fontWeight={600}
            lineHeight={"22px"}
          >
            {discount > 0 ? ` ušetříte ${Math.ceil(discount)} %` : null}
          </Text>
          <HStack>
            {discount > 0 ? (
              <Text
                as={"s"}
                fontSize={"18px"}
                lineHeight={1.4}
                fontWeight={"normal"}
                color={"rgb(28, 37, 41)"}
              >
                {editedPriceBeforeSale}
              </Text>
            ) : null}
            <Text
              fontSize="24px"
              lineHeight="1.4"
              fontWeight={"bold"}
              color={discount > 0 ? "rgb(209, 17, 0)" : "rgb(28, 37, 41)"}
            >
              {(editedPrice as number) > 0 ? `${editedPrice} Kč` : "Vyprodáno"}
            </Text>
          </HStack>
          <Text
            mb={"10px"}
            fontSize="12px"
            lineHeight={1.4}
            color={"rgb(93, 103, 108)"}
          >
            {`${pricePerPortion.toFixed(1)} Kč/${getInflection()}`}
          </Text>
          {recipesInCart.some(
            (item: { id: string }) => recipe.id === item.id,
          ) ? (
            <PlusMinus
              handleAdd={handleAdd}
              handleSubtract={handleSubtract}
              amount={getAmount()}
              size={"32px"}
            >
              <Text fontWeight={"bold"}>{getAmount()}</Text>
            </PlusMinus>
          ) : (
            <Button
              bg="white"
              color="black"
              border="1px solid rgba(0, 0, 0, 0.15)"
              height="32px"
              display="flex"
              rounded={"lg"}
              alignItems="center"
              fontSize={"13px"}
              fontWeight={"bold"}
              isDisabled={totalPrice === 0}
              _hover={{ bg: "rgb(87, 130, 4)", color: "white" }}
              onClick={handleBuy}
              boxShadow={"rgba(0, 0, 0, 0.15) 0px 6px 10px -6px;"}
            >
              Do košíku
            </Button>
          )}
        </Box>
        <RecipeModal
          productIds={productIds}
          focusRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          recipe={recipe}
          fetchedProducts={fetchedProducts}
          pricePerPortion={pricePerPortion}
          priceBeforeSale={editedPriceBeforeSale}
          editedPrice={editedPrice}
          discount={discount}
          amount={getAmount()}
          handleAdd={handleAdd}
          handleSubtract={handleSubtract}
        />
      </GridItem>
    </>
  );
};

export default RecipeComponent;
