import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {
  Dispatch,
  FC,
  Fragment,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CreateIngredientInput from "./CreateIngredientInput.tsx";
import ChosenProducts from "./ChosenProducts.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "./Api.ts";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useBytesInUse, useMyStore, usePurgeStorage } from "./store.tsx";
import { SimpleIngredient, NewIngredient, Product } from "./types.ts";

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
  const purgeStorage = usePurgeStorage();
  const bytesInUse = useBytesInUse();

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

  /**
    temporary until hydration is fixed... not honna work since it updates currentingredients and creates duplicates
*/
  useEffect(() => {
    setCurrentIngredients(ingredients);
  }, [ingredients]);

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
        <ModalContent>
          <ModalHeader>Vyberte ingredienci</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                  rounded={"xl"}
                  fontSize={"14px"}
                  bg={"white"}
                  color={"rgb(132, 140, 145)"}
                  outline={"none"}
                  // border={"1px solid rgb(132, 140, 145)"}
                  // py={"10px"}
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
                        Vytvořte ingredienci s názvem{" "}
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
                <Fragment key={searchQuery}>
                  <ChosenProducts
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                </Fragment>
              </>
            ) : null}
          </ModalBody>
          <ModalFooter>
            {error ? (
              <Text color={"red"}>Prosím vyberte alespoň jeden produkt.</Text>
            ) : null}
            <Button onClick={handleSave} mr={3}>
              Save
            </Button>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedProducts([]);
                setShowInput(false);
                setName(null);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => purgeStorage()}>Purge Storage</Button>
            bytesInUse: {bytesInUse}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateIngredientModal;
