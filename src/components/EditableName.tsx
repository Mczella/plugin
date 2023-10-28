import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<FieldValues, "name">;
};
const EditableName: FC<Props> = ({ field }) => {
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="lg">
        <IconButton
          aria-label={"Submit"}
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />

        {/*fix resetting old value on cancel*/}
        <IconButton
          aria-label={"Cancel"}
          icon={<CloseIcon />}
          // onClick={() => setNewValue(recipeName)}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex>
        <IconButton
          aria-label={"Edit"}
          size="lg"
          ml={"8px"}
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  };

  return (
    <Editable
      value={field.value}
      submitOnBlur={false}
      mr={"12px"}
      fontSize={"36px"}
      fontWeight={"900"}
      lineHeight={"48px"}
      rounded={"xl"}
      isPreviewFocusable={true}
      display={"inline"}
    >
      <Flex flexDir={"row"} mr={"8px"} alignItems={"center"}>
        <EditablePreview />
        <Input
          as={EditableInput}
          width={"600px"}
          height={"40px"}
          rounded={"xl"}
          fontSize={"14px"}
          bg={"white"}
          color={"rgb(132, 140, 145)"}
          outline={"none"}
          border={"1px solid rgb(132, 140, 145)"}
          mr={"8px"}
          {...field}
        />
        <EditableControls />
      </Flex>
    </Editable>
  );
};

export default EditableName;
