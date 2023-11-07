import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Add from "../Add.tsx";
import { useMyStore } from "../store/store.tsx";
import RecipeComponent from "./RecipeComponent.tsx";
import { Icon } from "@chakra-ui/icons";
import BreadcrumbNav from "../BreadcrumbNav.tsx";
import { useLocation } from "react-router-dom";
import AddRecipeModal from "./AddRecipeModal.tsx";
import { useRef } from "react";

const Recipes = () => {
  const { recipes } = useMyStore();
  const {
    isOpen: isPopupOpen,
    onOpen: onPopupOpen,
    onClose: onPopupClose,
  } = useDisclosure();
  const focusRef = useRef<HTMLInputElement>(null);
  // const [value, setValue] = useState("1");

  const { state } = useLocation();
  return (
    <Box
      pt={"16px"}
      pb={"12px"}
      mx={"calc(3% + 16px)"}
      w={"1000px"}
      minH={"100vh"}
    >
      <BreadcrumbNav type={"recipes"} />
      <Flex flexDir={"column"}>
        <Heading
          pt={"12px"}
          fontSize={"36px"}
          fontWeight={900}
          lineHeight={"48px"}
        >
          Recepty
        </Heading>
        <Button
          onClick={async () => {
            const openModal = new CustomEvent("redux-me", {
              bubbles: true,
              detail: { action: "open-modal", id: "1" },
            });
            document.body.dispatchEvent(openModal);
          }}
        >
          Open Modal
        </Button>
        <Flex flexDir={"row"} alignItems={"center"} gap={"10px"} mt={"32px"}>
          <Badge
            bg={"rgb(109, 163, 5)"}
            rounded={"2xl"}
            fontSize={"12px"}
            fontWeight={400}
            lineHeight={"22px"}
            px={"8px"}
            variant={"solid"}
            color={"white"}
          >
            <Text casing={"capitalize"}>Nové</Text>
          </Badge>
          <Heading fontSize={"20px"} fontWeight={900} lineHeight={"30px"}>
            Seznam vašich receptů
          </Heading>
          <Icon color={"rgb(28, 37, 41)"} boxSize={"20px"} />
        </Flex>
        <Text
          mt={"8px"}
          mb={"16px"}
          fontSize={"16px"}
          fontWeight={400}
          lineHeight={"24px"}
        >
          Vytvořte si vlastní recepty z produktů, které rádi používáte.
          Pohlídáme za vás cenu i dostupnost.
        </Text>
        <Grid templateColumns="repeat(7, 1fr)" gap="10px">
          <GridItem display="flex" flexDir="column" alignItems="center">
            <Add
              text={"Přidat recept"}
              type={"recept"}
              onPopupOpen={onPopupOpen}
            />
          </GridItem>
          <GridItem display="flex" flexDir="column" alignItems="center">
            <Add text={"Upravit ingredience"} type={"recept"} />
          </GridItem>
        </Grid>
        {state && (
          <Text mt={"24px"} color={"red"}>
            {state.error}
          </Text>
        )}
        <Heading
          mt={"24px"}
          mb={"24px"}
          fontSize={"24px"}
          fontWeight={"normal"}
        >
          Vaše recepty
        </Heading>
        {/*<RadioGroup onChange={setValue} value={value}>*/}
        {/*  <Stack direction="row" gap={"16px"}>*/}
        {/*    <Radio value="1" fontSize={"12px"}>*/}
        {/*      OD NEJNOVĚJŠÍHO*/}
        {/*    </Radio>*/}
        {/*    <Radio value="2" fontSize={"12px"}>*/}
        {/*      OD NEJLEVNĚJŠÍHO*/}
        {/*    </Radio>*/}
        {/*    <Radio value="3" fontSize={"12px"}>*/}
        {/*      OD NEJDRAŽŠÍHO*/}
        {/*    </Radio>*/}
        {/*    <Radio value="4" fontSize={"12px"}>*/}
        {/*      OD NEJLEVNĚJŠÍHO ZA JEDNOTKU*/}
        {/*    </Radio>*/}
        {/*  </Stack>*/}
        {/*</RadioGroup>*/}
        <Grid templateColumns="repeat(5, 1fr)" gap="10px">
          {recipes.map((recipe) => (
            <RecipeComponent key={recipe.id} recipe={recipe} />
          ))}
        </Grid>
      </Flex>
      <AddRecipeModal
        isOpen={isPopupOpen}
        onClose={onPopupClose}
        focusRef={focusRef}
      />
    </Box>
  );
};

export default Recipes;
