import { Box, Flex, IconButton, Image, Input, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Dispatch,
  useEffect,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";

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

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  data: { [p: string]: any } | undefined;
}
const CreateRecipeInput: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  data,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  //   const dalsiRef = useRef(null);

  console.log(isDropdownOpen);

  const dalsiRef = useOutsideClick(() => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  });

  const handleFocus = (): void => {
    setIsDropdownOpen(true);
  };

  return (
    <Flex alignItems={"center"} flexDir={"column"}>
      <Box
        bg={"rgb(242, 244, 244)"}
        py={"32px"}
        mb={"48px"}
        rounded={"3xl"}
        display={"flex"}
        justifyContent={"center"}
        mx={"calc(3% + 16px)"}
        position={"absolute"}
        width="-webkit-fill-available"
        zIndex={0}
        ref={dalsiRef}
      >
        <Input
          width={"600px"}
          onFocus={handleFocus}
          ref={inputRef}
          height={"40px"}
          rounded={"xl"}
          fontSize={"14px"}
          bg={"white"}
          color={"rgb(132, 140, 145)"}
          outline={"none"}
          border={"1px solid rgb(132, 140, 145)"}
          placeholder={"Vyhledejte suroviny, které chcete přidat do receptu."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {data && Object.keys(data).length > 0 && isDropdownOpen ? (
          //close on outside click
          <Box
            width={"600px"}
            ref={dropdownRef}
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
            mt={"40px"}
            bg={"white"}
          >
            {Object.entries(data).map(([id, product]) => (
              <Box
                key={id}
                width={"600px"}
                borderBottom={
                  Object.keys(data).indexOf(id) === Object.keys(data).length - 1
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
                    />
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </Flex>
  );
};

export default CreateRecipeInput;
