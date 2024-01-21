import { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from "./store.tsx";

export function useBytesInUse() {
  const [bytesInUse, setBytesInUse] = useState<number>(0);

  useEffect(() => {
    chrome.storage.local.onChanged.addListener(getBytesInUse);

    function getBytesInUse() {
      chrome.storage.local.getBytesInUse((bytes) => {
        setBytesInUse(bytes);
      });
    }

    return () => {
      chrome.storage.local.onChanged.removeListener(getBytesInUse);
    };
  }, []);

  return bytesInUse;
}
export function usePurgeStorage() {
  const store = useContext(StoreContext);
  return useCallback(() => {
    // @ts-ignore
    store.setState({
      ingredientsInCart: [],
      recipesInCart: [],
    });
    window.location.reload();
  }, [store]);
}
