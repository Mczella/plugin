import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useRef } from "react";
import CreateRecipeModal from "./CreateRecipeModal.tsx";
import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
  type: string;
};

const Add: FC<Props> = ({ text, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  return (
    <Flex
      flexDir={"column"}
      justify={"flex-start"}
      cursor={"pointer"}
      rounded={"3xl"}
      boxShadow={
        "rgba(0, 0, 0, 0.01) 0px 0px 12px, rgba(0, 0, 0, 0.06) 0px 0px 10px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px;"
      }
      w={"144px"}
      h={"144px"}
      justifyContent={"center"}
      mb={"8px"}
      onClick={
        type === "ingredience" ? onOpen : () => navigate("/pridat-recept")
      }
    >
      <Box
        bg={"white"}
        h={"92px"}
        display={"flex"}
        borderTopRadius={"3xl"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          as={"svg"}
          height="24px"
          viewBox="0 0 16 16"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
          fill="#6DA305"
        >
          <path d="M13 9H9V13C9 13.55 8.55 14 8 14C7.45 14 7 13.55 7 13V9H3C2.45 9 2 8.55 2 8C2 7.45 2.45 7 3 7H7V3C7 2.45 7.45 2 8 2C8.55 2 9 2.45 9 3V7H13C13.55 7 14 7.45 14 8C14 8.55 13.55 9 13 9Z"></path>
        </Image>
      </Box>
      <Box
        h={"52px"}
        bg={"rgb(109, 163, 5)"}
        borderBottomRadius={"3xl"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text
          fontSize={"14px"}
          fontWeight={"600"}
          lineHeight={"22px"}
          textAlign={"center"}
          color={"white"}
        >
          {text}
        </Text>
      </Box>
      <CreateRecipeModal ref={cancelRef} onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
};

export default Add;
