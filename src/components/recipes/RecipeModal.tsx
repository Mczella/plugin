import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FC, RefObject, useRef } from "react";
import { NewRecipe } from "../types.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusRef: RefObject<HTMLInputElement>;
  recipe: NewRecipe;
};

export const RecipeModal: FC<Props> = ({
  isOpen,
  onClose,
  focusRef,
  recipe,
}) => {
  const modalContainer = useRef(null);

  return (
    <>
      <div ref={modalContainer}></div>
      <Modal
        portalProps={{
          containerRef: modalContainer,
        }}
        initialFocusRef={focusRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent minW={"850px"} rounded={"xl"}>
          {/*<ModalCloseButton />*/}
          <ModalBody pb={6} m={"40px"}>
            <Flex
              flexDir={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                float={"left"}
                width={"50%"}
                px={"40px"}
                pb={"30px"}
                mt={"5%"}
                mb={"10px"}
              >
                <Flex
                  px={"30px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  minH={"250px"}
                >
                  <Image
                    src={recipe.image}
                    fallbackSrc="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
                    alt="recipeImage"
                    width="100%"
                  />
                </Flex>
              </Box>
              <Box
                float={"right"}
                width={"50%"}
                mt={"5%"}
                textAlign={"left"}
                px={"20px"}
              >
                <Heading pt={"74px"} mb={"10px"} color={"rgb(28, 37, 41)"}>
                  {recipe.name}
                </Heading>
                <Text
                  mt={"5px"}
                  mb={"20px"}
                  color={"rgb(93, 103, 108)"}
                  fontSize={"12px"}
                  fontWeight={600}
                >
                  {recipe.portion}
                </Text>
                <HStack my={"4px"}>
                  <Heading
                    color={"rgb(209, 17, 0)"}
                    fontSize={"22px"}
                    fontWeight={700}
                  >
                    price
                  </Heading>
                  <Heading
                    color={"rgb(93, 103, 108)"}
                    ml={"8px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    lineHeight={"24px"}
                  >
                    price before
                  </Heading>
                </HStack>
                <Heading
                  color={"rgb(93, 103, 108)"}
                  fontSize={"14px"}
                  fontWeight={600}
                  lineHeight={"22px"}
                >
                  price per porce
                </Heading>
                <Flex
                  mt={"70px"}
                  mb={"62px"}
                  pb={"15px"}
                  borderBottom={"1px solid rgb(218, 222, 224)"}
                  justifyContent={"flex-start"}
                >
                  <Button
                    w={"164px"}
                    h={"40px"}
                    bg={"rgb(109, 163, 5)"}
                    color={"white"}
                    fontSize={"14px"}
                    fontWeight={"bold"}
                    lineHeight={"1"}
                    mx={"16px"}
                    my={"12px"}
                    rounded={"xl"}
                    px={"16px"}
                    boxShadow={"rgba(0, 0, 0, 0.15) 0px 6px 10px -6px"}
                    _hover={{ bg: "rgb(87, 130, 4)" }}
                  >
                    Do košíku
                  </Button>
                </Flex>
              </Box>
            </Flex>
            <Tabs
              position="relative"
              variant="unstyled"
              px={"96px"}
              defaultIndex={0}
              isLazy
            >
              <TabList>
                <Tab
                  fontSize={"14px"}
                  lineHeight={"42px"}
                  fontWeight={600}
                  textTransform={"uppercase"}
                  py={0}
                  _selected={{ color: "rgb(109, 163, 5)" }}
                >
                  Popis
                </Tab>
                <Tab
                  fontSize={"14px"}
                  lineHeight={"42px"}
                  fontWeight={600}
                  textTransform={"uppercase"}
                  py={0}
                  _selected={{ color: "rgb(109, 163, 5)" }}
                >
                  Složení
                </Tab>
                <Tab
                  fontSize={"14px"}
                  lineHeight={"42px"}
                  fontWeight={600}
                  textTransform={"uppercase"}
                  py={0}
                  _selected={{ color: "rgb(109, 163, 5)" }}
                >
                  Nutriční hodnoty
                </Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="4px"
                bg="rgb(109, 163, 5)"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <Text
                    py={"48px"}
                    pr={"10px"}
                    fontSize={"16px"}
                    lineHeight={1.6}
                  >
                    Jednorázové plenkové kalhotky Bella Baby vhodné pro děti ve
                    váhové kategorii 11–18 kg. Flexibilní pásek kolem pasu
                    umožňuje uchycení v každé pozici, postranní volánky kolem
                    nožiček jsou pružné. Snadně se oblékají i svlékají pouhým
                    roztržením bočního švu.
                  </Text>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
