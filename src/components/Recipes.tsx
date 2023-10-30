import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Add from "./Add.tsx";
import { useMyStore } from "./store.tsx";
import RecipeComponent from "./RecipeComponent.tsx";
import { Fragment } from "react";

const Recipes = () => {
  const { recipes, recipesInCart } = useMyStore();

  console.log("receptyvkosiku", recipesInCart);
  return (
    <Flex flexDir={"column"}>
      <Grid templateColumns="repeat(7, 1fr)" gap="10px" m="3%">
        <GridItem display="flex" flexDir="column" alignItems="center">
          <Add text={"Přidat recept"} type={"recept"} />
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(7, 1fr)" gap="10px" m="3%">
        {recipes.map((recipe) => (
          <Fragment key={recipe.id}>
            <RecipeComponent recipe={recipe} />
          </Fragment>
        ))}
      </Grid>
    </Flex>
  );
};

export default Recipes;
