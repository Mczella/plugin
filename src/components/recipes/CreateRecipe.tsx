import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
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
import EditableName from "./EditableName.tsx";
import BreadcrumbNav from "../BreadcrumbNav.tsx";
import Add from "../Add.tsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import IngredientModal from "../ingredients/IngredientModal.tsx";
import Ingredient from "./Ingredient.tsx";
import { RecipeIngredient } from "../types.ts";
import { useMyStore } from "../store/store.tsx";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import IngredientModalOne from "../ingredients/IngredientModalOne.tsx";
import IngredientModalTwo from "../ingredients/IngredientModalTwo.tsx";
import IngredientInRecipeButtons from "../ingredients/IngredientInRecipeButtons.tsx";

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
    addIngredient,
    addToSelectedIngredients,
    selectedProducts,
    name,
    amount,
    optimize,
    sortBy,
    addRecipe,
    selectedIngredients,
    editSelectedIngredients,
    editAmount,
    editSelectedProducts,
    selectIngredient,
    step,
    resetModal,
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
      const updatedSelectedIngredients: RecipeIngredient =
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

  const handleDelete = (ingredientId: string) => {
    const updatedIngredients = selectedIngredients.filter(
      (ingredient) => ingredient.id !== ingredientId,
    );
    editSelectedIngredients(updatedIngredients);
  };
  const handleSave = () => {
    if (name != null && selectedProducts.length > 0) {
      const updatedSelectedProducts = selectedProducts.map(
        ({ id, preferred }) => ({ id, preferred }),
      );
      const createdIdCreate = Date.now().toString(36);
      const newIngredientCreateInRecipe = {
        name,
        selectedProducts: updatedSelectedProducts,
        id: createdIdCreate,
        unit: selectedProducts[0].unit,
        optimize,
        sortBy,
      };
      addIngredient(newIngredientCreateInRecipe);
      console.log("ahoj");
      const newRecipeIngredientCreate = {
        name,
        selectedProducts: updatedSelectedProducts,
        id: createdIdCreate,
        amount,
        optimize,
        sortBy,
        unit: selectedProducts[0].unit,
      };
      addToSelectedIngredients(newRecipeIngredientCreate);
      onClose();
    }
  };

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
          <BreadcrumbNav addRecipe>Recepty</BreadcrumbNav>
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
                  onKeyDown={(e) => {
                    if (e.code === "Enter") {
                      e.preventDefault();
                    }
                  }}
                >
                  Uložit recept
                </Button>
                {/*<IconButton*/}
                {/*  aria-label="Select"*/}
                {/*  boxSize={"40px"}*/}
                {/*  _hover={{ border: "1px solid rgb(156, 164, 169)" }}*/}
                {/*  border={"1px solid rgb(218, 222, 224)"}*/}
                {/*  bg={"white"}*/}
                {/*  rounded={"2xl"}*/}
                {/*  icon={<HamburgerIcon boxSize={"18px"} />}*/}
                {/*/>*/}
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
              action={() => {
                resetModal();
                onOpen();
              }}
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
            </Add>
            {selectedIngredients.map((selectedIngredient) => (
              <Ingredient
                key={selectedIngredient.id}
                ingredient={selectedIngredient}
                handleDelete={() => handleDelete(selectedIngredient.id)}
              >
                <Text
                  px={"4px"}
                  as={"b"}
                  color={"rgb(28, 37, 41)"}
                  fontSize={"14px"}
                  lineHeight={"22px"}
                  casing={"capitalize"}
                  noOfLines={1}
                  sx={{ WebkitLineClamp: "1" }}
                >
                  {selectedIngredient.name}
                </Text>
              </Ingredient>
            ))}
          </Grid>
        </Flex>
        <IngredientModal
          focusRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          create
        >
          {step === 1 ? (
            <IngredientModalOne create heading={"Přidat ingredienci"} />
          ) : (
            <IngredientModalTwo />
          )}
          <IngredientInRecipeButtons
            onClose={onClose}
            handleSave={handleSave}
          />
        </IngredientModal>
      </form>
    </Flex>
  );
};

export default CreateRecipe;
