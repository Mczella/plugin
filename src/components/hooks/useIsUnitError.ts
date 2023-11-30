import { useEffect, useState } from "react";
import { useMyStore } from "../store/store.tsx";
import { RohlikProduct } from "../types.ts";

const useIsUnitError = () => {
  const { selectedProducts } = useMyStore();
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (
      selectedProducts.length > 0 &&
      !selectedProducts.every(
        (product: RohlikProduct) => product.unit === selectedProducts[0].unit,
      )
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [selectedProducts]);

  return isError;
};

export default useIsUnitError;
