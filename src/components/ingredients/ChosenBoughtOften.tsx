import { Grid } from "@chakra-ui/react";
import { useMyStore } from "../store/store.tsx";
import { IngredientBoughtOften } from "./IngredientBoughtOften.tsx";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  setDisable: Dispatch<SetStateAction<boolean>>;
};
const ChosenBoughtOften: FC<Props> = ({ setDisable }) => {
  const { selectedBoughtOften } = useMyStore();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={8}>
      {selectedBoughtOften.map((ingredient) => (
        <IngredientBoughtOften
          setDisable={setDisable}
          ingredient={ingredient}
          key={ingredient.id}
        />
      ))}
    </Grid>
  );
};

export default ChosenBoughtOften;
