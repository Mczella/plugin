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

  const { productsByIds, productIds } = data ?? {
    productIds: [],
    productsByIds: {},
  };

  if (isError) {
    return <div>Error</div>;
  }

  const handleIngredientClick = (ingredient: NewIngredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    const updatedIngredients = ingredients.filter(
      (item) => !selectedIngredients.includes(item) && item !== ingredient,
    );
    setCurrentIngredients(updatedIngredients);
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
      onClose();
    } else if (name != null && selectedProducts.length === 0) {
      setError(true);
    }
  };

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
                  onCreateOption={({ item }: { item: { value: string } }) => {
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
                        onClick={() => {
                          handleIngredientClick(ingredient);
                          onClose();
                        }}
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
              ) : null}
              {error ? (
                <Text mt={"24px"} color={"red"}>
                  Vyberte alespoň jeden produkt.
                </Text>
              ) : null}
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
                    setShowInput(false);
                    setName(null);
                    onClose();
                  }}
                >
                  Zrušit
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
                  onClick={handleSave}
                >
                  Vytvořit
                </Button>
              </ButtonGroup>
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
