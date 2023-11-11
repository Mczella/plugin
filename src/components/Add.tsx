import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  text: string;
  type: "pridat-ingredienci" | "pridat-ingredienci-recept" | "odkaz" | "recept";
  onOpen?: () => void;
  onPopupOpen?: () => void;
};

const Add: FC<Props> = ({ text, type, onOpen, onPopupOpen }) => {
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
      onClick={type === "recept" ? onPopupOpen : onOpen}
    >
      <Box
        bg={"white"}
        h={"92px"}
        display={"flex"}
        borderTopRadius={"3xl"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {type === "odkaz" ? (
          <Image
            as={"svg"}
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.2929 9.70708C20.5789 9.99307 21.009 10.0786 21.3827 9.92385C21.7564 9.76907 22 9.40443 22 8.99997V2.99997C22 2.44768 21.5523 1.99997 21 1.99997H15C14.5955 1.99997 14.2309 2.24361 14.0761 2.61729C13.9213 2.99096 14.0069 3.42108 14.2929 3.70708L16.2322 5.64641L9.58574 12.2929C9.19522 12.6834 9.19522 13.3166 9.58574 13.7071L10.2928 14.4142C10.6834 14.8048 11.3165 14.8048 11.7071 14.4142L18.3536 7.76774L20.2929 9.70708Z"
              fill="#6DA305"
            />
            <path
              d="M4.5 8.00006C4.5 7.72392 4.72386 7.50006 5 7.50006H10.0625C10.6148 7.50006 11.0625 7.05234 11.0625 6.50006V5.50006C11.0625 4.94777 10.6148 4.50006 10.0625 4.50006H5C3.067 4.50006 1.5 6.06706 1.5 8.00006V19.0001C1.5 20.9331 3.067 22.5001 5 22.5001H16C17.933 22.5001 19.5 20.9331 19.5 19.0001V13.9376C19.5 13.3853 19.0523 12.9376 18.5 12.9376H17.5C16.9477 12.9376 16.5 13.3853 16.5 13.9376V19.0001C16.5 19.2762 16.2761 19.5001 16 19.5001H5C4.72386 19.5001 4.5 19.2762 4.5 19.0001V8.00006Z"
              fill="#6DA305"
            />
          </Image>
        ) : (
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
        )}
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
    </Flex>
  );
};

export default Add;
