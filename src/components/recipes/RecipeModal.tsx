import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabIndicator,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { FC, RefObject, useRef } from "react";
import { NewIngredient, NewRecipe, RohlikProduct } from "../types.ts";
import { useQueries } from "@tanstack/react-query";
import { fetchComposition } from "../api/api.ts";
import PlusMinus from "../PlusMinus.tsx";
import { useMyStore } from "../store/store.tsx";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusRef: RefObject<HTMLInputElement>;
  recipe: NewRecipe;
  productIds: { id: string; storeId: string }[];
  fetchedProducts: RohlikProduct[];
  priceBeforeSale: string | null;
  pricePerPortion: number;
  editedPrice: string | number;
  discount: number;
  amount: number;
  handleAdd: () => void;
  handleSubtract: () => void;
};

export const RecipeModal: FC<Props> = ({
  isOpen,
  onClose,
  focusRef,
  recipe,
  productIds,
  priceBeforeSale,
  pricePerPortion,
  editedPrice,
  discount,
  amount,
  handleAdd,
  handleSubtract,
}) => {
  const modalContainer = useRef(null);
  const { recipesInCart, ingredients } = useMyStore();
  const modalRef = useOutsideClick(() => {
    onClose();
  });

  const arrayOfIds = productIds.map((item) => item.id);

  const composition = useQueries({
    queries: arrayOfIds.map((id) => ({
      queryKey: [id, id],
      queryFn: () => fetchComposition(id),
    })),
  });

  const isSuccess = composition.every((result) => result.isSuccess);

  if (!isSuccess) {
    return;
  }
  const calculateSum = (type: string) => {
    const emptyValues: NewIngredient[] = [];
    const array: number[] = composition.map((x) => {
      const product = productIds.find((id) => id.id === x.data.productId);
      const ingredient = recipe.ingredients.find(
        (ingredient) => ingredient.id === product?.storeId,
      );
      const myIngredient = ingredients.find((ing) => ing.id === ingredient?.id);

      console.log("ing", ingredient);

      if (
        ingredient &&
        myIngredient &&
        x.data.nutritionalValues.length > 0 &&
        myIngredient.unit !== "ks"
      ) {
        return (
          (x.data.nutritionalValues[0].values[type].amount *
            ingredient.amount *
            10) /
          recipe.portion
        );
      } else if (myIngredient) {
        emptyValues.push(myIngredient);
      }
    });

    console.log(array, "array");

    const reducedValue = array
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      .toFixed(1);

    return { emptyValues, reducedValue };
  };

  const getInflection = () => {
    if (recipe.portion < 5) {
      return "porce";
    } else {
      return "porcí";
    }
  };

  const timestamp = parseInt(recipe.id, 36);
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("cs-CZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

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
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent ref={modalRef} minW={"850px"} rounded={"xl"}>
          <ModalCloseButton />
          <ModalBody p={0} pb={6} m={"0px"}>
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
                mb={"10px"}
                position={"relative"}
              >
                {discount > 0 ? (
                  <Circle
                    bg={"rgba(209, 17, 0, 0.9)"}
                    position={"absolute"}
                    right={"5px"}
                    top={"-10px"}
                    size={"64px"}
                    color={"white"}
                    fontSize={"12px"}
                    fontWeight={"bold"}
                  >
                    {`-${discount} %`}
                  </Circle>
                ) : null}
                <Flex
                  px={"30px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  minH={"250px"}
                >
                  <Image
                    mt={"5%"}
                    src={recipe.image}
                    fallbackSrc="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
                    alt="recipeImage"
                    width="100%"
                  />
                </Flex>
              </Box>
              <Box float={"right"} width={"50%"} textAlign={"left"} px={"20px"}>
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
                  {recipe.portion} {getInflection()}
                </Text>
                <HStack my={"4px"} alignItems={"baseline"}>
                  <Heading
                    color={discount > 0 ? "rgb(209, 17, 0)" : "rgb(28, 37, 41)"}
                    fontSize={"22px"}
                    fontWeight={700}
                  >
                    {(editedPrice as number) > 0
                      ? `${editedPrice} Kč`
                      : "Vyprodáno"}
                  </Heading>
                  {discount > 0 ? (
                    <Heading
                      as={"s"}
                      color={"rgb(93, 103, 108)"}
                      ml={"8px"}
                      fontSize={"16px"}
                      fontWeight={400}
                      lineHeight={"24px"}
                    >
                      {priceBeforeSale}
                    </Heading>
                  ) : null}
                </HStack>
                <Heading
                  color={"rgb(93, 103, 108)"}
                  fontSize={"14px"}
                  fontWeight={600}
                  lineHeight={"22px"}
                >
                  {`${pricePerPortion.toFixed(1)} Kč / ${getInflection()}`}
                </Heading>
                <Flex
                  mt={"70px"}
                  mb={"20px"}
                  pb={"15px"}
                  borderBottom={"1px solid rgb(218, 222, 224)"}
                  justifyContent={"flex-start"}
                >
                  {recipesInCart.some(
                    (item: { id: string }) => recipe.id === item.id,
                  ) ? (
                    <PlusMinus
                      handleAdd={handleAdd}
                      handleSubtract={handleSubtract}
                      amount={amount}
                      size={"40px"}
                    >
                      <Text fontSize={"18px"} fontWeight={"bold"}>
                        {amount}
                      </Text>
                    </PlusMinus>
                  ) : (
                    <Button
                      w={"164px"}
                      h={"40px"}
                      bg={"rgb(109, 163, 5)"}
                      color={"white"}
                      fontSize={"14px"}
                      fontWeight={"bold"}
                      lineHeight={"1"}
                      mr={"16px"}
                      my={"12px"}
                      rounded={"xl"}
                      px={"16px"}
                      boxShadow={"rgba(0, 0, 0, 0.15) 0px 6px 10px -6px"}
                      _hover={{ bg: "rgb(87, 130, 4)" }}
                      onClick={handleAdd}
                    >
                      Do košíku
                    </Button>
                  )}
                </Flex>
                <Text
                  color={"rgb(93, 103, 108)"}
                  fontSize={"15px"}
                  mb={"42px"}
                  fontWeight={"semibold"}
                >
                  {`Vytvořeno: ${formattedDate}`}
                </Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalBody p={0} m={0} borderBottomRadius={"xl"}>
            <Tabs
              position="relative"
              variant="unstyled"
              defaultIndex={0}
              isLazy
            >
              <TabList px={"96px"}>
                {recipe.description ? (
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
                ) : null}
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
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="4px"
                bg="rgb(109, 163, 5)"
                borderRadius="1px"
              />
              <TabPanels>
                {recipe.description ? (
                  <TabPanel px={"96px"} py={"24px"}>
                    <Text pr={"10px"} fontSize={"16px"} lineHeight={1.6}>
                      {recipe.description}
                    </Text>
                  </TabPanel>
                ) : null}
                <TabPanel bg={"rgb(242, 244, 244)"} borderBottomRadius={"xl"}>
                  <Flex
                    flexDir={"row"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                  >
                    <Box
                      float={"left"}
                      width={"45%"}
                      pl={"50px"}
                      pr={"15px"}
                      py={"24px"}
                      mb={"10px"}
                      position={"relative"}
                    >
                      <TableContainer>
                        <Table variant="unstyled" fontSize={"13px"}>
                          <Tbody>
                            <Tr>
                              <Td>
                                <Text
                                  color={"gb(28, 37, 41)"}
                                  fontSize={"1.17em"}
                                  fontWeight={"bold"}
                                  mb={"16px"}
                                >
                                  Ingredience
                                </Text>
                              </Td>
                            </Tr>
                            {productIds.map((ingredient) => {
                              const matchingIng = ingredients.find(
                                (ing) => ing.id === ingredient.storeId,
                              );

                              const matchingRecipeIng = recipe.ingredients.find(
                                (ing) => {
                                  const empty = calculateSum(
                                    "energyKCal",
                                  ).emptyValues.some(
                                    (product) => product.id === ing.id,
                                  );

                                  return !empty && ing.id === matchingIng?.id;
                                },
                              );

                              if (matchingRecipeIng) {
                                return (
                                  <Tr key={matchingRecipeIng.id}>
                                    <Td>{matchingIng?.name}</Td>
                                    <Td textAlign={"right"}>
                                      {matchingRecipeIng.amount}
                                    </Td>
                                  </Tr>
                                );
                              }

                              return null;
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>

                      <TableContainer mt={"40px"}>
                        <Table variant="unstyled" fontSize={"13px"}>
                          <Tbody>
                            <Tr>
                              <Td>
                                <Text
                                  color={"gb(28, 37, 41)"}
                                  fontSize={"1.17em"}
                                  fontWeight={"bold"}
                                  mb={"16px"}
                                >
                                  Nezapočítané ingredience
                                </Text>
                              </Td>
                            </Tr>
                            {calculateSum("energyKCal").emptyValues.map(
                              (product) => {
                                const matchingRecipeIng =
                                  recipe.ingredients.find(
                                    (ing) => ing.id === product?.id,
                                  );

                                return (
                                  <Tr key={product.id}>
                                    <Td>{product?.name}</Td>
                                    <Td textAlign={"right"}>
                                      {matchingRecipeIng?.amount}
                                    </Td>
                                  </Tr>
                                );
                              },
                            )}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>
                    <Box
                      float={"right"}
                      width={"55%"}
                      pl={"15px"}
                      pr={"50px"}
                      py={"24px"}
                      mb={"10px"}
                      position={"relative"}
                    >
                      <Box
                        display={"grid"}
                        justifyContent={"end"}
                        maxW={"400px"}
                      >
                        {isSuccess ? (
                          <TableContainer>
                            <Table variant="unstyled" fontSize={"13px"}>
                              <Tbody>
                                <Tr>
                                  <Td>
                                    <Text
                                      color={"gb(28, 37, 41)"}
                                      fontSize={"1.17em"}
                                      fontWeight={"bold"}
                                      mb={"16px"}
                                    >
                                      Nutriční hodnoty na 1 porci
                                    </Text>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>Energická hodnota</Td>
                                  <Td textAlign={"right"}>
                                    {Math.ceil(
                                      Number(
                                        calculateSum("energyKJ").reducedValue,
                                      ),
                                    ) ?? 0}{" "}
                                    KJ /
                                    {Math.ceil(
                                      Number(
                                        calculateSum("energyKCal").reducedValue,
                                      ),
                                    ) ?? 0}{" "}
                                    KCal
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>Tuky</Td>
                                  <Td textAlign={"right"}>
                                    {calculateSum("fats").reducedValue ?? 0} g
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td
                                    pl={"23px"}
                                    whiteSpace="pre-line"
                                    wordBreak="break-word"
                                  >
                                    {`z toho nasycené mastné \nkyseliny`}
                                  </Td>
                                  <Td textAlign={"right"}>
                                    {calculateSum("saturatedFats")
                                      .reducedValue ?? 0}{" "}
                                    g
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>Sacharidy</Td>
                                  <Td textAlign={"right"}>
                                    {calculateSum("carbohydrates")
                                      .reducedValue ?? 0}{" "}
                                    g
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td pl={"23px"}>z toho cukry</Td>
                                  <Td textAlign={"right"}>
                                    {calculateSum("sugars").reducedValue ?? 0} g
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>Bílkoviny</Td>
                                  <Td textAlign={"right"}>
                                    {calculateSum("protein").reducedValue ?? 0}{" "}
                                    g
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>Sůl</Td>
                                  <Td textAlign={"right"}>
                                    {calculateSum("salt").reducedValue ?? 0} g
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>Vláknina</Td>
                                  <Td textAlign={"right"}>
                                    {calculateSum("fiber").reducedValue ?? 0} g
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </TableContainer>
                        ) : null}
                      </Box>
                    </Box>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
