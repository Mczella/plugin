import { useEffect, useState } from "react";
import { useMyStore } from "../store/store.tsx";
import { RohlikProduct } from "../types.ts";

const useIsUnitError = () => {
  const { selectedProducts } = useMyStore();
  const [isError, setError] = useState<"check" | "wrong" | "good">();

  const isKgorL = (unit: string) => {
    return unit === "kg" || unit === "l";
  };

  useEffect(() => {
    if (
      selectedProducts.length > 0 &&
      selectedProducts.every((product: RohlikProduct) => {
        return isKgorL(product.unit);
      }) &&
      selectedProducts.some(
        (product: RohlikProduct) => product.unit === "kg",
      ) &&
      selectedProducts.some((product: RohlikProduct) => product.unit === "l")
    ) {
      setError("check");
    } else if (
      selectedProducts.length > 0 &&
      !selectedProducts.every(
        (product: RohlikProduct) => product.unit === selectedProducts[0].unit,
      )
    ) {
      setError("wrong");
    } else {
      setError("good");
    }
  }, [selectedProducts]);

  return isError;
};

export default useIsUnitError;
