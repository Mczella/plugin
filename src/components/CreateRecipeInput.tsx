import { Box, Flex, IconButton, Image, Input, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  productIds: string[];
  productsByIds: { [p: string]: Product };
  setSelectedProducts: Dispatch<SetStateAction<{ [key: string]: Product[] }>>;
  selectedProducts: { [key: string]: Product[] };
}

// TODO: move to utils and write test
export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedTargetWithinShadowRoot = event.composedPath()[0];

      if (
        ref.current &&
        !ref.current.contains(clickedTargetWithinShadowRoot as Node)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

const CreateRecipeInput: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  productsByIds,
  productIds,
  setSelectedProducts,
  selectedProducts,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFocus = (): void => {
    setIsDropdownOpen(true);
  };

  const dropdownRef = useOutsideClick(() => {
    setIsDropdownOpen(false);
  });

  const handleAddToRecipe = (product: Product) => {
    setSelectedProducts((prevState) => ({
      [searchQuery]: [...(prevState[searchQuery] || []), product],
    }));
    console.log(selectedProducts);
  };
  console.log(isDropdownOpen);

  return (
    <Flex alignItems={"center"} flexDir={"column"}>
      <Box
        bg={"rgb(242, 244, 244)"}
        py={"32px"}
        mb={"48px"}
        rounded={"3xl"}
        display={"flex"}
        justifyContent={"center"}
        width="-webkit-fill-available"
        zIndex={0}
      >
        <Box ref={dropdownRef}>
          <Input
            width={"600px"}
            onFocus={handleFocus}
            height={"40px"}
            rounded={"xl"}
            fontSize={"14px"}
            bg={"white"}
            color={"rgb(132, 140, 145)"}
            outline={"none"}
            border={"1px solid rgb(132, 140, 145)"}
            placeholder={
              "Vyhledejte produkty, které odpovídají vaším požadavkům na danou ingredienci."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {productsByIds &&
          Object.keys(productsByIds).length > 0 &&
          isDropdownOpen ? (
            //close on outside click
            <Box
              width={"600px"}
              maxHeight={"480px"}
              overflow="scroll"
              sx={{
                "::-webkit-scrollbar": {
                  color: "#007 #bada55",
                },
              }}
              border={"1px solid rgb(218, 222, 224)"}
              rounded={"lg"}
              boxShadow={"md"}
              position={"absolute"}
              bg={"white"}
            >
              {productIds.map((productId) => {
                console.log(productsByIds, productId);
                const product = productsByIds[productId];
                return (
                  <Box
                    key={productId}
                    width={"600px"}
                    borderBottom={
                      productIds.indexOf(productId) === productIds.length - 1
                        ? "none"
                        : "1px solid rgb(218, 222, 224)"
                    }
                    p={"10px"}
                    _hover={{ bg: "gray.100" }}
                  >
                    <Flex
                      flexDir={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Flex flexDir={"row"} alignItems={"center"}>
                        <Box
                          width={"64px"}
                          height={"64px"}
                          display={"flex"}
                          px={"8px"}
                          py={"8px"}
                        >
                          <Image
                            src={product.image}
                            alt="panda"
                            objectFit={"contain"}
                            alignItems={"center"}
                            maxH={"-webkit-fill-available"}
                          />
                        </Box>
                        <Flex
                          flexDir={"column"}
                          alignItems={"flex-start"}
                          width={"450px"}
                        >
                          <Text
                            fontSize={"13px"}
                            fontWeight={400}
                            mr={"8px"}
                            lineHeight={"22px"}
                          >
                            {product.name}
                          </Text>
                          <Text
                            fontSize={"14px"}
                            fontWeight={600}
                            lineHeight={"22px"}
                          >
                            {product.price.amount} {product.price.currency}
                          </Text>
                        </Flex>
                      </Flex>
                      <Box>
                        <IconButton
                          aria-label={"vybrat"}
                          height={"40px"}
                          width={"40px"}
                          mr={"12px"}
                          _hover={{ border: "1px solid rgb(156, 164, 169)" }}
                          border={"1px solid rgb(218, 222, 224)"}
                          bg={"white"}
                          rounded={"2xl"}
                          icon={<AddIcon color={"black"} boxSize={6} />}
                          onClick={() => handleAddToRecipe(product)}
                        />
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Flex>
  );
};

export default CreateRecipeInput;
