import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, RefObject, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusRef: RefObject<HTMLInputElement>;
};

const AddRecipeModal: FC<Props> = ({ isOpen, onClose, focusRef }) => {
  const modalContainer = useRef(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onNameSubmit = (data: FieldValues) => {
    const id = Date.now().toString(36);
    navigate(`/pridat-recept/${id}`, { state: { name: data.name, id: id } });
    onClose();
  };

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
        isCentered
      >
        <ModalOverlay />
        <ModalContent minW={"850px"} rounded={"xl"}>
          <ModalCloseButton onClick={() => navigate("/recepty")} />
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
                Vytvořit nový recept
              </Heading>
              <form
                onSubmit={(e) => {
                  e.stopPropagation();
                  return handleSubmit(onNameSubmit)(e);
                }}
              >
                <FormControl>
                  <Input
                    width={"770px"}
                    height={"40px"}
                    rounded={"xl"}
                    fontSize={"14px"}
                    bg={"white"}
                    color={"rgb(132, 140, 145)"}
                    outline={"none"}
                    border={"1px solid rgb(132, 140, 145)"}
                    {...register("name", {
                      required: "Zadejte název receptu",
                    })}
                    id={"name"}
                    placeholder={"např. Svíčková (povinné)"}
                  />
                  <FormErrorMessage>
                    {errors.name && (errors.name.message as string)}
                  </FormErrorMessage>
                </FormControl>
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
                    onClick={() => onClose()}
                  >
                    Zrušit
                  </Button>
                  <Button
                    type={"submit"}
                    height={"40px"}
                    w={"360px"}
                    bg={"rgb(109, 163, 5)"}
                    fontSize={"14px"}
                    fontWeight={"600"}
                    rounded={"xl"}
                    boxShadow={"md"}
                    color={"white"}
                    _hover={{ bg: "rgb(87, 130, 4)" }}
                    isLoading={isSubmitting}
                  >
                    Vytvořit
                  </Button>
                </ButtonGroup>
              </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRecipeModal;
