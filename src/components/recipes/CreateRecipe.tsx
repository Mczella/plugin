import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Input,
  Text,
  Textarea,
  useDisclosure,
  Image,
  FormControl,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import EditableName from "./EditableName.tsx";
import BreadcrumbNav from "../BreadcrumbNav.tsx";
import Add from "../Add.tsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import IngredientModal from "../ingredients/IngredientModal.tsx";
import Ingredient from "./Ingredient.tsx";
import { NewRecipeIngredient } from "../types.ts";
import { useMyStore } from "../store/store.tsx";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);
  const {
    addRecipe,
    selectedIngredients,
    editSelectedIngredients,
    editAmount,
    editSelectedProducts,
    selectIngredient,
  } = useMyStore();
  const { state } = useLocation();

  const recipeReset = () => {
    editAmount(0);
    editSelectedProducts([]);
    selectIngredient(null);
    editSelectedIngredients([]);
  };

  useEffect(() => {
    if (state == null) {
      navigate("/recepty", {
        state: {
          error: "Došlo k neočekávané chybě, zkuste to prosím znovu.",
        },
      });

      recipeReset();
    } else {
      reset({
        name: state.name,
        description: "",
        image: null,
        portion: null,
      });
    }
  }, []);

  const onSubmit = (data: any) => {
    if (selectedIngredients.length > 0) {
      const updatedSelectedIngredients: NewRecipeIngredient =
        selectedIngredients.map((ingredient) => ({
          id: ingredient.id,
          amount: ingredient.amount,
        }));

      const updatedData = {
        ...data,
        ingredients: updatedSelectedIngredients,
        id: state.id,
      };

      addRecipe(updatedData);
      recipeReset();
      navigate("/recepty");
    } else if (selectedIngredients.length === 0) {
      setError(true);
    }
  };

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      setError(false);
    }
  }, [selectedIngredients]);

  return (
    <Flex
      flexDir={"column"}
      mx={"calc(3% + 16px)"}
      gap={"32px"}
      w={"1000px"}
      minH={"100vh"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pt={"16px"} pb={"12px"}>
          <BreadcrumbNav type={"pridat-recept"} />
          <Flex
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={"32px"}
          >
            <Controller
              name={"name"}
              control={control}
              rules={{
                required: "Toto pole je povinné.",
              }}
              render={({ field }) => <EditableName field={field} />}
            />
            <Flex flexDir={"column"} gap={"10px"} alignItems={"end"}>
              <Flex flexDir={"row"}>
                <Button
                  mr={"8px"}
                  height={"40px"}
                  bg={"rgb(109, 163, 5)"}
                  fontSize={"14px"}
                  fontWeight={"600"}
                  rounded={"lg"}
                  boxShadow={"md"}
                  color={"white"}
                  _hover={{ bg: "rgb(87, 130, 4)" }}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Uložit recept
                </Button>
                <IconButton
                  aria-label="Select"
                  boxSize={"40px"}
                  _hover={{ border: "1px solid rgb(156, 164, 169)" }}
                  border={"1px solid rgb(218, 222, 224)"}
                  bg={"white"}
                  rounded={"2xl"}
                  icon={<HamburgerIcon boxSize={"18px"} />}
                />
              </Flex>
              {error && (
                <Text fontSize="12px" color="red">
                  Vyberte alespoň jednu ingredienci.
                </Text>
              )}
            </Flex>
          </Flex>
        </Box>
        <Flex flexDir={"column"} gap={"32px"}>
          <Flex flexDir={"row"} justifyContent={"space-between"}>
            <Flex flexDir={"column"} gap={"32px"}>
              <FormControl>
                <Input
                  id={"image"}
                  {...register("image")}
                  onBlur={(e: ChangeEvent<HTMLInputElement>) =>
                    setImage(e.target.value)
                  }
                  width={"600px"}
                  height={"40px"}
                  rounded={"xl"}
                  fontSize={"14px"}
                  bg={"white"}
                  color={"rgb(132, 140, 145)"}
                  outline={"none"}
                  border={"1px solid rgb(132, 140, 145)"}
                  placeholder={"Vložte odkaz na obrázek"}
                />
              </FormControl>

              <FormControl>
                <Textarea
                  id={"description"}
                  {...register("description")}
                  placeholder={"Přidejte více informací k receptu a postup."}
                  width={"600px"}
                  height={"80px"}
                  rounded={"xl"}
                  fontSize={"14px"}
                  bg={"white"}
                  color={"rgb(132, 140, 145)"}
                  outline={"none"}
                  border={"1px solid rgb(132, 140, 145)"}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.portion}>
                <NumberInput min={1} max={16} width={"600px"} height={"40px"}>
                  <NumberInputField
                    {...register("portion", {
                      required: "Zadejte porci",
                    })}
                    id={"portion"}
                    placeholder={"Zadejte počet porcí"}
                    type={"number"}
                    height={"40px"}
                    rounded={"xl"}
                    fontSize={"14px"}
                    bg={"white"}
                    color={"rgb(132, 140, 145)"}
                    outline={"none"}
                    border={"1px solid rgb(132, 140, 145)"}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {errors.portion && (
                  <Text fontSize="12px" color="red" mt={"10px"}>
                    {errors.portion.message as string}
                  </Text>
                )}
              </FormControl>
            </Flex>
            <Box pl={"30px"}>
              <Image
                h={"220px"}
                borderRadius={"xl"}
                src={image}
                fallbackSrc={
                  "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
                }
              />
            </Box>
          </Flex>

          <Heading>Ingredience</Heading>
          <Grid templateColumns="repeat(6, 1fr)" gap={"19px"}>
            <Add
              text={"Přidat ingredienci"}
              type={"pridat-ingredienci-recept"}
              onOpen={onOpen}
            />
            {selectedIngredients.map((selectedIngredient) => (
              <Ingredient
                key={selectedIngredient.id}
                ingredient={selectedIngredient}
              />
            ))}
          </Grid>
        </Flex>
        <IngredientModal
          focusRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          type={"createInRecipe"}
        />
      </form>
    </Flex>
  );
};

export default CreateRecipe;
