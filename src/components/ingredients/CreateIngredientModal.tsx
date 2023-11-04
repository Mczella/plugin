import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import {
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CreateIngredientInput from "./CreateIngredientInput.tsx";
import ChosenProducts from "./ChosenProducts.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "../api/api.ts";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useMyStore } from "../store/store.tsx";
import { SimpleIngredient, NewIngredient, Product } from "../types.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusRef: RefObject<HTMLInputElement>;
  selectedIngredients: NewIngredient[];
  setSelectedIngredients: Dispatch<SetStateAction<NewIngredient[]>>;
};

const CreateIngredientModal: FC<Props> = ({
  isOpen,
  onClose,
  focusRef,
  setSelectedIngredients,
  selectedIngredients,
}) => {
  const { addIngredient, ingredients } = useMyStore();
  // const purgeStorage = usePurgeStorage();
  // const bytesInUse = useBytesInUse();

  const [error, setError] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [currentIngredients, setCurrentIngredients] =
    useState<NewIngredient[]>(ingredients);
  const modalContainer = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const { data, isError } = useQuery(["data", searchQuery], () =>
    fetchAll(searchQuery),
  );
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [step, setStep] = useState<number>(1);
  const [selectedIngredient, setSelectedIngredient] =
    useState<NewIngredient | null>(null);

  const { productsByIds, productIds } = data ?? {
    productIds: [],
    productsByIds: {},
  };

  if (isError) {
    return <div>Error</div>;
  }

  const handleIngredientClick = (ingredient: NewIngredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    // const updatedIngredients = ingredients.filter(
    //   (item) => !selectedIngredients.includes(item) && item !== ingredient,
    // );
    // setCurrentIngredients(updatedIngredients);
  };

  const handleSave = () => {
    if (name != null && selectedProducts.length > 0) {
      const updatedSelectedProducts: SimpleIngredient[] = selectedProducts.map(
        (product) => {
          const { id, preferred } = product;
          return { id, preferred };
        },
      );
      const newIngredient: NewIngredient = {
        name: name,
        selectedProducts: updatedSelectedProducts,
        id: Date.now().toString(36),
      };
      addIngredient(newIngredient);
      handleIngredientClick(newIngredient);
      setShowInput(false);
      setSelectedProducts([]);
      setSearchQuery("");
      setName(null);
      setStep(1);
      onClose();
    } else if (name != null && selectedProducts.length === 0) {
      setError(true);
    }
  };

  useEffect(() => {
    const filteredIngredients = ingredients.filter(
      (ingredient) =>
        !selectedIngredients.some(
          (selected) => selected.id === ingredient.id,
        ) &&
        (!selectedIngredient || selectedIngredient.id !== ingredient.id),
    );

    setCurrentIngredients(filteredIngredients);
  }, [selectedIngredients, selectedIngredient]);

  useEffect(() => {
    if (selectedProducts.length > 0) {
      setError(false);
    }
  }, [selectedProducts]);

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
          <ModalCloseButton />
          <ModalBody pb={6} m={"40px"}>
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {step === 1 ? (
                <>
                  <Heading
                    fontSize={"24px"}
                    fontWeight={900}
                    lineHeight={"32px"}
                    mb={"24px"}
                  >
                    Přidat ingredienci
                  </Heading>
                  <FormControl isRequired>
                    <AutoComplete
                      openOnFocus
                      closeOnSelect
                      creatable
                      onCreateOption={({
                        item,
                      }: {
                        item: { value: string };
                      }) => {
                        setName(item.value);
                        setShowInput(true);
                      }}
                    >
                      <AutoCompleteInput
                        width={"740px"}
                        height={"40px"}
                        rounded={"xl"}
                        fontSize={"14px"}
                        bg={"white"}
                        color={"rgb(132, 140, 145)"}
                        outline={"none"}
                        mb={"24px"}
                        border={"1px solid rgb(132, 140, 145)"}
                        placeholder="Vyberte z vašich ingrediencí..."
                      />
                      <AutoCompleteList
                        border={"1px solid rgb(218, 222, 224)"}
                        rounded={"lg"}
                        boxShadow={"md"}
                        bg={"white"}
                      >
                        {currentIngredients.map((ingredient) => (
                          <AutoCompleteItem
                            _hover={{ bg: "gray.100" }}
                            key={ingredient.id}
                            value={ingredient.name}
                            textTransform="capitalize"
                            onClick={() => setSelectedIngredient(ingredient)}
                          >
                            {ingredient.name}
                          </AutoCompleteItem>
                        ))}
                        <AutoCompleteCreatable>
                          {({ value }) => (
                            <Text>
                              Vytvořit ingredienci s názvem{" "}
                              <Text as={"b"}>{value}</Text>.
                            </Text>
                          )}
                        </AutoCompleteCreatable>
                      </AutoCompleteList>
                    </AutoComplete>
                  </FormControl>
                  {showInput ? (
                    <>
                      <CreateIngredientInput
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        productsByIds={productsByIds}
                        productIds={productIds}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                      />
                      <ChosenProducts
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                      />
                    </>
                  ) : selectedIngredient ? (
                    <Text>{selectedIngredient.name}</Text>
                  ) : null}
                </>
              ) : (
                <>
                  <Heading
                    fontSize={"24px"}
                    fontWeight={900}
                    lineHeight={"32px"}
                    mb={"24px"}
                  >
                    Zadejte množství vybrané ingredience pro tento recept
                  </Heading>
                  <NumberInput
                    min={0.1}
                    max={30}
                    width={"600px"}
                    height={"40px"}
                    isRequired
                  >
                    <NumberInputField
                      id={"amount"}
                      placeholder={"Zadejte množství"}
                      type={"number"}
                      height={"40px"}
                      rounded={"xl"}
                      fontSize={"14px"}
                      bg={"white"}
                      color={"rgb(132, 140, 145)"}
                      outline={"none"}
                      border={"1px solid rgb(132, 140, 145)"}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </>
              )}
              {error ? (
                <Text mt={"24px"} color={"red"}>
                  Vyberte alespoň jeden produkt.
                </Text>
              ) : null}

              {step === 1 ? (
                <ButtonGroup
                  mt={"40px"}
                  display={"flex"}
                  justifyContent={"center"}
                  gap={"5px"}
                >
                  <Button
                    bg="white"
                    color="black"
                    fontSize={"14px"}
                    fontWeight={"600"}
                    border="1px solid rgba(0, 0, 0, 0.15)"
                    height="40px"
                    display="flex"
                    alignItems="center"
                    rounded={"xl"}
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedProducts([]);
                      setSelectedIngredient(null);
                      setShowInput(false);
                      setName(null);
                      onClose();
                    }}
                  >
                    Zrušit
                  </Button>
                  <Button
                    bg="white"
                    color="black"
                    fontSize={"14px"}
                    fontWeight={"600"}
                    border="1px solid rgba(0, 0, 0, 0.15)"
                    height="40px"
                    display="flex"
                    alignItems="center"
                    rounded={"xl"}
                    isDisabled
                  >
                    Zpět
                  </Button>
                  <Button
                    height={"40px"}
                    w={"360px"}
                    bg={"rgb(109, 163, 5)"}
                    fontSize={"14px"}
                    fontWeight={"600"}
                    rounded={"xl"}
                    boxShadow={"md"}
                    color={"white"}
                    _hover={{ bg: "rgb(87, 130, 4)" }}
                    onClick={() => setStep(2)}
                  >
                    Pokračovat
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup
                  mt={"40px"}
                  display={"flex"}
                  justifyContent={"center"}
                  gap={"5px"}
                >
                  <Button
                    bg="white"
                    color="black"
                    fontSize={"14px"}
                    fontWeight={"600"}
                    border="1px solid rgba(0, 0, 0, 0.15)"
                    height="40px"
                    display="flex"
                    alignItems="center"
                    rounded={"xl"}
                    onClick={
                      selectedIngredient
                        ? () => {
                            setSelectedIngredient(null);
                            onClose();
                          }
                        : () => {
                            setSearchQuery("");
                            setSelectedProducts([]);
                            setShowInput(false);
                            setName(null);
                            onClose();
                          }
                    }
                  >
                    Zrušit
                  </Button>
                  <Button
                    bg="white"
                    color="black"
                    fontSize={"14px"}
                    fontWeight={"600"}
                    border="1px solid rgba(0, 0, 0, 0.15)"
                    height="40px"
                    display="flex"
                    alignItems="center"
                    rounded={"xl"}
                    onClick={() => setStep(1)}
                  >
                    Zpět
                  </Button>
                  <Button
                    height={"40px"}
                    w={"360px"}
                    bg={"rgb(109, 163, 5)"}
                    fontSize={"14px"}
                    fontWeight={"600"}
                    rounded={"xl"}
                    boxShadow={"md"}
                    color={"white"}
                    _hover={{ bg: "rgb(87, 130, 4)" }}
                    onClick={
                      selectedIngredient
                        ? () => {
                            handleIngredientClick(selectedIngredient);
                            onClose();
                            setStep(1);
                          }
                        : handleSave
                    }
                  >
                    Vytvořit
                  </Button>
                </ButtonGroup>
              )}
              {/*<Button onClick={() => purgeStorage()}>Purge Storage</Button>*/}
              {/*bytesInUse: {bytesInUse}*/}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateIngredientModal;
