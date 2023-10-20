import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import EditableName from "./EditableName.tsx";
import BreadcrumbNav from "./BreadcrumbNav.tsx";
import Add from "./Add.tsx";

const CreateRecipe = () => {
  return (
    <>
      <Box pt={"16px"} pb={"12px"} mx={"calc(3% + 16px)"} w={"1000px"}>
        <BreadcrumbNav />
        <Flex
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"32px"}
        >
          <EditableName />
          <Flex flexDir={"row"}>
            <Button
              mr={"8px"}
              height={"40px"}
              bg={"rgb(109, 163, 5)"}
              fontSize={"14px"}
              fontWeight={"600"}
              rounded={"lg"}
              boxShadow={"md"}
              color={"white"}
              _hover={{ bg: "rgb(87, 130, 4)" }}
            >
              Uložit recept
            </Button>
            <IconButton
              aria-label="Select"
              boxSize={"40px"}
              _hover={{ border: "1px solid rgb(156, 164, 169)" }}
              border={"1px solid rgb(218, 222, 224)"}
              bg={"white"}
              rounded={"2xl"}
              icon={<HamburgerIcon boxSize={"18px"} />}
            />
          </Flex>
        </Flex>
      </Box>
      <Flex flexDir={"column"} mx={"calc(3% + 16px)"} gap={"32px"} w={"1000px"}>
        <Textarea
          placeholder={"Přidejte více informací k receptu a postup."}
          width="-webkit-fill-available"
          height={"80px"}
          rounded={"xl"}
          fontSize={"14px"}
          bg={"white"}
          color={"rgb(132, 140, 145)"}
          outline={"none"}
          border={"1px solid rgb(132, 140, 145)"}
        />
        <Heading>Ingredience</Heading>
        <Add text={"Přidat ingredienci"} type={"ingredience"} />
      </Flex>
    </>
  );
};

export default CreateRecipe;
