import { Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { items } from "./Rohlik.tsx";
import Add from "./Add.tsx";

const Recipes = () => {
  return (
    <Flex flexDir={"column"}>
      <Grid templateColumns="repeat(7, 1fr)" gap="10px" m="3%">
        <GridItem display="flex" flexDir="column" alignItems="center">
          <Add text={"Přidat recept"} type={"recept"} />
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(7, 1fr)" gap="10px" m="3%">
        {items.map((item, index) => (
          <GridItem
            key={index}
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Image src={item.imageUrl} alt="panda" width="100%" />
            <Text height="3em" isTruncated>
              {item.text}
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
