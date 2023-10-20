import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, Fragment, RefObject, useState } from "react";
import CreateRecipeInput from "./CreateRecipeInput.tsx";
import Suggestions from "./Suggestions.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "./Fetch.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  ref: RefObject<HTMLInputElement>;
};

interface Product {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  unit: string;
  textualAmount: string;
  badges: string;
  image: string;
  pricePerUnit: {
    amount: number;
    currency: string;
  };
  sales: string;
  packageInfo: string;
  inStock: string;
}

const CreateRecipeModal: FC<Props> = ({ isOpen, onClose, ref }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const { data, isError } = useQuery(["data", searchQuery], () =>
    fetchAll(searchQuery),
  );
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: Product[];
  }>({});

  const { productsByIds, productIds } = data ?? {
    productIds: [],
    productsByIds: {},
  };

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Modal initialFocusRef={ref} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {showInput ? "Vyberte vhodné produkty" : "Zadejte název ingredience"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {showInput ? (
            <>
              <CreateRecipeInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                productsByIds={productsByIds}
                productIds={productIds}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
              {Object.keys(selectedProducts).map((searchQuery) => {
                const products = selectedProducts[searchQuery];

                return (
                  <Fragment key={searchQuery}>
                    <Suggestions products={products} />;
                  </Fragment>
                );
              })}
            </>
          ) : (
            <FormControl>
              <Input isRequired ref={ref} placeholder="First name" />
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={() => setShowInput(true)} mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRecipeModal;
