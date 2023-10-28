import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, RefObject, useRef } from "react";
import { FieldValues, useForm, UseFormReset } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusRef: RefObject<HTMLInputElement>;
  reset: UseFormReset<FieldValues>;
};

const AddRecipeModal: FC<Props> = ({ isOpen, onClose, focusRef, reset }) => {
  const modalContainer = useRef(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onNameSubmit = (data: FieldValues) => {
    reset({
      name: data.name,
      description: "",
      image: null,
      portion: null,
    });
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
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Zadejte název receptu</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                return handleSubmit(onNameSubmit)(e);
              }}
            >
              <FormControl>
                <Input
                  {...register("name", {
                    required: "Zadejte název receptu",
                  })}
                  id={"name"}
                  placeholder={"Název receptu"}
                />
                <FormErrorMessage>
                  {errors.name && (errors.name.message as string)}
                </FormErrorMessage>
              </FormControl>
              <ButtonGroup>
                <Button type={"submit"} mr={3} isLoading={isSubmitting}>
                  Vytvořit
                </Button>
                <Button onClick={() => navigate("/recepty")}>Zrušit</Button>
              </ButtonGroup>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRecipeModal;
