import { Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import Add from "./Add.tsx";
import { useMyStore } from "./store.tsx";

const Recipes = () => {
  const { recipes } = useMyStore();

  return (
    <Flex flexDir={"column"}>
      <Grid templateColumns="repeat(7, 1fr)" gap="10px" m="3%">
        <GridItem display="flex" flexDir="column" alignItems="center">
          <Add text={"Přidat recept"} type={"recept"} />
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(7, 1fr)" gap="10px" m="3%">
        {recipes.map((item, index) => (
          <GridItem
            key={index}
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Image
              src={item.image}
              fallbackSrc={
                "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
              }
              alt="panda"
              width="100%"
            />
            <Text height="3em" isTruncated>
              {item.name}
            </Text>
            <Text fontSize="24px" fontWeight="bold" lineHeight="1.4">
              100 Kč
            </Text>
            <Text fontSize="12px" lineHeight={1.4}>
              20,00 Kč/porce
            </Text>
            <Button
              mt="10px"
              bg="white"
              color="black"
              border="1px solid rgba(0, 0, 0, 0.15)"
              height="32px"
              display="flex"
              alignItems="center"
              _hover={{ bg: "green" }}
            >
              Do košíku
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Recipes;
